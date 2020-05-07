import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { DescriptionModalComponent } from '../description-modal/description-modal.component';
import { GenericModalComponent } from '../../modal/generic-modal/generic-modal.component';

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
    return ['id' , 'name', 'price', 'description', 'edit', 'delete'];
  }

  onEditClick(id){
    console.log('edit id: ' + id);
    this.router.navigate(['editProduct/' + id]);
  }

  refresh() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.dataSource.data = data;
    });
  }

  openDialogDescription(description): void {
    const dialogRefDescription = this.dialog.open(DescriptionModalComponent, {
      width: '400px',
      data: {
        description: description
      }
    });

  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: {
        id: id,
        type: 'product'
      }
    });
  
  dialogRef.afterClosed().subscribe(
    data => {
      if(data){
        this.yesDelete(data.id);
      }
      }
  );   
  }

  closeMe(): void {
    this.dialog.closeAll();
  }

  yesDelete(id){
    this.productService.delete(id).subscribe(data => {
      console.log('Data: ' + data.message);
      if(data.message === 200){
        this.deleteFromTable(id);             
      }
    });
  }

  

  deleteFromTable(id: string){
    this.dataSource.data.splice(+id,1);
    this.refresh();
  }
}


