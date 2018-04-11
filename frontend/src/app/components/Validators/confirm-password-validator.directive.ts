import {Directive, Input, OnChanges, SimpleChanges} from "@angular/core";
import {
  AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator, ValidatorFn,
  Validators
} from "@angular/forms";
 
@Directive({
  selector: '[confirmPass]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPassword,
    multi: true
  }]
})
export class ConfirmPassword implements Validator, OnChanges {
  @Input() confirmPass: NgModel;
 
  private validationFunction = Validators.nullValidator;
 
  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['confirmPass'];
    if (change) {
      const otherFieldModel = change.currentValue;
      this.validationFunction = confPassValidator(otherFieldModel);
    } else {
      this.validationFunction = Validators.nullValidator;
    }
  }
 
  validate(control: AbstractControl): ValidationErrors | any {
    return this.validationFunction(control);
  }
}
 
export function confPassValidator(otherFieldModel: NgModel): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    return control.value === otherFieldModel.value ? null : {'confirmPass': {match: false}};
  };
}