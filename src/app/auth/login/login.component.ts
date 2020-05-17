import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  loginUsuario(){
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) { return; }

    Swal.fire({

      title: 'Espere por favor',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }

    });


    const { correo, password } = this.loginForm.value;

    this.authService.autenticarUsuario(correo, password)
      .then( credenciales => {
       // console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
     //   console.error(err);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Ingresos y Egresos',
          text: err.message
        });
      });
  }

}
