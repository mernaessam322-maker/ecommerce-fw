import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  private fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService)
  private readonly router =  inject(Router)

  // Custom Validator
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (password !== rePassword) {
      return { passwordMismatch: true };
    }

    return null;
  };


  // Register Form
  registerForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],

      rePassword: [
        '',
        [
          Validators.required,
        ],
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ],
      ],
    },

    {
      validators: this.passwordMatchValidator,
    }
  );


  // Submit Form
 submitRegisterForm(): void {

  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.authService.signUp(this.registerForm.value).subscribe({
    next: (res) => {
   if(res.message === 'success'){
      this.router.navigate(['/login'])
   }
    },

    error: (err) => {
      console.log(err);
    }
  });

}
}
