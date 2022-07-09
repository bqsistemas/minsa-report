// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import icLayers from '@iconify/icons-ic/twotone-layers';
import icHome from '@iconify/icons-ic/twotone-home';
import icApps from '@iconify/icons-ic/twotone-apps';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
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
          route: '/app/workspace/vih',
          icon: icAssessment
        },
        {
          type: 'link',
          label: 'TMI',
          route: '/app/workspace/tmi',
          icon: icAssessment
        },
        {
          type: 'link',
          label: 'HEPATITIS',
          route: '/app/workspace/hepatitis',
          icon: icAssessment
        },
        {
          type: 'link',
          label: 'ITS',
          route: '/app/workspace/its',
          icon: icAssessment
        },
        {
          type: 'link',
          label: 'Dato manual',
          route: '/app/workspace/manual',
          icon: icAssessment
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
