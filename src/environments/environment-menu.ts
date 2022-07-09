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
  menu: [
    /* {
      type: 'link',
      label: 'Bienvenida',
      route: '/bienvenida',
      routePassport: 'home/index',
      icon: icHome
    }, */
    {
      type: 'subheading',
      label: 'Mi área de Trabajo',
      children: [
        {
          type: 'link',
          label: 'VIH',
          route: '/app/configuracion/componentes',
          routePassport: 'Simepp/maestros/ComponenteBusqueda',
          icon: icApps
        },
        {
          type: 'link',
          label: 'TMI',
          route: '/app/configuracion/componentes',
          routePassport: 'Simepp/maestros/ComponenteBusqueda',
          icon: icApps
        },
        {
          type: 'link',
          label: 'HEPATITIS',
          route: '/app/configuracion/componentes',
          routePassport: 'Simepp/maestros/ComponenteBusqueda',
          icon: icApps
        },
        {
          type: 'link',
          label: 'ITS',
          route: '/app/configuracion/componentes',
          routePassport: 'Simepp/maestros/ComponenteBusqueda',
          icon: icApps
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
