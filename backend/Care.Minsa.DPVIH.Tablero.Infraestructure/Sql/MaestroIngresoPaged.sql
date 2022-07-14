/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista maestro ingreso paginado
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT 
	indicador.id_maestro_ingreso as IdMaestroIngreso,
	indicador.anio as Anio, 
	mes.desc_Mes as Mes,
	disa.DISA_NOMBRE as Disa,
	red.REDTDSCL as Red,
	microred.MRETDSCL as Mred,
	renaes.Establecimiento as Renaes,
	cast(COUNT(1) OVER(PARTITION By 0) as int) as [RowCount]
INTO #consulta FROM [db_recoleccion_vih].[dbo].[TB_MAESTRO_INGRESO] indicador
-- DISA
INNER JOIN TB_DISA_DIRESA disa on indicador.disa = disa.DISA_CODIGO
-- RED
INNER JOIN TB_RED red on indicador.red = red.REDCCODRED AND red.REDCDISA = indicador.disa
-- MICRORED
INNER JOIN TB_MICRORED microred on indicador.mred = microred.MRECMICRO AND microred.MRECDISA = indicador.disa AND microred.MRECRED = indicador.red
-- RENAES
INNER JOIN TB_MAESTRO_RENAES renaes on indicador.renaes = renaes.RenaesKey AND renaes.cod_disa = indicador.disa AND renaes.cod_red = indicador.red AND renaes.cod_microred = indicador.mred
-- MES
INNER JOIN TB_MAESTRO_MESES mes on indicador.mes = mes.nro_Mes
ORDER BY indicador.id_maestro_ingreso DESC
OFFSET ((@pageNumber - 1) * @rowsPerPage) ROWS
FETCH NEXT @rowsPerPage ROWS ONLY

SELECT 
	*
FROM #consulta