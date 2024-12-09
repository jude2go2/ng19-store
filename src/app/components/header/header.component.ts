import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartTotalItems$: Observable<number>;

  isAuthenticated$: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$();
  }

  ngOnInit() {
    this.cartTotalItems$ = this.productService.getCartProducts().pipe(
      map((data) => {
        return data.length;
      })
    );
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
