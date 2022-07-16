/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de redes por disa
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT a.REDCCODRED as Red, a.REDTDSCL as RedDsc
FROM [dbo].[TB_RED] a
INNER JOIN [dbo].[TB_DISA_DIRESA] b ON a.REDCDISA = b.DISA_CODIGO AND a.REDCEST = 1
WHERE b.DISA_ESTADO = 1
AND b.DISA_CODIGO = @disa