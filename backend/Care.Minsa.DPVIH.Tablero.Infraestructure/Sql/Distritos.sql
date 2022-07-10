/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de distritos por provincia
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
	,Distrito as DistritoDsc
	,CodDistInei as Distrito
  FROM [dbo].[TB_MAESTRO_UBIGEO]
  WHERE CodDepInei = @departamento AND CodProvInei = @provincia
  GROUP BY Departamento, CodDepInei, Provincia, CodProvInei, Distrito, CodDistInei