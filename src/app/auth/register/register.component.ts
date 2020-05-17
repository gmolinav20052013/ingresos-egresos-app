import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group( {
      nombre:   [ '', Validators.required ],
      correo:   [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
      console.log('cargando subs registro');
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
      console.log(this.registroForm.value);

      if (this.registroForm.invalid) { return; }

      // Swal.fire({

      //   title: 'Espere por favor',
      //   allowOutsideClick: false,
      //   onBeforeOpen: () => {
      //     Swal.showLoading();
      //   }

      // });


      this.store.dispatch(ui.isLoading());


      const { nombre, correo, password } = this.registroForm.value;

      this.authService.crearUsuario(nombre, correo, password)
        .then( credenciales => {
         // console.log(credenciales);
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch( err => {
       //   console.error(err);
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Ingresos y Egresos',
            text: err.message
          });
        });

  }

}
