import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/classes/person';
import { Role } from 'src/app/classes/role';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  person: Person = new Person();
  roles!: Role[];
  role: Role = new Role;

  constructor(private _snackBar: MatSnackBar, private authService: AuthorizationService, private dialogRef: MatDialogRef<PersonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.person != null) {
      this.person = Object.assign({}, this.data.person);
      this.person.password = '';
      this.authService.getRoles().subscribe((data) => {
        this.roles = data;
        this.role = this.data.person.idRole;
      });
    } 
    else {
      this.authService.getRoles().subscribe((data) => {
        this.roles = data;
        this.role = data[0];
      });
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    this.person.idRole = this.role;
    this.authService.registration(this.person).subscribe(() => {
      if (this.data.person != null) this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
      else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 });
      this.dialogRef.close('ok');
    })
     
  }
}
