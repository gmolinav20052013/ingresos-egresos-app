import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule  } from '@angular/forms';

// # modules
import { AuthModule } from './auth/auth.module';
// import { SharedModule } from './shared/shared.module';
// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';


// import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
// import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
// import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
// import { FooterComponent } from './shared/footer/footer.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';






@NgModule({
  declarations: [
    AppComponent
    // LoginComponent,
    // RegisterComponent,
    // DashboardComponent,
    // IngresoEgresoComponent,
    // EstadisticaComponent,
    // DetalleComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent,
    // OrdenIngresoPipe
  ],
  imports: [
    BrowserModule,

    AuthModule,
    // SharedModule,
    // IngresoEgresoModule,

    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
