// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment } from './environment';
import { enableDebugTools } from '@angular/platform-browser';
import theme from '../@vex/utils/tailwindcss';

export const environmentBusinessRules = {
  typeRules: {
    marcoLogico: 'MARCO-LOGICO',
    planMonitoreo: 'PLAN-MONITOREO',
    asignacionMuestra: 'ASIGNACION-MUESTRA'
  },
  colorEstadosVisitaRelations: [
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.asignado,
      color: theme.colors.gray['100']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.programado,
      color: theme.colors.cyan['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.enEjecucion,
      color: theme.colors.gray['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.enProcesoCierre,
      color: theme.colors.amber['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.ejecutado,
      color: theme.colors.green['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.envioConError,
      color: theme.colors.amber['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.noEjecutado,
      color: theme.colors.red['500']
    },
    {
      estado: environment.enums.configuracion.tipoEstadoVisita.children.culminadoSinEjecucion,
      color: theme.colors.orange['500']
    }
  ],
  tipoSedesPassport: [ // un actor sólo puede estar en un tipo de sede - regla de SIMON
    {
      name: 'DRE',
      code: 1,
      actores: [
        environment.enums.configuracion.tipoActor.children.especialistaDRE
      ]
    },
    {
      name: 'UGEL',
      code: 2,
      actores: [
        environment.enums.configuracion.tipoActor.children.especialistaUGEL
      ]
    },
    {
      name: 'Local Escolar',
      code: 3,
      actores: [
      ]
    },
    {
      name: 'Institución Educativa',
      code: 4,
      actores: [
        environment.enums.configuracion.tipoActor.children.directorIE,
        environment.enums.configuracion.tipoActor.children.directorCETPRO,
        environment.enums.configuracion.tipoActor.children.docente
      ]
    },
    {
      name: 'Oficina',
      code: 5,
      actores: [
        environment.enums.configuracion.tipoActor.children.especialistaMINEDU
      ]
    },
    {
      name: 'Municipalidad',
      code: 6,
      actores: [
      ]
    },
    {
      name: 'Unidad Operativa',
      code: 7,
      actores: [
      ]
    }
  ],
  rolActorRelations: [// esta configuración contiene la asociación de los roles de passport con los actores del sistema
    {
      rol: environment.roles.especialistaMINEDU,
      actor: environment.enums.configuracion.tipoActor.children.especialistaMINEDU
    },
    {
      rol: environment.roles.especialistaDRE,
      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE
    },
    {
      rol: environment.roles.especialistaUGEL,
      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL
    },
    {
      rol: environment.roles.directorIIEE,
      actor: environment.enums.configuracion.tipoActor.children.directorIE
    }
  ],
  rules: {
    'MARCO-LOGICO': {
      roles: [
        {
          rol: environment.roles.administrador,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoMarcoLogico.children.nacional,
              withSede: false, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              takeValueSede: 'NOTHING'
            }
          ]
        },
        {
          rol: environment.roles.especialistaDRE,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoMarcoLogico.children.regional,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              all: false, // mostrar todas las regiones
              showRegional: true,
              takeValueSede: 'REGIONAL'
            }
          ]
        },
        {
          rol: environment.roles.especialistaUGEL,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoMarcoLogico.children.local,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              all: false, // mostrar todas las ugeles
              showRegional: false,
              showLocal: true,
              takeValueSede: 'LOCAL'
            }
          ]
        },
        {
          rol: environment.roles.directorIIEE,
          readOnly: false,
          types: [
            /*{
              type: environment.enums.configuracion.tipoMarcoLogico.children.iiee,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              all: false, // mostrar todas las IIEE
              showRegional: false,
              showLocal: false,
              showIIEE: true,
              takeValueSede: 'IIEE'
            }*/
          ]
        }
      ]
    },
    'PLAN-MONITOREO': {
      roles: [
        {
          rol: environment.roles.administrador,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoPlanMonitoreo.children.nacional,
              withSede: false, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              takeValueSede: 'NOTHING',
              stages: [
                {
                  stage: environment.enums.general.etapas.educacionBasica,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
                      samples: [ //muestras
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.directorIE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionSuperior,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
                      samples: [ //muestras
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR,
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionTecnicoProductiva,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
                      samples: [ //muestras
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO,
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          rol: environment.roles.especialistaDRE,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoPlanMonitoreo.children.regional,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              showRegional: true,
              showFindUgels: true,
              takeValueSede: 'REGIONAL',
              stages: [
                {
                  stage: environment.enums.general.etapas.educacionBasica,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.directorIE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionSuperior,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR,
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionTecnicoProductiva,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaDRE,
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO,
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          rol: environment.roles.especialistaUGEL,
          readOnly: false,
          types: [
            {
              type: environment.enums.configuracion.tipoPlanMonitoreo.children.local,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              showLocal: true,
              takeValueSede: 'LOCAL',
              stages: [
                {
                  stage: environment.enums.general.etapas.educacionBasica,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    },
                    {
                      actor: environment.enums.configuracion.tipoActor.children.directorIE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionSuperior,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorSUPERIOR,
                      ]
                    }
                  ]
                },
                {
                  stage: environment.enums.general.etapas.educacionTecnicoProductiva,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.especialistaUGEL,
                        environment.enums.configuracion.tipoActor.children.directorCETPRO,
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          rol: environment.roles.directorIIEE,
          readOnly: false,
          types: [
            /*{
              type: environment.enums.configuracion.tipoPlanMonitoreo.children.iiee,
              withSede: true, // es un tipo con sede
              canCreate: true, // puede crear de este tipo
              canEdit: true, // puede editar de este tipo
              showIIEE: true,
              takeValueSede: 'IIEE',
              stages: [
                {
                  stage: environment.enums.general.etapas.educacionBasica,
                  monitors: [
                    {
                      actor: environment.enums.configuracion.tipoActor.children.directorIE,
                      samples: [
                        environment.enums.configuracion.tipoActor.children.directorIE,
                        environment.enums.configuracion.tipoActor.children.docente
                      ]
                    }
                  ]
                }
              ]
            }*/
          ]
        }
      ]
    },
    'ASIGNACION-MUESTRA': {
      muestra: [
        {
          dataSource: '', // servicio personal
          muestra: environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
          configuracion: {
            withDres: false,
            withUgels: false,
            withIIEE: false
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.especialistaDRE,
          configuracion: {
            withDres: true,
            withUgels: false,
            withIIEE: false
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: false
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.directorIE,
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: true
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.docente,
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: true
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.directorCETPRO,
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: false
          }
        },
        {
          dataSource: '',
          muestra: environment.enums.configuracion.tipoActor.children.directorSUPERIOR,
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: false
          }
        }
      ],
      monitor: [
        {
          monitor: environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
          monitorsDiscovery: [
            environment.enums.configuracion.tipoActor.children.especialistaMINEDU,
            environment.enums.configuracion.tipoActor.children.especialistaDRE,
            environment.enums.configuracion.tipoActor.children.especialistaUGEL,
            environment.enums.configuracion.tipoActor.children.directorIE
          ],
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: true,
            disabledDres: false,
            disabledUgels: false,
            disabledIIEE: false
          }
        },
        {
          monitor: environment.enums.configuracion.tipoActor.children.especialistaDRE,
          monitorsDiscovery: [
            environment.enums.configuracion.tipoActor.children.especialistaDRE,
            environment.enums.configuracion.tipoActor.children.especialistaUGEL,
            environment.enums.configuracion.tipoActor.children.directorIE
          ],
          configuracion: {
            withDres: true,
            withUgels: true,
            withIIEE: true,
            disabledDres: true,
            disabledUgels: false,
            disabledIIEE: false
          }
        },
        {
          monitor: environment.enums.configuracion.tipoActor.children.especialistaUGEL,
          monitorsDiscovery: [
            environment.enums.configuracion.tipoActor.children.especialistaUGEL,
            environment.enums.configuracion.tipoActor.children.directorIE
          ],
          configuracion: {
            withDres: false,
            withUgels: true,
            withIIEE: true,
            disabledDres: true,
            disabledUgels: true,
            disabledIIEE: false
          }
        },
        {
          monitor: environment.enums.configuracion.tipoActor.children.directorIE,
          monitorsDiscovery: [
            environment.enums.configuracion.tipoActor.children.directorIE
          ],
          configuracion: {
            withDres: false,
            withUgels: false,
            withIIEE: true,
            disabledDres: true,
            disabledUgels: true,
            disabledIIEE: true
          }
        }
      ]
    },
    'GENERAL-MONITORES': [

    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
