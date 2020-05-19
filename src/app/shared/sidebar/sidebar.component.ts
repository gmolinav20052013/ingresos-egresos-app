import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsuario: string = '';
  sidebarSub: Subscription;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.sidebarSub =  this.store.select('user')
   .pipe(
       filter( ({ user }) => user != null )
   )
   .subscribe( ({ user }) => this.nombreUsuario = user.nombre);

  }

  ngOnDestroy(): void {
   this.sidebarSub?.unsubscribe();
  }


  logout() {

    this.authService.logoutUsuario()
      .then( resp => {
        this.router.navigate(['/login']);
      })
      .catch( err => {
          Swal.fire({
          icon: 'error',
          title: 'Ingresos y Egresos',
          text: err.message
        });
      });

  }

}
