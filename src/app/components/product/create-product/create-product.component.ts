import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  newProductFormGroup: FormGroup = null;
  error: string = '';
  product: Product = new Product();
  title: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.newProductFormGroup = this.buildForm();
    let id = this.route.snapshot.params.id;
    if(id){
      this.title = 'Edit';
     
      this.productService.getProductById(id)
        .subscribe( data => {
          this.product.id = id;
          this.product.name = data.name;
          this.product.price = data.price;
          this.product.description = data.description;
          this.newProductFormGroup.setValue(this.product);
        });
    }else{
      this.title = 'Create';
    }

    
  }
  
  buildForm(): FormGroup {
    return this.fb.group({
      id:[null],
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null]
    });
  }

  addProduct() {
    const productFromForm: Product = this.newProductFormGroup.value;
    this.error = this.validationService.validateNewProductForm(productFromForm);
    if (this.error != null && this.error.length>2) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.productService.save(productFromForm).subscribe(data => {
        this.router.navigate(['products']);
       console.log('the answer from server is: ' + data.name);
     });
    }
  }

  cancel(){
    this.router.navigate(['products']);
  }


}
