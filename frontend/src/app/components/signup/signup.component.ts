import { Component, OnInit } from '@angular/core';
import { SignupService } from "../../services/api-services/signup.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  showAlert = false;
  alertMessage = '';
  model = {
    firstname: "", 
    lastname: "",
    email: "",
    password: "",
    password2: "",
  }

  constructor(private signupService: SignupService,
              private router: Router) {}

  ngOnInit() {
  }

    buildJson(): any {
        let jsonEntry =
            {
                username: this.model.email,
                first: this.model.firstname,
                last: this.model.lastname,
                pass: this.model.password
            };
        return jsonEntry;
    }

    onSubmit() {
        this.showAlert = false;
        this.signupService.signUpUsers(this.buildJson())
            .subscribe(res => {
              if (res.success) {
                 this.router.navigateByUrl('login');
              } else {
                if(res.userAlreadyExists) {
                  this.alertMessage = 'user already exists';
                  this.showAlert = true;
                }
              }
            });
    }
}
