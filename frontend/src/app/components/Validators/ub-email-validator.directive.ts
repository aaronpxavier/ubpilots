import { AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
    selector: '[ubEmail][ngModel]', 
    providers: [
      {
        provide: NG_VALIDATORS, 
        useValue: ubEmailValidator, 
        multi: true 
      }
    ]
  })
  export class UBEmailValidator {
  }

export function ubEmailValidator(control: AbstractControl){
    let email = control.value;
    if(email && email.indexOf("@") != -1){
        let[_, domain] = email.split("@");
        if(domain!= "buffalo.edu"){
            return{
                emailDomain:{
                    parsedDomain: domain
                }
            }
        }
    }
    return null;
}