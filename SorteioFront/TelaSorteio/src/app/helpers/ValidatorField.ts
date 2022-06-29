import { AbstractControl, Validators, FormGroup } from '@angular/forms';

export class ValidatorField {
  static MustMatch(controlName: string, matchingControlName: string): any {
    return (group: AbstractControl) => {
      const FormGroup = group as FormGroup;
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];

      if(control.value != matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
        return null;
    };
  }
}
