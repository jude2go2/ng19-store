import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Input, Optional } from '@angular/core';
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
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class ProductFormComponent {
  public productForm: FormGroup;
  public isEditing: boolean = false;
  // dialogRef: inject<MatDialogRef<any>>(MatDialogRef, { optional: true })!
  readonly dialogRef = inject(MatDialogRef<ProductFormComponent>);

  // readonly data? =

  constructor(
    private fb: FormBuilder,
    private productService: ProductService // private dialogRef: MatDialogRef<ProductFormComponent>,
  ) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: [
        'https://picsum.photos/300/400',
        [Validators.required, Validators.pattern(/https?:\/\/.+/)],
      ],
      price: [0, [Validators.required, Validators.min(0)]],
      title: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      count: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    console.log('HAS DATA', this.productService.getProductForEdit());
    const productForEdit = this.productService.getProductForEdit();

    if (productForEdit) {
      this.isEditing = true;
      this.productForm = this.fb.group({
        category: [productForEdit.category, Validators.required],
        description: [productForEdit.description, Validators.required],
        image: [
          'https://picsum.photos/300/400',
          [Validators.required, Validators.pattern(/https?:\/\/.+/)],
        ],
        price: [productForEdit.price, [Validators.required, Validators.min(0)]],
        title: [productForEdit.title, Validators.required],
        rate: [
          productForEdit.rating.rate,
          [Validators.required, Validators.min(0), Validators.max(5)],
        ],
        count: [
          productForEdit.rating.count,
          [Validators.required, Validators.min(0)],
        ],
      });
    }
  }

  onSubmit(): void {
    const productForEdit = this.productService.getProductForEdit();
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
        ...(this.isEditing && { id: productForEdit.id }),
      };

      if (this.isEditing) {
        this.productService.editProduct(product as IProduct);
      } else {
        this.productService.addProduct(product);
      }

      console.log('Form Submitted:', this.productForm.value);
    }
  }
}
