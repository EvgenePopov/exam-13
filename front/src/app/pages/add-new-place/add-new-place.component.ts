import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {addPlacesRequest} from "../../store/place.actions";
import {AddError} from "../../models/place.model";

@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.sass']
})
export class AddNewPlaceComponent {
  @ViewChild('form') form!: NgForm;
  addLoading: Observable< null | boolean>;
  addError: Observable< null | AddError >;

  constructor(
      private store: Store<AppState>,
  ) {
    this.addLoading = store.select(state => state.places.addLoading);
    this.addError = store.select(state => state.places.addError);
  }

  onSubmit() {
    this.store.dispatch(addPlacesRequest({place: this.form.value}));
  }
}
