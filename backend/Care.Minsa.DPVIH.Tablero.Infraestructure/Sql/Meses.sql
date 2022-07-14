/*-----------------------------------------------------------------------------------
Created by			: Jhon Barrantes
Creation date		: 09/07/2022
Description			: Obtiene la lista de meses
-----------------------------------------------------------------------------------
Modified by 		:
Modification date	:
Description			:
-----------------------------------------------------------------------------------*/
SELECT RIGHT('0000' + CAST(nro_Mes AS nvarchar), 2) as Mes, desc_Mes as MesDsc FROM TB_MAESTRO_MESES
