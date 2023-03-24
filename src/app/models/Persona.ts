import { Usuario } from './Usuario';
import { TipoIdentificacion } from './TipoIdentificacion';
export class Persona
{
  id_persona: string;
  tipoIdentificacion: TipoIdentificacion;
  perNom: string;
  sdoNom: string;
  perApell: string;
  sdoApell: string;
  fecha_nac: Date;
  celular: string;
  usuario: Usuario;
}
