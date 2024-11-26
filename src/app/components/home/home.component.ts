import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productervice: ProductService) {}
  public products: IProduct[];
  public categoriesList: Array<string> = [];
  activeCategories = new FormControl(this.categoriesList);
  ngOnInit(): void {
    this.productervice.getProducts().subscribe((data) => {
      this.products = data;
      console.log('all product: ', this.products);
      this.products.forEach((product) => {
        this.categoriesList.push(product.category);
      });
      this.categoriesList = this.categoriesList.filter(
        (product, index) => this.categoriesList.indexOf(product) === index
      );
      console.log('categories: ', this.categoriesList);
      console.log('active categories',this.activeCategories)
    });
  }
}
