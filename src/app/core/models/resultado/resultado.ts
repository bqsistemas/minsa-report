import { Indicador } from '../indicador/indicador';

export class Resultado {
    id: string;
    idComponente: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    referencia: string;
    esActivo: boolean;
    indicadores: Indicador[];

    // auxiliar
    select: boolean;
    children: any[];
    type: 'COMPONENTE' | 'RESULTADO' | 'INDICADOR' | 'ASPECTO';
}
