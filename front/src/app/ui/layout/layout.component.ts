import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {logoutUserRequest} from "../../store/users.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  changeOnMenuReg = false;
  breakpoint: number = 768;
  user: Observable<null | User>;
  api = environment.apiUrl;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private store: Store<AppState>,
      private router: Router,
      ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.changeOnMenuReg = this.breakpoint >= window.innerWidth;
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }

  onResize(event: any) {
    this.changeOnMenuReg = this.breakpoint >= event.target.innerWidth;
  }

  addNew() {
    void this.router.navigate(['/add-new-place']);
  }
}
