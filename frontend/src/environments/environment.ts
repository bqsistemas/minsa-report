// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  encrypt: true,
  codeJwt: '_jbq|minsa|__',
  codeTokenRolSede: '_jbq|minsa|rs',
  appName: 'pe.gob.minsa.vih',
  module: 'EVIH0',
  role: '121',
  apis: {
    backend: 'https://localhost:5001/api',
    apiLogin: 'http://devlogin.minsa.gob.pe/auth/login/',
    apiSecurity: 'http://devlogin.minsa.gob.pe/api/v1'
  },
  enums: {}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
