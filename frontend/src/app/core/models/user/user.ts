import { Rol } from '../rol/rol';

export class User {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    numeroDocumento: string;
    idTipoDocumento: number;
    tipoDocumento: string;
    correoUsuario: string;
    ultimoInicioSesion: Date;
    idInicioSesion: string;
    roles: Rol[];

    // minsa
    userName: string;
    diresa: string[];
}
