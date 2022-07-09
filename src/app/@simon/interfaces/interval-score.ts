export interface IntervalScore {
    min: any; // propiedad que determina el mínimo de este score
    max: any; // propiedad que determina el máximo de este score
    score: number; // propiedad que determina el valor que corresponde al intervalo
    format: 'NUMBER' | 'DATE' | 'DATETIME'; // NUMBER | DATE | DATETIME | TEXT
}
