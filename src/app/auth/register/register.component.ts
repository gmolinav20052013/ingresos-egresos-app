import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group( {
      nombre:   [ '', Validators.required ],
      correo:   [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required]
    });

  }

  crearUsuario() {
      console.log(this.registroForm.value);

      if (this.registroForm.invalid) { return; }

      Swal.fire({

        title: 'Espere por favor',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }

      });



      const { nombre, correo, password } = this.registroForm.value;

      this.authService.crearUsuario(nombre, correo, password)
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
