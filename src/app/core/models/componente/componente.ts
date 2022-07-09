import { Resultado } from '../resultado/resultado';

export class Componente {
    id: any;
    key: string;
    idComponente?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    referencia: string;
    esActivo: boolean;
    fechaCreacion: Date;
    cantidadAspectos: number;
    cantidadIndicadores: number;
    cantidadResultados: number;
    cantidadItems: number;
    resultados: Resultado[];
    // auxiliar
    select: boolean;
    children: any[];
    type: 'COMPONENTE' | 'RESULTADO' | 'INDICADOR' | 'ASPECTO';
}
