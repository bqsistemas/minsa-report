/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de direcciones
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT	
	DISA_CODIGO as Disa,
	DISA_TIPO + ' ' + DISA_NOMBRE as DisaDsc
FROM [dbo].[TB_DISA_DIRESA]
WHERE DISA_ESTADO = 1