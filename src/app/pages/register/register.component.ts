import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../../shared/components/password-field/password-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordField,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form: FormGroup;
  isloading = false;

  constructor(
    private formBuilder: FormBuilder, 
    private user: User,
    private router: Router
  
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get fullNameErros(): string | null {
    const fullNamecontrol = this.form.get('nome');
    if (fullNamecontrol?.hasError('required')) return 'O nome completo é um campo obrigatório';
    if (fullNamecontrol?.hasError('minlength')) return 'Cadastre um nome com mais de 3 letras';
    return null;
  }
  get emailErros(): string | null {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('required')) return 'O cadastro do email é obrigatório';
    if (emailControl?.hasError('email')) return 'Este e-mail é inválido';
    return null;
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formData = this.form.value;

    this.isloading = true;

    this.user.register(formData)
    .pipe(finalize(() => this.isloading = false))
    .subscribe({
      next: (response) => {
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.error(`Erro ao registrar usuário`, error)    
      }
    })
  }
}
