import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyeventsComponent } from './myevents/myevents.component';
import { EventadminComponent } from './eventadmin/eventadmin.component';
import { EventcreateComponent } from './eventcreate/eventcreate.component';
import { ViewattendeesComponent } from './viewattendees/viewattendees.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myevents', component: MyeventsComponent },
  { path: 'manage', component: EventadminComponent },
  { path: 'newevent', component: EventcreateComponent },
  { path: 'attendees/:id', component: ViewattendeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
