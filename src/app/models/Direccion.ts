import { Usuario } from './Usuario';
import { Ciudad } from './Ciudad';
export class Direccion
{
  id_direccion: number;
  nombre: string;
  direccion: string;
  info_adic: string;
  cod_postal: string;
  ciudad: Ciudad;
  usuario: Usuario;
}
