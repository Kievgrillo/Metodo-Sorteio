import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SorteioComponent } from './sorteio/sorteio.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';

const routes: Routes = [

  { path: 'menu', component: SorteioComponent },
  { path: 'cadastro', component: RegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full'},
  { path: '**', redirectTo: 'menu', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
