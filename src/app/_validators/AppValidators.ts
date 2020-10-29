import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export class AppValidators {
  static filmExists(formControl: FormControl) {
    const url = `/api/film?number=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((film) => film ? { filmExists: true } : null)
      );
  }
  static catalogExists(formControl: FormControl) {
    const url = `/api/catalog/profil?number=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((catalog) => catalog ? { catalogExists: true } : null)
      );
  }
  static systemExists(formControl: FormControl) {
    const url = `/api/catalog/system?name=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((system) => system ? { systemExists: true } : null)
      );
  }
  static producerExists(formControl: FormControl) {
    const url = `/api/film/producer?name=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((producer) => producer ? { producerExists: true } : null)
      );
  }

  static clientExists(formControl: FormControl) {
    const url = `/api/client?nip=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((client) => client ? { clientExists: true } : null)
      );
  }

  static myCompanyExists(formControl: FormControl) {
    const url = `/api/mycompany?nip=${formControl.value}`;
    return ajax.getJSON(url)
      .pipe(
        map((mycompany) => mycompany ? { mycompanyExists: true } : null)
      );
  }


  static validatenip(formControl: FormControl): ValidationErrors {
    if (formControl.value != null) {
      let nip = formControl.value;
      let nipWithoutDashes = nip.replace(/-/g, "");
      let reg = /^[0-9]{10}$/;
      return reg.test(nipWithoutDashes) ? null : { nipFormat: true };
    }
  }

  static validateregon9(formControl: FormControl): ValidationErrors {
    if (formControl.value != null) {
      let regon = formControl.value;
      if (regon == "") { return null }
      let reg = /^[0-9]{9}$/;
      return reg.test(regon) ? null : { regonFormat: true };
    }
  }

  static nomatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.nomatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ nomatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }
}