import { Sede } from '../sede/sede';
import { BitacoraVisita } from '../bitacora-visita/bitacora-visita';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Muestra } from '../muestra/muestra';
import { PlanMonitoreo } from '../plan-monitoreo/plan-monitoreo';
import { Instrumento } from '../instrumento/instrumento';

export class VisitaMuestra {
    id: string;
    idMuestra: string;
    enuTipoVisita: string;
    tipoVisitaDescripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    datoAdicional: string;
    // datos de visita
    seEncontroSujetoDeMonitoreo: boolean;
    conReemplazo: boolean;
    esReintegroDeEjecucion: boolean;
    numeroVisita: number;
    codigo: string;
    enuEstado: string; // TIPO_ESTADO_VISITA
    esReprogramada: boolean;
    fechaProgramacion: Date;
    horaInicio: Date;
    horaFin: Date;
    fechaInicioEjecucion: Date;
    horaInicioEjecucion: Date;
    fechaCierreEjecucion: Date;
    horaFinCierreEjecucion: Date;
    esAnulado: boolean;
    nombresAuxiliar: string; // es la persona que en caso de no estar el monitoreado, pues realiza las respuestas en representación de él
    primerApellidoAuxiliar: string;
    segundoApellidoAuxiliar: string;
    observacion: string;
    compromisos: string[];
    enuTipoMonitor: string;
    tipoMonitorDescripcion: string;
    monitorTipoDocumento: number;
    monitorNumeroDocumento: number;
    monitorNombres: string;
    monitorPrimerApellido: string;
    monitorSegundoApellido: string;
    monitorSede: Sede;
    bitacora: BitacoraVisita[];
    muestra: Muestra;
    plan: PlanMonitoreo;
    instrumento: Instrumento;
    aspectosCompletados: string[];
}
