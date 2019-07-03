import { AbstractControl } from '@angular/forms';

export function SpaceValidator(control: AbstractControl) {
    if(control != null){
        if (control.value.startsWith(' ') 
        || control.value.trim().length == 0
        || control.value.endsWith(' ') ) {
          return { valid: true };
        }
    }
  return null;
}