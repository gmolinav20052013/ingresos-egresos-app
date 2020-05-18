import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';


import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });

    this.uiSubscription =  this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe();

  }


  loginUsuario(){
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({

    //   title: 'Espere por favor',
    //   allowOutsideClick: false,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }

    // });


    const { correo, password } = this.loginForm.value;

    this.authService.autenticarUsuario(correo, password)
      .then( credenciales => {
       // console.log(credenciales);
        //Swal.close();
        this.store.dispatch( ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( err => {
     //   console.error(err);
     //   Swal.close();
          this.store.dispatch( ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Ingresos y Egresos',
            text: err.message
          });
        });
  }

}
