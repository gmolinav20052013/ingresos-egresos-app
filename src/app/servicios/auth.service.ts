import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';


import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;


  constructor(public auth: AngularFireAuth,
              private store: Store<AppState>,
              private firestore: AngularFirestore ) { }



  initAuthListener() {

    this.auth.authState.subscribe( fuser => {

      if(fuser) {
       this.userSubscription =  this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            console.log('@@@ firestore @@@');
            console.log(firestoreUser);
            const user = Usuario.fromFirebase( firestoreUser );
            this.store.dispatch(authActions.setUser( {user}));
          });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }



    //  console.log('initAuthListener()');
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);

    });

  }


  crearUsuario(nombre: string, email: string, password: string) {
  //  console.log(nombre, email, password);
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then ( fbUser  => {

              const newUser = new Usuario( fbUser.user.uid , nombre, email );

               return  this.firestore.doc(`${ fbUser.user.uid }/usuario`)
                      .set( {...newUser});
            });

  }

  autenticarUsuario(email: string, password: string) {
  //  console.log(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUsuario() {
    return this.auth.signOut();
  }

  IsAuth() {

    return this.auth.authState.pipe(
      map ( fbUser => fbUser != null)
    );

  }


}
