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
import { RegisterService } from '../../services/register.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  isloading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  processRegistration() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.registerUser();
    }
  }
  registerUser() {
    this.isloading = true;
    this.registerService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        this.toastrService.success('User Registered Successfully!', 'Success');
        this.router.navigate(['user-interest']);
      },
      error: () => {
        this.toastrService.error(
          'Please fill out all required fields correctly.',
          'Invalid Form'
        );
        this.isloading = false;
      },
    });
  }
  navigateTo() {
    this.router.navigate(['login']);
  }
}
