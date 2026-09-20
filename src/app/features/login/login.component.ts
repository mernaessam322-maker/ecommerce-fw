import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private readonly authservice = inject(AuthService)
  private readonly router = inject(Router)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitLoginForm(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.authservice.signIn(this.loginForm.value).subscribe({
    next: (res) => {
      console.log(res);

      if (res.message === 'success') {
        localStorage.setItem('freshToken',res.token),
                localStorage.setItem('userData',JSON.stringify(res.user)),
             this.authservice.isLogged.set(true)
        this.router.navigate(['/']);
      }
    },

    error: (err) => {
      console.log(err);
    },
  });
}
}