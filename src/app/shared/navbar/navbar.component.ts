import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombreUsuario: string = '';
  navbarSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.navbarSub =  this.store.select('user')
   .pipe(
       filter( ({ user }) => user != null )
   )
   .subscribe( ({ user }) => this.nombreUsuario = user.nombre);

  }

  ngOnDestroy(): void {
   this.navbarSub.unsubscribe();
  }

}
