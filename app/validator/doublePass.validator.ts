import { AbstractControl, FormGroup } from '@angular/forms';

export function ConfirmPassValidator(gr: FormGroup) {
  if (gr.controls != undefined){
      let pass = gr.controls["pass"].value;
      let confirmPass = gr.controls["confirmPass"].value;
        if (pass.localeCompare(confirmPass) != 0){
          return { confirm: true };
        }
    }
  return null;
}