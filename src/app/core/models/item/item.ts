import { QuestionConfig } from './../../../@simon/interfaces/question-config';
export class Item {
    id: string;
    idItem: string;
    key: string;
    idAspecto: string;
    idAspectoKey: string;
    codigo: string;
    titulo: string;
    esActivo: boolean;
    fechaCreacion: Date;
    configuracion: QuestionConfig;
    etiquetas: string[];

    // auxiliar
    select: boolean;
}
