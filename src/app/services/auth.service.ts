import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  login(email: string, password: string) {
    debugger;
    this.isLoggedIn$.next(true);
    this.storageService.setLocal('authToken', 'sample-token');
  }

  logout() {
    this.isLoggedIn$.next(false);
    this.storageService.removeLocal('authToken');
  }

  isAuthenticated$(): Observable<boolean> {
    if (!!localStorage.getItem('authToken')) {
      this.isLoggedIn$.next(true);
    }

    return this.isLoggedIn$.asObservable();
  }
}