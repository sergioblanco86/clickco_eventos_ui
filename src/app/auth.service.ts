import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {
  }

  login(data) {
    return this.http.post('/api/v1/user/login', data)
      .pipe(
        map(res => this.setSession(res))
      );
  }

  private setSession(authResult) {
    localStorage.setItem('clickco_eventos_token', authResult.token);
    return authResult;
  }

  getUser() {
    const token = localStorage.getItem('clickco_eventos_token');
    return this.jwtHelper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem('clickco_eventos_token');
    this.router.navigate(['login']);
  }

  public isLoggedIn() {
    const token = localStorage.getItem('clickco_eventos_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
