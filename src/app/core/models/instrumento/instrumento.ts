import { Aspecto } from '../aspecto/aspecto';
import { VisitaInstrumento } from '../visita-instrumento/visita-instrumento';
import { RecursoInstrumento } from '../recurso-instrumento/recurso-instrumento';

export class Instrumento {
    id: string;
    idPlanMonitoreo: string;
    key: string;
    codigo: string;
    nombre: string;
    enuMonitores: string[];
    enuMuestra: string;
    muestraDescripcion: string;
    enuTipo: string;
    componente: string;
    resultado: string;
    indicador: string;
    etapa: number;
    modalidad: string;
    nivel: string;
    ciclo: string;
    area: string;
    referencia: string;
    esActivo: boolean;
    publicado: boolean;
    inicioReglas: boolean;
    tipoDescripcion: string;
    etapaDescripcion: string;
    modalidadDescripcion: string;
    nivelDescripcion: string;
    cicloDescripcion: string;
    areaDescripcion: string;

    visitas: VisitaInstrumento[];
    recursos: RecursoInstrumento[];

    aspectos: Aspecto[];
}
