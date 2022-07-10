/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de departamentos
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT 
	Departamento as DepartamentoDsc
	,CodDepInei as Departamento
  FROM [dbo].[TB_MAESTRO_UBIGEO]
  group by Departamento, CodDepInei
