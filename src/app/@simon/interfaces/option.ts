export interface Option {
    code?: string; // código de la alternativa
    title: string; // propiedad para el nombre de la alternativa;
    withDescription?: boolean; // si la altervativa tendrá o no descripción
    description?: string; // descripción de la alternativa
    value: string; // VALOR de la respuesta colocada
    score: number; // propiedad para asignar un valor a la alternativa;
    scoreMin: string; // propiedad que define el valor mínimo de la opción, en caso de tener intervalos
    scoreMax: string; // propiedad que define el valor máximo de la opción, en caso de tener intervalos
    order: number; // propiedad que define el orden de la alternativa
    isCorrect: boolean; // propiedad que determina si es la respuesta correcta;
    isOther: boolean;
    format?: 'NUMBER' | 'DATE' | 'DATETIME' | 'TEXT';
}
