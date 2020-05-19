import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
//import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  estadisticaSub: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos','Egresos'];
  public doughnutChartData: MultiDataSet = [];

  public doughnutChartType: ChartType = 'doughnut';


  constructor(private store: Store<AppStateWithIngreso>) { }

  ngOnInit(): void {

    this.estadisticaSub = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.generarEstadistica(items) );
    }

    ngOnDestroy() {
      this.estadisticaSub?.unsubscribe();
    }


  generarEstadistica(items: IngresoEgreso[]) {
  //  console.log(items);

     this.ingresos = 0;
     this.egresos = 0;
     this.totalIngresos = 0;
     this.totalEgresos = 0;

     for ( const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

   // var data: Array<number> = [this.totalIngresos, this.totalEgresos];

     this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];


  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
