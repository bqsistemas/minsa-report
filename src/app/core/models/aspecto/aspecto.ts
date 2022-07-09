import { ItemInstrumento } from '../item-instrumento/item-instrumento';

export class Aspecto {
    id: any;
    key: string;
    idComponenteKey: string;
    enuIdTipoIndicador: string;
    enuIdTipoIndicadorKey: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    referencia: string;
    esActivo: boolean;
    fechaCreacion: Date;
    cantidadItems: number;
    ponderado: number;

    // auxiliar
    itemsInstrumento: ItemInstrumento[];

    idComponente: string;
    idResultado: string;
    idIndicador: string;
    select: boolean;
    children: any[];
    type: 'COMPONENTE' | 'RESULTADO' | 'INDICADOR' | 'ASPECTO';
}
