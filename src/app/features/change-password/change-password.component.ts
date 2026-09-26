import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };

  changePasswordForm!: FormGroup;
  isLoading = false;

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  submitForm(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      password: this.changePasswordForm.value.newPassword,
      passwordConfirm: this.changePasswordForm.value.confirmPassword,
    };

    this.authService.changePassword(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.message === 'success') {
          this.toastr.success('Password changed successfully');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Failed to change password');
      },
    });
  }
}
