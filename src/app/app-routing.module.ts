import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './servicios/auth.guard';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () =>  import('./ingreso-egreso/ingreso-egreso.module')
                          .then(m => m.IngresoEgresoModule)
  },
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: dashboardRoutes,
  //   canActivate: [AuthGuard]
  // },
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
