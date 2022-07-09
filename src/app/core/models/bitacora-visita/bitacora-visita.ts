import { Enum } from '../enum/enum';
import { Sede } from '../sede/sede';

export class BitacoraVisita {
    tipoBitacora: string;
    seEncontroSujetoDeMonitoreo: boolean;
    comentario: string;
    reprogramado: boolean;
    tipoVisita: string; // presencial, virtual, telefónica
    linkReunion: string;
    fechaVisita: Date;
    // reprogramación
    tipoVisitaReprogramacion: Enum[];
    fechaVisitaReprogramacion?: Date;
    linkReunionReProgramacion: string;
    // datos de monitor
    enuTipoMonitor?: string;
    tipoMonitorDescripcion: string;
    monitorTipoDocumento: number;
    monitorNumeroDocumento: string;
    monitorNombres: string;
    monitorPrimerApellido: string;
    monitorSegundoApellido: string;
    monitorSede: Sede;
    nombresAuxiliar: string;
    primerApellidoAuxiliar: string;
    segundoApellidoAuxiliar: string;
    // auditoria
    fechaCreacion: Date;
}
