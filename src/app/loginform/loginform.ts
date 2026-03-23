import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  loginform!: FormGroup;
  collegedetails!: FormGroup;
  skills!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();

    this.loginform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      mobile: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      Upload: [''],
      gender: [''],
      Password: ['', Validators.required]
    });

    this.collegedetails = this.fb.group({
      collegename: ['', Validators.required],
      collegestate: ['', Validators.required],
      collegeId: ['', Validators.required],
      CGPA: ['', [Validators.required,Validators.min(0),Validators.max(10),Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    });

    this.skills = this.fb.group({
      pimaryskill: ['', Validators.required],
      secondryskill: [''],
      experience: ['', Validators.required],
      project: [''],
      certifications: [''],
      preferredrole: ['', Validators.required]
    });
  }

  nextstep() {
    if (this.currentstep === 1) {
      this.loginform.markAllAsTouched();
      // if (this.loginform.invalid) return;
    }
    if (this.currentstep === 2) {
      this.collegedetails.markAllAsTouched();
      // if (this.collegedetails.invalid) return;
    }
    if (this.currentstep < 3) {
      this.currentstep++;
    }
  }

  prevstep() {
    if (this.currentstep > 1) this.currentstep--;
  }

  goToStep(step: number) {
    if (step === 1) {
      this.currentstep = 1;
    }

    if (step === 2) {
      this.loginform.markAllAsTouched();
      this.currentstep = 2;
    }

    if (step === 3) {
      this.loginform.markAllAsTouched();
      this.collegedetails.markAllAsTouched();
      this.currentstep = 3;
    }
  }

  submit() {
    if (this.loginform.valid && this.collegedetails.valid && this.skills.valid) {
      const finalData = {
        user: this.loginform.value,
        college: this.collegedetails.value,
        skills: this.skills.value
      };

      let users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find((u: any) =>
        u.user.email === this.loginform.value.email &&
        u.user.Password === this.loginform.value.Password
      );

      if (existingUser) {
        this.isLoggedIn = true;
        alert("Login Successful");
      } else {
        users.push(finalData);
        localStorage.setItem('users', JSON.stringify(users));

        this.userService.register(finalData);
        this.isLoggedIn = true;

        alert("Registration Successful");
      }

      console.log("Final Data:", finalData);
    } else {
      alert("Please fill all details properly");
    }
  }

  reset() {
    this.loginform.reset();
    this.collegedetails.reset();
    this.skills.reset();
  }
}