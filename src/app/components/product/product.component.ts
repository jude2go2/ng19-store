import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../models';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

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

  addToCart(prod: IProduct) {
    this.productService.addProductToCart(prod);
  }
}
