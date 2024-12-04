import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  public cartProducts: IProduct[];
  public totalPrice: number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getCartProducts()
      .pipe(
        tap((data) => {
          this.totalPrice = 0;
          data.forEach((item) => {
            this.totalPrice = this.totalPrice + item.price;
          });
        })
      )
      .subscribe((data) => {
        this.cartProducts = data;
        console.log(data);
      });
  }

  removeFromCart(product: IProduct) {
    this.productService.removeProductFromCart(product);
  }
}
