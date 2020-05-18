import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';


import { IngresoegresoService } from '../servicios/ingresoegreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;

  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoegresoService) { }

  ngOnInit(): void {


    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],

    });

    this.uiSubscription =  this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;

    });


  }

  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe();

  }

  guardar() {

    if (this.ingresoForm.invalid) { return;}

    this.store.dispatch(ui.isLoading());

    // console.log(this.ingresoForm.value);

    // console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).
      then( resp => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'success',
          title: 'Ingresos y Egresos',
          text: 'Inserción exitosa'
        });
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Ingresos y Egresos',
          text: err.message
        });
      });

  }

}
