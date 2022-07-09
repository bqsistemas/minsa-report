export interface Configuration {
    multipleAswers: boolean; // opción que representa si deben ser respuestas múltiples 
    multipleOptions: boolean; // alternativas múltiples; permite el registro de más de una alternativa o NO
    instructions: boolean; // opción para mostrar al usuario la posiblidad de agregar o no indicaciones
    typeOption: 'NUMBER' | 'DATE' | 'DATETIME' | 'TEXT'; // NUMBER | DATE | DATETIME | TEXT  - Tipos de datos para llenar en la alternativa de "OTRO (Específique)"
    skipQuestion: boolean; // opcion para mostrar al usuario la posibilidad de marcar si la pregunta tendrá saltar pregunta(NO APLICA) -> obligatoriedad o no
    otherOption: boolean; // opción para mostrar al usuario la posibilidad de marcar que puede existir otra opción
    score: boolean;
    textArea: boolean;
    intervalScore: boolean;
}
