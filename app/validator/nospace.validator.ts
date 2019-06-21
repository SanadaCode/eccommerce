import { AbstractControl } from '@angular/forms';

export function NoSpaceValidator(control: AbstractControl) {
  if(control != null){
      let size = control.value.length;
        if (control.value.trim().length != size){
          return { valid: true };
        }
    }
  return null;
}