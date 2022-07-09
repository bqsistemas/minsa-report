import { Componente } from '../componente/componente';
import { Sede } from '../sede/sede';
export class PlanMonitoreo {
    id: string;
    key: string;
    codigo: string;
    nombre: string;
    actores: any[];
    dre?: Sede;
    ugel?: Sede;
    ugels: Sede[];
    sede: Sede;
    periodo: number;
    descripcion: string;
    periodoMinimo: number;
    periodoMaximo: number;
    fechaInicio: Date;
    fechaFin: Date;
    esActivo: boolean;
    esCulminado: boolean;
    publicado: boolean;
    enuTipo: string;
    tipoDescripcion: string;
    idMarcoLogico: string;
    marcoLogicoNombre: string;
    marcoLogico: string;
    etapa: number;
    etapaDescripcion: string;
    modalidad: string;
    modalidadDescripcion: string;

    componentes: Componente[];
}
