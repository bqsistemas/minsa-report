import { Injectable } from '@angular/core';
import { VisitaRespuesta } from '@core/models/visita-respuesta/visita-respuesta';
import { ItemInstrumento } from '@core/models/item-instrumento/item-instrumento';
import { Option } from './../../interfaces/option';

import { environment } from 'src/environments/environment';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransformResultService {

  constructor() { }

  transformToVisitResult(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    switch (itemInstrumento.configuracion.type) {
      case environment.typesQuestion.multipleOpcion:
        return this.transformOpcionMultiple(itemInstrumento, formResult);
      case environment.typesQuestion.casillaVerificacion:
        return this.transformCasillaVerificacion(itemInstrumento, formResult);
      case environment.typesQuestion.rankinkEstrella:
        return this.transformRankingEstrella(itemInstrumento, formResult);
      case environment.typesQuestion.cargaArchivos:
        return this.transformCargaArchivo(itemInstrumento, formResult);
      case environment.typesQuestion.cuadroTextoSimple:
        return this.transformCuatroTextoSimple(itemInstrumento, formResult);
      case environment.typesQuestion.cuadroComentario:
        return this.transformCuadroComentario(itemInstrumento, formResult);
      case environment.typesQuestion.Cantidad:
        return this.transformCantidad(itemInstrumento, formResult);
      case environment.typesQuestion.FechaHora:
        return this.transformFecha(itemInstrumento, formResult);
    }
    return null;
  }
  transformOpcionMultiple(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {

    const codeOption = formResult[itemInstrumento.codigo];
    if (!codeOption) {
      return null;
    }

    let opcion: Option = null;

    // evaluar la respuesta incluye la opción OTROS
    const withOther = codeOption.indexOf('OTHER') >= 0;
    // obtener la opción seleccionada
    if (!withOther) {
      opcion = itemInstrumento.configuracion.resolve.options.find(x => x.code === codeOption);
    }

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = withOther ? formResult[itemInstrumento.codigo + '-OTHER'] : opcion.title;
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];
    if (result.conPuntaje) {
      result.conPuntaje = itemInstrumento.configuracion.resolve.withScore;
      result.puntajeObtenido = withOther ? 0 : opcion.score;
      result.marcoRespuestaCorrecta = opcion.isCorrect;
    }

    // para opción otros
    if (withOther) {
      result.conOtros = true;
      result.tipoFormatoOtros = itemInstrumento.configuracion.resolve.formatOtherOption;
      switch (itemInstrumento.configuracion.resolve.formatOtherOption) {
        case 'DATE':
          result.otrosFecha = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
        case 'NUMBER':
          result.otrosNumero = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
        case 'TEXT':
          result.otrosSimple = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
      }
    }

    // particular para múltiple opción
    result.opcionSeleccionada = withOther ? codeOption : opcion.code;
    return result;
  }
  transformCasillaVerificacion(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const codeOptions: string[] = formResult[itemInstrumento.codigo];
    if (!codeOptions) {
      return null;
    }

    let opciones: Option[] = null;

    // evaluar la respuesta incluye la opción OTROS
    const withOther = codeOptions.some(x => x === 'OTHER');
    // obtener la opción seleccionada
    opciones = itemInstrumento.configuracion.resolve.options.filter(x => codeOptions.some(y => y === x.code));

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = withOther ? (opciones.map(x => x.title).join(', ') + (opciones.length === 0 ?
      formResult[itemInstrumento.codigo + '-OTHER'] : ', ' + formResult[itemInstrumento.codigo + '-OTHER']))
      : opciones.map(x => x.title).join(', ');
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];
    if (result.conPuntaje) {
      result.conPuntaje = itemInstrumento.configuracion.resolve.withScore;
      result.puntajeObtenido = opciones.reduce((a, b) => a + (b['score'] || 0), 0);
      result.marcoRespuestaCorrecta = opciones.some(x => x.isCorrect); // se colocará true, si marcó al menos una correcta
    }

    // para opción otros
    if (withOther) {
      result.conOtros = true;
      result.tipoFormatoOtros = itemInstrumento.configuracion.resolve.formatOtherOption;
      switch (itemInstrumento.configuracion.resolve.formatOtherOption) {
        case 'DATE':
          result.otrosFecha = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
        case 'NUMBER':
          result.otrosNumero = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
        case 'TEXT':
          result.otrosSimple = formResult[itemInstrumento.codigo + '-OTHER'];
          break;
      }
    }

    // particular para casilla de verificación
    result.valorMultipleCadena = codeOptions;
    result.valorMultipleCadenaConcatenada = result.descripcionValor;
    result.valorMultipleCadenaCantidad = codeOptions.length;
    result.valorMultipleCadenaCantidadSinOtros = codeOptions.filter(x => x !== 'OTHER').length;
    // si marcó todas las alternativas sin otros
    result.valorMultipleCadenaTodas = codeOptions.length >= itemInstrumento.configuracion.resolve.options.length;
    return result;
  }
  transformRankingEstrella(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const codeOption = formResult[itemInstrumento.codigo];
    if (!codeOption) {
      return null;
    }

    let opcion: Option = null;

    // ranking de estrellas, no cuenta con el valor de otros
    // obtener la opción seleccionada
    opcion = itemInstrumento.configuracion.resolve.options.find(x => x.code === codeOption);

    const result: VisitaRespuesta = new VisitaRespuesta();
    result.descripcionValor = opcion.title;
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];
    // ranking de estrellas tiene por defecto calificación
    result.conPuntaje = itemInstrumento.configuracion.resolve.withScore;
    if (result.conPuntaje) {
      result.puntajeObtenido = opcion.score;
      // ranking de estrellas, no tiene definido una respuesta correcta marcada porque no suma a la calificación
      result.marcoRespuestaCorrecta = opcion.isCorrect;
    }

    // particular para ranking de estrellas
    result.opcionSeleccionada = opcion.code;
    result.cantidadEstrellas = opcion.score; // el score es según la cantidad de estrellas
    result.marcoValorMaximo = itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
      return (prev.score > current.score) ? prev : current;
    }).score === opcion.score;
    result.marcoValorMinimo = itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
      return (prev.score < current.score) ? prev : current;
    }).score === opcion.score;

    return result;
  }
  transformCargaArchivo(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const fileCode: string = formResult[itemInstrumento.codigo];
    if (!fileCode) {
      return null;
    }

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = fileCode;
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];

    // particular para carga de archivo
    result.valorArchivoCodigo = result.descripcionValor;
    result.valorArchivoPeso = formResult[itemInstrumento.codigo + '-SIZE'];
    result.valorArchivoExtension = formResult[itemInstrumento.codigo + '-EXTENSION'];
    result.valorFileName = formResult[itemInstrumento.codigo + '-FILENAME'];
    return result;
  }
  transformCuatroTextoSimple(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const value: string = formResult[itemInstrumento.codigo];
    if (!value) {
      return null;
    }

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = value;
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];

    // particular para texto simple
    result.cantidadPalabras = result.descripcionValor.split(' ').length;
    return result;
  }
  transformCuadroComentario(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const value: string = formResult[itemInstrumento.codigo];

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = value;
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];

    // particular para cuadro comentario
    result.cantidadPalabras = result.descripcionValor.split(' ').length;
    return result;
  }
  transformCantidad(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const value: number = Number(formResult[itemInstrumento.codigo]);
    if (!value) {
      return null;
    }

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = value.toString();
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];

    // particular para cantidad con rangos
    const withScore: boolean = itemInstrumento.configuracion.resolve.withScore;
    if (withScore) {
      const rangeOption: Option = itemInstrumento.configuracion.resolve.options
        .find(x => value > Number(x.scoreMin) && value <= Number(x.scoreMax));

      result.descripcionRango = 'mayor a ' + rangeOption?.scoreMin + ' menor igual a ' + rangeOption?.scoreMax;
      result.opcionSeleccionada = rangeOption.code;
      result.conPuntaje = true;
      result.puntajeObtenido = rangeOption.score;

      result.marcoRespuestaCorrecta = rangeOption.isCorrect;
      result.marcoValorMinimoRango = Number(rangeOption.scoreMin) === value;
      result.marcoValorMaximoRango = Number(rangeOption.scoreMax) === value;

      result.marcoValorMaximo = Number(itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
        return (prev.score > current.score) ? prev : current;
      }).scoreMax) === value;
      result.marcoValorMinimo = Number(itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
        return (prev.score < current.score) ? prev : current;
      }).scoreMin) === value;
    }
    // particupar para cantidad
    result.valorCantidad = value;
    return result;
  }
  transformFecha(itemInstrumento: ItemInstrumento, formResult: any): VisitaRespuesta {
    const value: Date = formResult[itemInstrumento.codigo];
    if (!value) {
      return null;
    }

    const result: VisitaRespuesta = new VisitaRespuesta();
    // si es que la opción marcada es OTHER entonces tomamos el texto ingresado por el usuario, sino el texto de la opción
    result.descripcionValor = moment(value).format('DD/MM/yyyy');
    // asignar el valor del comentario
    result.comentario = formResult[itemInstrumento.codigo + '-COMMENT'];

    // particular para cantidad con rangos
    const withScore: boolean = itemInstrumento.configuracion.resolve.withScore;
    if (withScore) {
      const rangeOption: Option = itemInstrumento.configuracion.resolve.options
        .find(x => value.getTime() > new Date(x.scoreMin).getTime()
          && value.getTime() <= new Date(x.scoreMax).getTime());

      result.descripcionRango = 'mayor a ' + moment(rangeOption?.scoreMin).format('DD/MM/yyyy') + ' menor igual a '
        + moment(rangeOption?.scoreMax).format('DD/MM/yyyy');
      result.opcionSeleccionada = rangeOption.code;
      result.conPuntaje = true;
      result.puntajeObtenido = rangeOption.score;

      result.marcoRespuestaCorrecta = rangeOption.isCorrect;
      result.marcoValorMinimoRango = new Date(rangeOption.scoreMin).getTime() === value.getTime();
      result.marcoValorMaximoRango = new Date(rangeOption.scoreMax).getTime() === value.getTime();
      result.marcoValorMaximo = new Date(itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
        return (new Date(prev.score).getTime() > new Date(current.score).getTime()) ? prev : current;
      }).scoreMax).getTime() === value.getTime();
      result.marcoValorMinimo = new Date(itemInstrumento.configuracion.resolve.options.reduce((prev, current) => {
        return (new Date(prev.score).getTime() < new Date(current.score).getTime()) ? prev : current;
      }).scoreMin).getTime() === value.getTime();
    }
    // particupar para cantidad
    result.valorFecha = value;
    result.valorFechaDia = value.getDay();
    result.valorFechaMes = value.getMonth();
    result.valorFechaAnio = value.getFullYear();
    result.valorFechaMesNombre = moment.localeData('es').months()[result.valorFechaMes];
    result.valorFechaDiaNombre = moment.localeData('es').weekdays()[result.valorFechaDia];
    return result;
  }
  structureFromResult(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    if (!result) {
      return null;
    }

    switch (itemInstrumento.configuracion.type) {
      case environment.typesQuestion.multipleOpcion:
        return this.structureFromResultOpcionMultiple(itemInstrumento, result);
      case environment.typesQuestion.casillaVerificacion:
        return this.structureFromResultCasillaVerificacion(itemInstrumento, result);
      case environment.typesQuestion.rankinkEstrella:
        return this.structureFromResultRankingEstrella(itemInstrumento, result);
      case environment.typesQuestion.cargaArchivos:
        return this.structureFromResultCargaArchivo(itemInstrumento, result);
      case environment.typesQuestion.cuadroTextoSimple:
        return this.structureFromResultCuatroTextoSimple(itemInstrumento, result);
      case environment.typesQuestion.cuadroComentario:
        return this.structureFromResultCuadroComentario(itemInstrumento, result);
      case environment.typesQuestion.Cantidad:
        return this.structureFromResultCantidad(itemInstrumento, result);
      case environment.typesQuestion.FechaHora:
        return this.structureFromResultFecha(itemInstrumento, result);
    }
    return null;
  }
  structureFromResultOpcionMultiple(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.opcionSeleccionada;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    if (result.conOtros) {
      switch (result.tipoFormatoOtros) {
        case 'DATE':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosFecha;
          break;
        case 'NUMBER':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosNumero;
          break;
        case 'TEXT':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosSimple;
          break;
      }
    }
    return valueControl;
  }
  structureFromResultCasillaVerificacion(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.valorMultipleCadena;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    if (result.conOtros) {
      switch (result.tipoFormatoOtros) {
        case 'DATE':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosFecha;
          break;
        case 'NUMBER':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosNumero;
          break;
        case 'TEXT':
          valueControl[itemInstrumento.codigo + '-OTHER'] = result.otrosSimple;
          break;
      }
    }
    return valueControl;
  }
  structureFromResultRankingEstrella(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.opcionSeleccionada;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    return valueControl;
  }
  structureFromResultCargaArchivo(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.valorArchivoCodigo;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    valueControl[itemInstrumento.codigo + '-SIZE'] = result.valorArchivoPeso;
    valueControl[itemInstrumento.codigo + '-EXTENSION'] = result.valorArchivoExtension;
    valueControl[itemInstrumento.codigo + '-FILENAME'] = result.valorFileName;
    return valueControl;
  }
  structureFromResultCuatroTextoSimple(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.descripcionValor;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    return valueControl;
  }
  structureFromResultCuadroComentario(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = result.descripcionValor;
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    return valueControl;
  }
  structureFromResultCantidad(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = Number(result.valorCantidad);
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    return valueControl;
  }
  structureFromResultFecha(itemInstrumento: ItemInstrumento, result: VisitaRespuesta) {
    const valueControl: any = {};
    valueControl[itemInstrumento.codigo] = new Date(result.valorFecha);
    valueControl[itemInstrumento.codigo + '-COMMENT'] = result.comentario;
    return valueControl;
  }
}
