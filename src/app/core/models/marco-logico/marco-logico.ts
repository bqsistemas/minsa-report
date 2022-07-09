import { Componente } from '../componente/componente';
import { Sede } from '../sede/sede';
export class MarcoLogico {
    id: string;
    key: string;
    codigo: string;
    nombre: string;
    enuTipo: string;
    tipoDescripcion: string;
    dre?: Sede;
    ugel?: Sede;
    sede: Sede;
    periodoMinimo: string;
    periodoMaximo: string;
    esActivo: boolean;
    esValido: boolean;
    objetivoDesarrollo: string;
    objetivoGeneral: string;
    objetivoEspecifico: string;
    fechaCreacion: Date;

    componentes: Componente[];

    // auxiliar
    select: boolean;
}
