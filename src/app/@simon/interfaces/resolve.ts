import { Option } from './option';
import { FormatOtherOption } from './format-other-option';
import { IntervalScore } from './interval-score';

export interface Resolve {
    order: number; // orden de la pregunta
    title: string; // propiedad para el nombre de la pregunta
    options: Option[]; // opciones de alternativas para la pregunta
    withInstructions: boolean; // propiedad que define si la pregunta tendrá instrucciones
    instructions: string; // texto de las instrucciones
    withMultipleAnswers: boolean; // propiedad que define si la pregunta tendrá múltiples respuestas o no
    withMultipleOptions: boolean; // propiedad que define si la pregunta tendrá múltiples alternativas o no
    typeOption: 'NUMBER' | 'DATE' | 'DATETIME' | 'TEXT'; // NUMBER | DATE | DATETIME | TEXT  - Tipos de datos para llenar en la alternativa de "OTRO (Específique)"
    withSkipQuestion: boolean; // propiedad que define si la pregunta tendrá la opción de saltar pregunta
    withOtherOption: boolean; // propiedad que define si la pregunta tendrá la opción de OTRO
    isTextArea: boolean;
    withOnlyDate: boolean;
    formatOtherOption: 'NUMBER' | 'DATE' | 'DATETIME' | 'TEXT';
    intervalScore: IntervalScore[];
    withScore: boolean; // propiedad que define si las alternativas de la pregunta tendrán score
}
