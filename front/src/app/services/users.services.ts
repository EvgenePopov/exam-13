import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from '../../environments/environment';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {}

    registerUser(userData: RegisterUserData) {
        return this.http.post<User>(env.apiUrl + '/users', userData);
    }

    login(userData: LoginUserData) {
        return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
    }

    logout() {
        return this.http.delete(env.apiUrl + '/users/sessions');
    }
}
