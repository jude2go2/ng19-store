import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { P } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  product: IProduct;

  product$: Observable<IProduct>;

  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    //snapshot
    this.sub.add(
      this.route.paramMap.subscribe((params) => {
        const productId = params.get('id') || '';
        // console.log('Product ID:', productId); // Log the ID
        this.sub.add(
          this.productService.getProductById(productId).subscribe((data) => {
            this.product = data;
            // console.log('Product by ID:', this.product); // Log the ID
          })
        );
      })
    );
    this.sub.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const productId = params.get('id') || '';
            return this.productService.getProductById(productId);
          })
        )
        .subscribe((data) => {
          this.product = data;
        })
    );

    let obs1$ = this.route.paramMap;
    let obs2$ = (id: string) => this.productService.getProductById(id);

    this.product$ = obs1$.pipe(
      switchMap((params) => {
        const productId = params.get('id') || '';
        return obs2$(productId);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addToCart(prod: IProduct): void {
    this.productService.addProductToCart(prod);
  }
}
