export interface Usuario {
  id: number;
  nombreUsuario: string;
  password: string;
  rol: 'docente' | 'alumno'; // El rol del usuario
}
