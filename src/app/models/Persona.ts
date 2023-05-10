import { Usuario } from './Usuario';
import { TipoIdentificacion } from './TipoIdentificacion';
export class Persona
{
  idPersona: string;
  tipoId: TipoIdentificacion;
  perNom: string;
  sdoNom: string;
  perApell: string;
  sdoApell: string;
  fechaNac: Date;
  celular: string;
  usuario: Usuario;
}
