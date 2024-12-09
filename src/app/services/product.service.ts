import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IProduct, StorageItems } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.fetchProducts();
  }

  products: IProduct[] = [];
  private products$: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);

  private cartProductsSubject$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject([]);

  public getProducts(): Observable<IProduct[]> {
    this.fetchProducts();
    return this.products$.asObservable();
  }

  private fetchProducts(): void {
    this.http
      .get<IProduct[]>('https://fakestoreapi.com/products')
      .pipe(
        map((data) => {
          const newProducts: Array<IProduct> = this.storageService.getLocal(
            StorageItems.NewProducts
          );
          const allProducts: Array<IProduct> = [...data, ...newProducts];

          return allProducts;
        })
      )
      .subscribe((data) => {
        this.products$.next(data);
      });
  }

  public getProductById(id: string): Observable<IProduct> {
    console.log('serviceID ', id);
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }

  public addProductToCart(product: IProduct): void {
    const currentProducts = this.cartProductsSubject$.value;

    currentProducts.push(product);

    this.storageService.setLocal(StorageItems.Cart, currentProducts);
    this.cartProductsSubject$.next(currentProducts);
  }

  public removeProductFromCart(product: IProduct) {
    const currentProducts = this.cartProductsSubject$.value;
    const indx = currentProducts.findIndex((item) => {
      return item.id === product.id;
    });

    if (indx !== -1) {
      currentProducts.splice(indx, 1);
      this.storageService.setLocal(StorageItems.Cart, currentProducts);
      this.cartProductsSubject$.next(currentProducts);
    }
  }

  public getCartProducts(): Observable<IProduct[]> {
    const existingProductsInCart: IProduct[] = this.storageService.getLocal(
      StorageItems.Cart
    );

    if (existingProductsInCart.length) {
      this.cartProductsSubject$.next(existingProductsInCart);
    }

    return this.cartProductsSubject$.asObservable();
  }

  addProduct(product: Partial<IProduct>): void {
    const newProducts: Array<IProduct> = this.storageService.getLocal(
      StorageItems.NewProducts
    );
    const allProducts: Array<IProduct> = [
      ...this.products$.value,
      ...newProducts,
    ];

    product.id = allProducts.length + 1;
    const justNewProducts: Array<IProduct> = [
      ...newProducts,
      product as IProduct,
    ];
    allProducts.push(product as IProduct);
    this.storageService.setLocal(StorageItems.NewProducts, justNewProducts);

    this.fetchProducts();
  }

  editProduct(product: IProduct): void {
    const allProducts: Array<IProduct> = this.products$.value;

    const idx = allProducts.findIndex((item) => {
      return item.id === product.id;
    });

    if (idx !== -1) {
      allProducts[idx] = product;
    }
    debugger;
    this.products$.next(allProducts);
  }

  productForEdit: IProduct;

  setProductForEdit(product: IProduct): void {
    this.productForEdit = product;
  }
  getProductForEdit(): IProduct {
    return this.productForEdit;
  }
}
