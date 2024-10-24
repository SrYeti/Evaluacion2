import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebService } from 'src/app/services/web.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  nombreUsuario: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authservice.login(this.nombreUsuario, this.password).subscribe(
      (user) => {
        // Redirigir según el rol del usuario
        if (user.rol === 'docente') {
          this.router.navigate(['/docente']);
        } else if (user.rol === 'alumno') {
          this.router.navigate(['/alumno']);
        }
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    );
  }
}
