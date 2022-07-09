import { QuestionConfig } from './../../../@simon/interfaces/question-config';
import { QuestionRule } from 'src/app/@simon/interfaces/question-rule';

export class ItemInstrumento {
    id: string;
    idInstrumento: string;
    idAspecto: string;
    idItem: string;
    orden: number;

    codigo: string;
    titulo: string;
    etiquetas: string[];

    items: ItemInstrumento[];
    configuracion: QuestionConfig;
    reglas: QuestionRule;

    // auxiliar
    comentario: string;
    constructor() {
        this.reglas = ({
            itsDependent: false,
            required: true,
            rules: []
        } as QuestionRule);
    }
}
