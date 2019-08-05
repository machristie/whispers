import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  submitLoading = false;

  constructor(
    public authenticationService: AuthenticationService,
    public passwordResetDialogRef: MatDialogRef<PasswordResetComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  getErrorMessage(formControlName) {

  }

  onSubmit(formValue: any) {
    this.submitLoading = true;
    if (sessionStorage.getItem('username')) {
      this.authenticationService.logout();
    }

    this.authenticationService.login(formValue.username, formValue.password)
      .subscribe(
        (user: any) => {
          this.submitLoading = false;
          this.passwordResetDialogRef.close();
          this.openSnackBar('Password reset email successfully sent', 'OK', 5000);
          location.reload();
        },
        (error) => {
          this.submitLoading = false;
          this.openSnackBar('Error. Failed to send password reset email. Error message: ' + error, 'OK', 8000);
        }
      );
  }
}
