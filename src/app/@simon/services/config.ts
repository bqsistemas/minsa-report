import { QuestionConfig } from "../interfaces/question-config";
import { Configuration } from '../interfaces/configuration';
import { Resolve } from '../interfaces/resolve';
import { FormatOtherOption } from '../interfaces/format-other-option';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import icFormatListBulleted from '@iconify/icons-ic/twotone-format-list-bulleted';
import icCheckBox from '@iconify/icons-ic/twotone-check-box';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icCloudUpload from '@iconify/icons-ic/twotone-cloud-upload';
import icShortText from '@iconify/icons-ic/twotone-short-text';
import icWrapText from '@iconify/icons-ic/twotone-wrap-text';
import icLooksOne from '@iconify/icons-ic/twotone-looks-one';
import icToday from '@iconify/icons-ic/twotone-today';

const defaultConfig: QuestionConfig = { // Opción múltiple
    type: 'TYPE_01',
    name: 'Opción múltiple',
    icon: icFormatListBulleted,
    configuration: {
        multipleAswers: false,
        multipleOptions: true,
        instructions: true,
        typeOption: 'TEXT',
        skipQuestion: true,
        otherOption: true,
        score: true,
        textArea: false,
        intervalScore: false
    },
    resolve: {
        order: 0,
        title: '',
        options: [],
        withInstructions: false,
        instructions: '',
        withMultipleAnswers: false,
        withMultipleOptions: true,
        typeOption: 'TEXT',
        withSkipQuestion: true,
        withOtherOption: false,
        isTextArea: false,
        withOnlyDate: false,
        formatOtherOption: 'TEXT',
        intervalScore: [],
        withScore: true,
    },
    answer: {
        apply: true,
        result: [
            {
                title: '',
                value: '',
                score: 0,
                order: 1,
                isCorrect: false,
                isOther: false,
                scoreMin: '0',
                scoreMax: '0'
            }
        ],
    }
};

export const configs: QuestionConfig[] = [
    defaultConfig,
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_02',
        name: 'Casillas de verificación',
        icon: icCheckBox,
        configuration: {
            multipleAswers: true
        },
        resolve: {
            multipleAswers: true
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_03',
        name: 'Ranking de estrellas',
        icon: icStarBorder,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_04',
        name: 'Carga de archivos',
        icon: icCloudUpload,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false,
            instructions: true,
            score: false
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false,
            withInstructions: false,
            withScore: false,
            instructions: ''
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_05',
        name: 'Cuadro de texto simple',
        icon: icShortText,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false,
            score: false
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false,
            withInstructions: false,
            withScore: true
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_06',
        name: 'Cuadro de comentario',
        icon: icWrapText,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false,
            textArea: true,
            score: false
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false,
            withInstructions: false,
            isTextArea: true,
            withScore: true
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_07',
        name: 'Cantidad',
        icon: icLooksOne,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false,
            textArea: false,
            typeOption: 'NUMBER',
            intervalScore: true
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false,
            withInstructions: false,
            isTextArea: false,
            typeOption: 'NUMBER',
            intervalScore: []
        }
    }),
    mergeDeep({ ...defaultConfig }, {
        type: 'TYPE_08',
        name: 'Fecha',
        icon: icToday,
        configuration: {
            multipleAswers: false,
            multipleOptions: false,
            otherOption: false,
            typeOption: 'DATE',
            textArea: false,
            intervalScore: true
        },
        resolve: {
            withMultipleOptions: false,
            withOtherOption: false,
            withInstructions: false,
            typeOption: 'DATE',
            isTextArea: false,
            intervalScore: []
        }
    })
];