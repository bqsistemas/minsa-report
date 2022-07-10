/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de micro redes por red
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/

SELECT 
   MRECMICRO as MicroRed, MRETDSCL as MicroRedDsc
FROM db_recoleccion_vih.dbo.TB_MICRORED
WHERE MRECDISA = @disa AND MRECRED = @red AND MRECEST > 0