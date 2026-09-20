import { Router } from '@angular/router';
import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.component.css',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  step: WritableSignal<number> = signal<number>(1);

  emailControl: WritableSignal<FormControl<string>> = signal(
    new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  );

  resetCodeControl: WritableSignal<FormControl<string>> = signal(
    new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  );

  newPasswordControl: WritableSignal<FormControl<string>> = signal(
  new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ],
  })
);

  submitEmail(e: SubmitEvent): void {
    e.preventDefault();

    if (this.emailControl().invalid) {
      this.emailControl().markAsTouched();
      return;
    }

    const data = {
      email: this.emailControl().value,
    };

    this.authService.forgetPassword(data).subscribe({
      next: (res) => {
        console.log(res);

        this.step.set(2);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  submitResetCode(e: SubmitEvent): void {
    e.preventDefault();

    if (this.resetCodeControl().invalid) {
      this.resetCodeControl().markAsTouched();
      return;
    }

    const data = {
      resetCode: this.resetCodeControl().value,
    };

    this.authService.verifyResetCode(data).subscribe({
      next: (res) => {
        console.log(res);

        this.step.set(3);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  submitNewPassword(e: SubmitEvent): void {
    e.preventDefault();

    if (this.newPasswordControl().invalid) {
      this.newPasswordControl().markAsTouched();
      return;
    }

    const data = {
      email: this.emailControl().value,
      newPassword: this.newPasswordControl().value,
    };

    this.authService.resetPassword(data).subscribe({
      next: (res) => {
        console.log(res);

        // navigate to login
        this.router.navigate(['/login'])
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}