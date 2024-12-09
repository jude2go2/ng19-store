import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../models';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIcon, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: IProduct;

  constructor(private productService: ProductService) {}
  readonly dialog = inject(MatDialog);

  addToCart(prod: IProduct) {
    this.productService.addProductToCart(prod);
  }

  openEditProductDialog() {
    this.productService.setProductForEdit(this.product);
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
