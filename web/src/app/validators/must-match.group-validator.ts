import { FormGroup } from '@angular/forms';

/**
 * Check if two controls match
 */
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!control || !matchingControl) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        ...matchingControl.errors,
        mustMatch: true
      });
    } else {
      const currentErrors = matchingControl.errors;
      delete (currentErrors || {}).mustMatch;
      matchingControl.setErrors(currentErrors);
    }
  };
}
