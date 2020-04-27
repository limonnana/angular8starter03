import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private dataSource = new MatTableDataSource<Product>([]);

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  get columns(): string[] {
    // return a string array of the columns in the table
    // the order of these values will be the order your columns show up in
    return ['name', 'price', 'description', 'edit', 'delete'];
  }

  onEditClick(id){
    console.log('edit id: ' + id);
    this.router.navigate(['editProduct/' + id]);
  }

}
