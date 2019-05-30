import {AbstractControl} from '@angular/forms';

export function validateBirthDay(control: AbstractControl) {
    const chosenDateMs = typeof control.value === "string" ? new Date(control.value).getTime() : control.value.getTime();
    
    if (Date.now() - chosenDateMs > 86400000) {
        return null;
    }
    // if it fails validBirthday is the error-name
    return {validBirthday: true};
}