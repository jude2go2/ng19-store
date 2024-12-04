import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartTotalItems$: Observable<number>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cartTotalItems$ = this.productService.getCartProducts().pipe(
      map((data) => {
        return data.length;
      })
    );
  }
}
