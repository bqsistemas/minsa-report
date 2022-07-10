/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de establecimientos por microred
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT 
   RenaesKey as Establecimiento, estab_nombre as EstablecimientoDsc
FROM db_recoleccion_vih.dbo.TB_MAESTRO_RENAES
WHERE cod_disa = @disa AND cod_red = @red AND cod_microred = @microred