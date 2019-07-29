import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("template", {static: false}) modal: TemplateRef<any>;

  // properties
  insertForm: FormGroup;
  username: FormControl;
  password: FormControl;
  cpassword: FormControl;
  email: FormControl;
  modalRef: BsModalRef;
  errorList: string[];


  constructor(
    private fb: FormBuilder,
    private account: AccountService,
    private router: Router,
    private modelService: BsModalService
  ) { }
  

  ngOnInit() {
    this.username = new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.password = new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(6)]);
    this.cpassword = new FormControl("", [Validators.required, this.MustMatch(this.password)]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.errorList = [];
    this.insertForm = this.fb.group({
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "cpassword": this.cpassword
    });
  }

  onSubmit() {
    let userRegister = this.insertForm.value;
    console.log(userRegister);
    this.account.register(userRegister.username, userRegister.password, userRegister.email).subscribe(
      result => {
        this.router.navigate(['/login']);
        // console.log(result);
      },
      error => {
        console.log("errors list");
        console.log(error);
      }
    );
    // this.modelService.show(this.modal);
  }

  // Custom Validator
  MustMatch(passwordControl : AbstractControl) : ValidatorFn
    {
        return (cpasswordControl : AbstractControl) : {[key: string] : boolean } | null   => 
        {
            // return null if controls haven't initialised yet
            if(!passwordControl && !cpasswordControl) 
            {
                return null;
          }

            // return null if another validator has already found an error on the matchingControl
            if (cpasswordControl.hasError && !passwordControl.hasError) 
            {
                return null;
            } 
            // set error on matchingControl if validation fails
            if(passwordControl.value !== cpasswordControl.value) 
            {
                return { 'mustMatch': true };
            }
            else {
                return null;
            }

        }
        

    }

}
