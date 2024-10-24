import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/UsuarioAPI';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://6710a1e6a85f4164ef2e9617.mockapi.io/p1/Usuario'; // URL del recurso 'usuario' en MockAPI
  private userLoggeado: any = null;

  constructor(private http: HttpClient) {}

  //registrar un usuario
  registrarUser(userData: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}`, userData);
  }

  // Método para obtener usuarios
  obtenerUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`).pipe(
      map((users) => {
        return users; // Puedes filtrar o procesar los usuarios según el rol si es necesario
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.obtenerUsers().pipe(
      map((users: Usuario[]) => {
        const user = users.find(
          (u: Usuario) =>
            u.nombreUsuario === username && u.password === password
        );
        if (user) {
          this.userLoggeado = user;
          localStorage.setItem('loggedInUser', JSON.stringify(user)); // Guardar en localStorage
          return user;
        } else {
          throw new Error('Credenciales inválidas');
        }
      })
    );
  }

  //cerrar sesión
  logout(): void {
    this.userLoggeado = null;
    localStorage.removeItem('loggedInUser'); // También puedes limpiar el LocalStorage si guardas ahí
  }

  //obtener el usuario logueado
  getLoggedInUser(): any {
    return (
      this.userLoggeado ||
      JSON.parse(localStorage.getItem('loggedInUser') || 'null')
    );
  }

  //verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getLoggedInUser() !== null;
  }
}
