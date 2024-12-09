import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: [
        'https://picsum.photos/200/300',
        [Validators.required, Validators.pattern(/https?:\/\/.+/)],
      ],
      price: [0, [Validators.required, Validators.min(0)]],
      title: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      count: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const val = this.productForm.value;
      const product: Partial<IProduct> = {
        category: val.category,
        description: val.description,
        image: val.image,
        price: val.price,
        title: val.title,
        rating: {
          rate: val.rate,
          count: val.count,
        },
      };
      this.productService.addProduct(product);
      console.log('Form Submitted:', this.productForm.value);
    }
  }
}
