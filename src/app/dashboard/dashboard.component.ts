import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IngresoegresoService } from '../servicios/ingresoegreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  subsUser: Subscription;
  subsIngresosEgresos: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoegresoService) { }

  ngOnInit(): void {

   this.subsUser = this.store.select('user')
        .pipe (
          filter( auth => auth.user != null )
        )
        .subscribe( ( {user} ) => {
 //  console.log(user);
          this.subsIngresosEgresos = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
            .subscribe( ingresosEgresosFB => {

             // console.log('******* dispatch ******');

              this.store
              .dispatch(ingresoEgresoActions.setItems( {items: ingresosEgresosFB }));

            //  console.log(ingresosEgresosFB);
            })
        });
  }

  ngOnDestroy(): void {
    this.subsIngresosEgresos.unsubscribe();
    this.subsUser.unsubscribe();
  }

}
