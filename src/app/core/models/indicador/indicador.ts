import { Aspecto } from '../aspecto/aspecto';

export class Indicador {
    id: string;
    key: string;
    idComponente: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    referencia: string;
    esActivo: boolean;
    aspectos: Aspecto[];

    // auxiliar
    idResultado: string;
    idIndicador: string;
    select: boolean;
    children: any[];
    type: 'COMPONENTE' | 'RESULTADO' | 'INDICADOR' | 'ASPECTO';
}
