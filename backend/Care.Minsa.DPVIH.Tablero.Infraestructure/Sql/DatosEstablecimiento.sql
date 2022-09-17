/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 16/09/2022
Description			: Obtiene datos del establecimientos de salud
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT    
   cod_disa AS Disa, cod_red AS Red, cod_microred AS MicroRed, RenaesKey as Establecimiento, ubigeo as Ubigeo
FROM dbo.TB_MAESTRO_RENAES
WHERE RenaesKey = @Establecimiento