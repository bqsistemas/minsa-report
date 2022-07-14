export class Indicador {
    idMaestroIngreso: number
    anio: string
    mes: string
    disa: number
    red: string
    mred: string
    renaes: number
    dep: string
    prov: string
    dis: string
    etapa: number
    sexo: string
    etnia: string
    vinPersonaEstimada: string
    itsPersonaEstimadaTamizajeSifilis: string
    itsPersonaEstimadaDiagnosticoIts: string
    tmiGestanteAtendidaVih: string
    tmiGestanteAtendidaSifilis: string
    tmiGestanteAtendidaHepatitisB: string

    constructor(data: any = null) {
        if(data){
            this.idMaestroIngreso = data.idMaestroIngreso
            this.anio = data.anio
            this.mes = data.mes
            this.disa = data.disa
            this.red = data.red
            this.mred = data.mred
            this.renaes = data.renaes
            this.dep = data.dep
            this.prov = data.prov
            this.dis = data.dis
            this.etapa = data.etapa
            this.sexo = data.sexo
            this.etnia = data.etnia
            this.vinPersonaEstimada = data.vinPersonaEstimada
            this.itsPersonaEstimadaTamizajeSifilis = data.itsPersonaEstimadaTamizajeSifilis
            this.itsPersonaEstimadaDiagnosticoIts = data.itsPersonaEstimadaDiagnosticoIts
            this.tmiGestanteAtendidaVih = data.tmiGestanteAtendidaVih
            this.tmiGestanteAtendidaSifilis = data.tmiGestanteAtendidaSifilis
            this.tmiGestanteAtendidaHepatitisB = data.tmiGestanteAtendidaHepatitisB
        }
    }

    /* setMes() {
        this.mes = parseInt(this.mes.toString())
    } */
}
