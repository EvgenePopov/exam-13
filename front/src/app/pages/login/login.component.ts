import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {LoginError, LoginUserData} from "../../models/user.model";
import {loginRequest} from "../../store/users.actions";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;

  constructor(
      private store: Store<AppState>,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit() {

  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginRequest({userData}));
  }

  ngOnDestroy() {
  }

}
