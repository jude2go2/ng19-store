import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  constructor(private productService: ProductService, private route: ActivatedRoute) {}
  product: IProduct;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     const productId = params.get('id') || '';
      console.log('Product ID:', productId); // Log the ID
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
        console.log('Product by ID:', this.product); // Log the ID
    });

    });

  }
}
