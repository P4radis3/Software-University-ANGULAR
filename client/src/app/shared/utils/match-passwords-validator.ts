import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordControl: string, rePasswordControl: string): ValidatorFn {
    return (control) => {
        const passFirstControl = control.get(passwordControl);
        const passSecondControl = control.get(rePasswordControl);
        const isMatching = passFirstControl?.value === passSecondControl?.value;
        return isMatching ? null : { matchPasswordsValidator: true };
    };
}