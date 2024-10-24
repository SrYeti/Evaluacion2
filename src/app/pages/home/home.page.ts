import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthentication;
  }
  checkAuthentication() {
    this.isAuthenticated = this.authservice.isAuthenticated();
  }

  // Redirigir a la página de inicio de sesión
  goToLogin() {
    this.router.navigate(['/inicio-sesion']);
  }

  // Redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/registro']);
  }

  // Cerrar sesión
  logout() {
    this.authservice.logout();
    this.router.navigate(['/inicio-sesion']);
  }
}
