import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../userservices/user';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './loginform.html',
  styleUrls: ['./loginform.css'],
})
export class Loginform implements OnInit {

  currentstep = 1;
  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  loginform = new FormGroup({
    firstname: new FormControl('fardeen', Validators.required),
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
    Password: new FormControl('', Validators.required)
  });

  collegedetails = new FormGroup({
    collegename: new FormControl('', Validators.required),
    collegestate: new FormControl('', Validators.required),
    collegeId: new FormControl('', Validators.required),
    CGPA: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
      Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)
    ])
  });

  skills = new FormGroup({
    pimaryskill: new FormControl('', Validators.required),
    secondryskill: new FormControl(''),
    experience: new FormControl('', Validators.required),
    project: new FormControl(''),
    certifications: new FormControl(''),
    preferredrole: new FormControl('', Validators.required)
  });
  nextstep() {

  if (this.currentstep === 1) {
    this.loginform.markAllAsTouched(); 
    if (this.loginform.invalid) return;
  }
  if (this.currentstep === 2) {
    this.collegedetails.markAllAsTouched();  
    if (this.collegedetails.invalid) return;
  }
  if (this.currentstep < 3) {
    this.currentstep++;
  }
}

  prevstep() {
    if (this.currentstep > 1) this.currentstep--;
  }
  submit() {
    if (this.loginform.valid && this.collegedetails.valid && this.skills.valid) {

      const finalData = {
        user: this.loginform.value,
        college: this.collegedetails.value,
        skills: this.skills.value
      };

      console.log("Final Data:", finalData);
      this.userService.register(finalData);
      this.isLoggedIn = true;
      alert("Registration & Login Successful");
    } else {
      alert("Please fill all details properly");
    }
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
    this.currentstep = 1;
  }

  reset() {
    this.loginform.reset();
    this.collegedetails.reset();
    this.skills.reset();
  }
}