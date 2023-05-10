import { Usuario } from './Usuario';
import { Ciudad } from './Ciudad';
export class Direccion
{
  idDireccion: number;
  nombre: string;
  direccion: string;
  infoAdic: string;
  codPostal: string;
  ciudad: Ciudad;
  usuario: Usuario;
}
