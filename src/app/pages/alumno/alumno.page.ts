import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  asignaturas: any[] = [];
  usuarioLoggeado: any = null;

  constructor(
    private authService: AuthService,
    private webService: WebService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerUsuarioLoggeado();
    this.obtenerAsignaturas();
  }
  obtenerAsignaturas() {
    this.webService.getAsignaturas().subscribe(
      (data) => {
        this.asignaturas = data;
      },
      (error) => {
        console.error('Error al obtener asignaturas:', error);
      }
    );
  }
  obtenerUsuarioLoggeado() {
    this.usuarioLoggeado = this.authService.getLoggedInUser();
    if (!this.usuarioLoggeado) {
      // Si no hay usuario loggeado, redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
