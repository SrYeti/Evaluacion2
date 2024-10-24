import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private apiUrl = 'https://6710a1e6a85f4164ef2e9617.mockapi.io/p1/Usuario';
  private apiAsig = 'https://6710a1e6a85f4164ef2e9617.mockapi.io/p1/Asignatura';

  constructor(private http: HttpClient) {}

  // Método para obtener una lista de asignaturas
  getAsignaturas(): Observable<any> {
    return this.http.get(`${this.apiAsig}/`);
  }

  // Método para crear una nueva asignatura
  createAsignatura(asignaturaData: any): Observable<any> {
    return this.http.post(`${this.apiAsig}/`, asignaturaData);
  }

  // Método para obtener una asignatura por ID
  getAsignaturaById(id: string): Observable<any> {
    return this.http.get(`${this.apiAsig}/${id}`);
  }

  // Método para actualizar una asignatura
  updateAsignatura(id: string, asignaturaData: any): Observable<any> {
    return this.http.put(`${this.apiAsig}/${id}`, asignaturaData);
  }

  // Método para eliminar una asignatura
  deleteAsignatura(id: string): Observable<any> {
    return this.http.delete(`${this.apiAsig}/${id}`);
  }
}
