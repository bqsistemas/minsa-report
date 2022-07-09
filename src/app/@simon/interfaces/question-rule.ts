import { Rule } from './rule';

export interface QuestionRule {
    required: boolean;
    itsDependent: boolean;
    rules: Rule[];
}