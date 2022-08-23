/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de departamentos
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT DISTINCT SUBSTRING(ubigeo, 0, 3) as ubigeo
INTO #ubigeo_departamentos
FROM [db_recoleccion_vih].[dbo].[TB_MAESTRO_RENAES]
WHERE cod_disa = @disa

SELECT 
	Departamento as DepartamentoDsc
	,CodDepInei as Departamento
  FROM [dbo].[TB_MAESTRO_UBIGEO]
  WHERE CodDepInei in (SELECT ubigeo FROM #ubigeo_departamentos)
  group by Departamento, CodDepInei
