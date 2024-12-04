import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLocal(key: string, value: any): void {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  getLocal(key: string): any {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    return data;
  }
}
