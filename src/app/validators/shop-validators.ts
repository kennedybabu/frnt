import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

    // white space validation 
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {

        //check to see if string is only whitespace
        if((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhitespace' : true}
        } else {
            return null;
        }
    }
}
