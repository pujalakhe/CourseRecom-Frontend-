import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', Validators.required],
    });
  }
  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  async processRegistration() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.toastrService.success('User Registered Successfully!!');
      this.router.navigate(['home']);
    } else {
      this.toastrService.error('User Registration Failed!!');
    }
  }
  navigateTo() {
    this.router.navigate(['login']);
  }
}
