import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProduct, StorageItems } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  products: IProduct[] = [];

  private cartProductsSubject$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject([]);

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products').pipe(
      tap((data) => {
        this.products = data;
      })
    );
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
}
