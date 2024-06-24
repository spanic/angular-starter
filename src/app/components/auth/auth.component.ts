import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationHelperSevice } from 'src/app/services/navigation-helper.service';
import ACCESS_TOKEN_STORAGE_KEY from 'src/app/shared/authorization.token';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authForm = new FormGroup({
    accessToken: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(ACCESS_TOKEN_STORAGE_KEY)
    private readonly accessTokenStorageKey: string,
    private readonly navigationHistory: NavigationHelperSevice,
    private readonly snackBar: MatSnackBar
  ) {}

  get accessToken() {
    return this.authForm.controls.accessToken;
  }

  onSubmit() {
    window.localStorage.setItem(
      this.accessTokenStorageKey,
      this.authForm.value.accessToken.trim()
    );
    this.snackBar.dismiss();
    this.navigationHistory.back();
  }
}
