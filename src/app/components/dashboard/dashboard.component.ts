import { Component } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [ProductFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
