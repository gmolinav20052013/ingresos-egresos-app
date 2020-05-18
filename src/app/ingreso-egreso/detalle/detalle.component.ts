import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoegresoService } from '../../servicios/ingresoegreso.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] =[];
  ingrEgresSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoegresoService ) { }

  ngOnInit(): void {

    this.ingrEgresSubs = this.store.select('ingresosEgresos')
        .subscribe( ({ items }) =>  this.ingresosEgresos = items  );

  }

  ngOnDestroy() {
    this.ingrEgresSubs.unsubscribe();
  }


  borrar(uid){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then( resp =>
          Swal.fire({
            icon: 'success',
            title: 'Ingresos y Egresos',
            text: 'Transacción Eliminada' })
        )
        .catch( err =>  Swal.fire({
                        icon: 'error',
                        title: 'Ingresos y Egresos',
                        text: err.message })
        );
  }

}
