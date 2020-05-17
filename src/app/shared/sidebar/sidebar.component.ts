import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
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
