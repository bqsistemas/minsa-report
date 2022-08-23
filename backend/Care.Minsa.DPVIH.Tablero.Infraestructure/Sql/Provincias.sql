/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de provincias por departamento
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT DISTINCT SUBSTRING(ubigeo, 3, 2) as ubigeo
INTO #ubigeo_provincias
FROM [db_recoleccion_vih].[dbo].[TB_MAESTRO_RENAES]
WHERE cod_disa = @disa

SELECT 
	Departamento as DepartamentoDsc
	,CodDepInei as Departamento
	,Provincia as ProvinciaDsc
	,CodProvInei as Provincia
  FROM [dbo].[TB_MAESTRO_UBIGEO]
  WHERE CodDepInei = @departamento
  AND CodProvInei in (SELECT ubigeo FROM #ubigeo_provincias)
  GROUP BY Departamento, Provincia, CodDepInei, CodProvInei
