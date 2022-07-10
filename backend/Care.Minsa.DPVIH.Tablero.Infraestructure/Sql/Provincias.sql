/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de provincias por departamento
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT 
	Departamento as DepartamentoDsc
	,CodDepInei as Departamento
	,Provincia as ProvinciaDsc
	,CodProvInei as Provincia
  FROM [dbo].[TB_MAESTRO_UBIGEO]
  WHERE CodDepInei = @departamento
  GROUP BY Departamento, Provincia, CodDepInei, CodProvInei