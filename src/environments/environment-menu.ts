// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import icLayers from '@iconify/icons-ic/twotone-layers';
import icHome from '@iconify/icons-ic/twotone-home';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icCalendarDay from '@iconify/icons-ic/twotone-calendar-today';
import icPlayListAddCheck from '@iconify/icons-ic/twotone-playlist-add-check';
import icTimeLine from '@iconify/icons-ic/twotone-timeline';
import icPeople from '@iconify/icons-ic/twotone-people';
import icApps from '@iconify/icons-ic/twotone-apps';
import icListAlt from '@iconify/icons-ic/twotone-list-alt';
import icShowChart from '@iconify/icons-ic/twotone-show-chart';
import icWidgets from '@iconify/icons-ic/twotone-widgets';
import icFeaturedPlayList from '@iconify/icons-ic/twotone-featured-play-list';
import icQuestionAnswer from '@iconify/icons-ic/twotone-question-answer';
import theme from '../@vex/utils/tailwindcss';
import { environment } from './environment';

export const environmentMenu = {
  menuAdicional: [
    {
      url: 'app/ejecucion',
      roles: [
        environment.roles.directorIIEE,
        environment.roles.monitor,
        environment.roles.especialistaDRE,
        environment.roles.especialistaUGEL
      ]
    },
    {
      url: 'app/ejecucion/entrenamiento',
      roles: [
        environment.roles.directorIIEE,
        environment.roles.monitor,
        environment.roles.especialistaDRE,
        environment.roles.especialistaUGEL,
        environment.roles.administrador
      ]
    }
  ],
  menu: [
    {
      type: 'link',
      label: 'Bienvenida',
      route: '/bienvenida',
      routePassport: 'home/index',
      icon: icHome
    },
    {
      type: 'subheading',
      label: 'CONFIGURACIÓN',
      children: [
        /*{
          type: 'link',
          label: 'Personal',
          route: '/app/configuracion/personal',
          icon: icPeople
        },*/
        {
          type: 'link',
          label: 'Componentes',
          route: '/app/configuracion/componentes',
          routePassport: 'Simepp/maestros/ComponenteBusqueda',
          icon: icApps
        },
        {
          type: 'link',
          label: 'Resultados',
          route: '/app/configuracion/resultados',
          routePassport: 'Simepp/maestros/ResultadoBusqueda',
          icon: icShowChart
        },
        {
          type: 'link',
          label: 'Indicadores',
          route: '/app/configuracion/indicadores',
          routePassport: 'Simepp/maestros/IndicadorBusqueda',
          icon: icWidgets
        },
        {
          type: 'link',
          label: 'Aspectos e ítems',
          route: '/app/configuracion/aspectos-items',
          routePassport: 'Simepp/maestros/AspectoBusqueda',
          icon: icListAlt
        }
      ]
    },
    {
      type: 'subheading',
      label: 'MÓDULO DE MONITOREO',
      children: [
        {
          type: 'dropdown',
          label: 'Planificación',
          icon: icTimeLine,
          children: [
            {
              type: 'link',
              label: 'Marcos lógicos',
              route: '/app/configuracion/planificacion/marco-logico',
              routePassport: 'Simepp/marcologico/MarcoLogicoBusqueda',
              icon: icCalendarDay,
              dontView: [
                environment.roles.especialistaUGEL,
                environment.roles.directorIIEE
              ]
            },
            {
              type: 'link',
              label: 'Planes de monitoreo',
              route: '/app/configuracion/planificacion/plan-monitoreo',
              routePassport: 'Simepp/planmonitoreo/PlanMonitoreoBusqueda',
              icon: icPlayListAddCheck,
              dontView: [
                environment.roles.especialistaUGEL,
                environment.roles.directorIIEE
              ]
            }
          ]
        },
        {
          type: 'dropdown',
          label: 'Monitoreo',
          icon: icPlayListAddCheck,
          children: [
            {
              type: 'link',
              label: 'Muestras',
              route: '/app/monitoreo/asignacion-muestra',
              routePassport: 'Simepp/ejecucion/AsignarMuestraBusqueda',
              icon: icPlayListAddCheck,
              badge: {
                value: 'NUEVO',
                background: theme.colors.green['500'],
                color: theme.textColor['primary-contrast']['500']
              }
            },
            {
              type: 'link',
              label: 'Programación',
              route: '/app/monitoreo/programacion',
              routePassport: 'Simepp/ejecucion/ProgramacionMonitoreo',
              icon: icCalendarDay
            },
            {
              type: 'link',
              label: 'Ejecución',
              route: '/app/monitoreo/ejecucion',
              routePassport: 'Simepp/ejecucion/PlanMonitoreoConsulta',
              icon: icPlayListAddCheck
            }
          ]
        }
      ]
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
