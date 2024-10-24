import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebService } from 'src/app/services/web.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  constructor(
    private authService: AuthService,
    private webService: WebService,
    private router: Router
  ) {}
  asignaturas: any[] = [];
  usuarioLoggeado: any = null;

  ngOnInit() {
    this.obtenerUsuarioLoggeado();
    this.obtenerAsignaturas();
  }
  obtenerAsignaturas() {
    this.webService.getAsignaturas().subscribe(
      (data) => {
        // Filtrar asignaturas para mostrar solo las asignadas al docente logueado
        const docenteID = this.authService.getLoggedInUser()?.id;
        this.asignaturas = data.filter(
          (asignatura: any) => asignatura.IDdocente === docenteID
        );
      },
      (error) => {
        console.error('Error al obtener asignaturas:', error);
      }
    );
  }
  obtenerUsuarioLoggeado() {
    this.usuarioLoggeado = this.authService.getLoggedInUser();
    if (!this.usuarioLoggeado || this.usuarioLoggeado.rol !== 'docente') {
      // Si no hay usuario logueado o no es docente, redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
