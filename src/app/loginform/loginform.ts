import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './loginform.html',
  styleUrls: ['./loginform.css'],
})
export class Loginform {

  loginform = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^\d+$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Upload: new FormControl(''),
    gender: new FormControl(''),
    Password: new FormControl('', [Validators.required])
  });

  isRegisterMode = true;
 
 
  submit() {
    if (this.loginform.valid) {

      const data = this.loginform.value;

      if (this.isRegisterMode) {

        localStorage.setItem('user', JSON.stringify(data));
        alert("Registration Successful");
        this.isRegisterMode = false;

      } else {

        const stored = localStorage.getItem('user');

        if (!stored) {
          alert("No user found");
          return;
        }

        const user = JSON.parse(stored);

        if (
          user.email === data.email &&
          user.Password === data.Password
        ) {
          alert("Login Successfully");
        } else {
          alert("Register Successfully")
          console.log(this.loginform.value);
        }
      }
    }
  }

  reset() {
    this.loginform.setValue({
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      Upload: '',
      gender: '',
      Password: ''
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  get firstname() {
    return this.loginform.get('firstname');
  }
  get lastname() {
    return this.loginform.get('lastname');
  }
  get mobile() {
    return this.loginform.get('mobile');
  }
  get email() {
    return this.loginform.get('email');
  }
  get upload() {
    return this.loginform.get('Upload');
  }
  get gender() {
    return this.loginform.get('gender');
  }
  get Password() {
    return this.loginform.get('Password');
  }
}