import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsersList() {
    return this.http.get('/api/v1/user');
  }

  newUser(user) {
    return this.http.post('/api/v1/user', user);
  }

  updateUser(user) {
    return this.http.put('/api/v1/user/' + user.id, user);
  }
}
