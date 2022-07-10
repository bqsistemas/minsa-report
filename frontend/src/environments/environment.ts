// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  encrypt: true,
  simon: 'http://localhost:35510/', // 'https://simon.minedu.gob.pe/',
  codeJwt: '_jbq|simon|minedu',
  codeTokenRolSede: '_jbq|simon|rs',
  apiKey: 'mFHxgPWCGNAPhifYXl3MEuVR3VkKTqvp',
  apis: {
    configuracion: 'http://10.200.8.160:8000/simon-configuracion/api',
    ejecucion: 'http://10.200.8.160:8000/simon-ejecucion/api',
    auxiliar: 'http://10.200.8.160:8000/simon-auxiliar/api/auxiliar',
    seguridad: 'http://10.200.8.160:8000/simon-security/api/simon/seguridad',
    personal: 'http://10.200.8.160:8000/simon-personal/api',
    archivos: 'http://10.200.8.160:8000/simon-files/api'
  },
  roles: {
    administrador: 'GAS001_001',
    especialistaDRE: 'GG001_02',
    especialistaUGEL: 'GG001_08',
    especialistaMINEDU: 'GG001_04',
    monitor: 'GG001_64',
    directorIIEE: 'GG001_22'
  },
  enums: {
    general: {
      etapas: {
        list: [
          {
            id: 1,
            nombre: 'Educación Básica'
          },
          {
            id: 2,
            nombre: 'Educación Superior'
          },
          {
            id: 3,
            nombre: 'Educación Técnica Productiva'
          }
        ],
        educacionBasica: {
          id: 1,
          nombre: 'Educación básica'
        },
        educacionSuperior: {
          id: 2,
          nombre: 'Educación Superior'
        },
        educacionTecnicoProductiva: {
          id: 3,
          nombre: 'Educación Técnica Productiva'
        }
      }
    },
    configuracion: {
      tipoIndicador: {
        tipo: 'TIPO_INDICADOR',
        children: {

        }
      },
      tipoMarcoLogico: {
        tipo: 'TIPO_MARCO_LOGICO',
        children: {
          nacional: '5ee951aaba487777c2cd2d1c',
          regional: '5ee951bdba487777c2cd2d1d',
          local: '5ee951caba487777c2cd2d1e',
          iiee: '5ee951d8ba487777c2cd2d1f'
        }
      },
      tipoPlanMonitoreo: {
        tipo: 'TIPO_PLAN_MONITOREO',
        children: {
          nacional: '5efe2e9ba4061270f0d55e4a',
          regional: '5efe2e9ba4061270f0d55e4b',
          local: '5efe2e9ba4061270f0d55e4c',
          iiee: '5efe2e9ba4061270f0d55e4d'
        }
      },
      tipoActor: {
        tipo: 'TIPO_ACTOR',
        children: {
          especialistaMINEDU: '5efe3093322fdc5bd073285e',
          especialistaDRE: '5efe309f322fdc5bd073285f',
          especialistaUGEL: '5efe30a9322fdc5bd0732860',
          directorIE: '5efe30c1322fdc5bd0732861',
          docente: '5efe30d9322fdc5bd0732862',
          directorCETPRO: '5efe3163322fdc5bd0732863',
          directorSUPERIOR: '5efe3173322fdc5bd0732864'
        }
      },
      tipoInstrumento: {
        tipo: 'TIPO_INSTRUMENTO',
        children: {
          fichaObservacion: '5f07609b8a654d8f4112ad10',
          encuesta: '5f0760a78a654d8f4112ad11',
          listaCotejo: '5f0760be8a654d8f4112ad12'
        }
      },
      tipoEstadoVisita: {
        tipo: 'TIPO_ESTADO_VISITA',
        children: {
          asignado: '5f44626229155ede050b6626',
          programado: '5f44628629155ede050b6627',
          enEjecucion: '5f44629429155ede050b6628',
          enProcesoCierre: '5f44632129155ede050b6629',
          ejecutado: '5f44635329155ede050b662a',
          envioConError: '5f44636629155ede050b662b',
          noEjecutado: '5f44637a29155ede050b662c',
          culminadoSinEjecucion: '5f482b0e623976b26a35e8a6'
        }
      },
      tipoVisita: {
        tipo: 'TIPO_VISITA',
        children: {
          presencial: '5f46acafd44f69c9bb381a89',
          virtual: '5f46acd0d44f69c9bb381a8a',
          telefonico: '5f46ad0fd44f69c9bb381a8b',
        }
      }
    }
  },
  typesQuestion: {
    multipleOpcion: 'TYPE_01',
    casillaVerificacion: 'TYPE_02',
    rankinkEstrella: 'TYPE_03',
    cargaArchivos: 'TYPE_04',
    cuadroTextoSimple: 'TYPE_05',
    cuadroComentario: 'TYPE_06',
    Cantidad: 'TYPE_07',
    FechaHora: 'TYPE_08',
  },
  typesQuestionForRule: [
    {
      code: 'TYPE_01'
    },
    {
      code: 'TYPE_02'
    },
    {
      code: 'TYPE_03'
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
