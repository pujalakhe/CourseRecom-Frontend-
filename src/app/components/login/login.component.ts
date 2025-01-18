import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HttpErrorService } from '../../services/http-error.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoginFormValid: boolean = false;
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private httpErrorService: HttpErrorService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  async processLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authUser();
    } else {
      this.toastrService.error('User Login Failed!!', 'Invalid User');
      this.router.navigate(['/login']);
    }
  }
  authUser() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastrService.success('User Login Successful!!', 'Valid User');
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.toastrService.error(this.httpErrorService.getErrorMessage(err));
        this.router.navigate(['/login']);
      },
    });
  }
  navigateTo() {
    this.router.navigate(['register']);
  }
}
