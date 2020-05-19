import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
