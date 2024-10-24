import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombreUsuario: string = '';
  password: string = '';
  rol: string = ''; // 'docente' o 'alumno'
  errorMessage: string = '';
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {}
  registrar() {
    if (this.nombreUsuario && this.password && this.rol) {
      const userData = {
        nombreUsuario: this.nombreUsuario,
        password: this.password,
        rol: this.rol,
      };

      this.authservice.registrarUser(userData).subscribe(
        (response) => {
          // Registro exitoso, redirigir a la página de inicio de sesión
          this.router.navigate(['/inicio-sesion']);
        },
        (error) => {
          this.errorMessage =
            'Hubo un problema al registrar. Inténtalo de nuevo.';
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios.';
    }
  }
}
