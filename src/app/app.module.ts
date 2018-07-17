import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CalendarComponent} from './calendar/calendar.component';
import {UsersComponent} from './users/users.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainComponent} from './main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NewUserComponent} from './users/new-user/new-user.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {LoadingComponent} from './loading/loading.component';
import {AuthGuardService as AuthGuard} from './auth.guard.service';
import {JwtModule} from '@auth0/angular-jwt';
import {PlacesComponent} from './places/places.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'main',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'calendar', component: CalendarComponent, data: {title: 'Calendario'}},
      {path: 'users', component: UsersComponent, data: {title: 'Usuarios'}},
      {path: 'places', component: PlacesComponent, data: {title: 'Espacios'}},
    ],
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    UsersComponent,
    MainComponent,
    NewUserComponent,
    EditUserComponent,
    LoadingComponent,
    PlacesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('clickco_eventos_token');
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  entryComponents: [NewUserComponent, EditUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
