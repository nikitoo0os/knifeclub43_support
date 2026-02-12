import { Component } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from '../classes/person';
import { Router } from '@angular/router';
import { Role } from '../classes/role';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-authorization',
  templateUrl: './modal-authorization.component.html',
  styleUrls: ['./modal-authorization.component.css']
})
export class ModalAuthorizationComponent {
  person: Person = new Person();
  loginvalid = new FormControl('', [Validators.required]);
  
  errorMessageLogin = '';
  
  constructor(private _snackBar: MatSnackBar, private authService: AuthorizationService, private dialogRef: MatDialogRef<ModalAuthorizationComponent>, private router: Router) {}
  
  login(): void {
    this.updateErrorMessage();
    if (this.loginvalid.valid) {
      this.authService.login(this.person.login!, this.person.password!).subscribe((data) => {
        if (data != null) {
          if (data.isLogin) {
            localStorage.setItem('access_token', data.token);
            if (data.role == "Админ") this.authService.setUserRole(Roles.ADMIN)
            else this.authService.setUserRole(Roles.TRENER);
            this.router.navigate(['lc/reservation']);
          }
          this.dialogRef.close();
        }
        else { this._snackBar.open("Вход не выполнен! Проверьте правильность введенных данных", "Закрыть", { duration: 3000 }); }
      });
    }
  }

  updateErrorMessage() {
    if (this.loginvalid.hasError('required')) {
      this.errorMessageLogin = 'Введите логин';
    } else {
      this.errorMessageLogin = '';
    }
  }
}

enum Roles {
  GUEST,
  TRENER,
  ADMIN
}
