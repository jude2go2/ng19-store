import { Component } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  imports: [ProductFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
