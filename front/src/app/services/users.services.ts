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
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('name', userData.name);
        formData.append('password', userData.password);

        return this.http.post<User>(env.apiUrl + '/users', formData);
    }

    login(userData: LoginUserData) {
        return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
    }

    logout() {
        return this.http.delete(env.apiUrl + '/users/sessions');
    }
}
