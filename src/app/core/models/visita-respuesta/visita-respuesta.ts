export class VisitaRespuesta {
    id: string;
    idItemInstrumento: string;
    itemDescripcion: string;
    tipoItem: string;
    tipoItemDescripcion: string;
    idVisitaMuestra: string;
    idAspecto: string;
    aspectoDescripcion: string;
    codigoAspecto: string;
    apply: boolean;
    // valor
    descripcionValor: string;
    descripcionRango: string;
    comentario: string;
    // para tipo de ítem:
    // OPCIÓN MÚLTIPLE -> TYPE_01
    // RANKING DE ESTRELLAS -> TYPE_03
    // CANTIDAD CON RANGO -> TYPE_07
    // FECHA CON RANGO -> TYPE_08
    opcionSeleccionada: string;
    conPuntaje: boolean;
    puntajeObtenido: number;
    marcoRespuestaCorrecta: boolean;
    // para tipo de ítem:
    // CUADRO DE TEXTO SIMPLE -> TYPE_05
    // CUADRO DE COMENTARIO -> TYPE_06
    cantidadPalabras: number;
    // para tipo de ítem:
    // RANKING DE ESTRELLAS -> TYPE_03
    // CANTIDAD CON RANGO -> TYPE_07
    marcoValorMaximo?: boolean;
    marcoValorMinimo?: boolean;
    // -----------------------------------------------------------------
    // para tipo de item: OPCIÓN MÚLTIPLE -> TYPE_01

    // -----------------------------------------------------------------
    // para tipo de item: CASILLA DE VERIFICACIÓN -> TYPE_02
    valorMultipleCadena: string[];
    valorMultipleCadenaConcatenada: string;
    valorMultipleCadenaCantidad?: number;
    valorMultipleCadenaCantidadSinOtros?: number;
    valorMultipleCadenaTodas?: boolean;
    // para tipo de ítem: RANKING DE ESTRELLAS -> TYPE_03
    cantidadEstrellas?: number;
    // -----------------------------------------------------------------
    // para tipo de ítem: CARGA DE ARCHIVO -> TYPE_04
    valorArchivoCodigo: string;
    valorArchivoPeso?: number;
    valorArchivoExtension: string;
    valorFileName: string;
    // -----------------------------------------------------------------
    // para tipo de ítem: CANTIDAD -> TYPE_07
    valorCantidad: number;
    marcoValorMaximoRango?: boolean;
    marcoValorMinimoRango?: boolean;
    // para tipo de item: FECHA -> TYPE_08
    valorFecha: Date;
    valorFechaDia?: number;
    valorFechaMes?: number;
    valorFechaAnio?: number;
    valorFechaTiempo?: Date;
    valorFechaMesNombre: string;
    valorFechaDiaNombre: string;
    // -----------------------------------------------------------------
    // para todos los que marquen opción otros
    conOtros: boolean;
    tipoFormatoOtros: string;
    otrosSimple: string;
    otrosNumero: number;
    otrosFecha: Date;
    respuestas: VisitaRespuesta[];
}
