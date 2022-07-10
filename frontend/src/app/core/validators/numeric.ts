import { AbstractControl } from '@angular/forms';

export function Numeric(control: AbstractControl) {
    let number = /^[.\d]+$/.test(control.value) ? +control.value : NaN;
    if (number !== number) {
        return { 'value': true };
    }

    return null;
}