import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReferenceService } from 'src/app/services/reference.service';
import { ModalBirthdayComponent } from './modal-typereference/modal-typereference.component';
import { ModalReferenceComponent } from './modal-reference/modal-reference.component';
import { RestroomService } from 'src/app/services/restroom.service';
import { ModalRestroomComponent } from './modal-restroom/modal-restroom.component';
import { PersonComponent } from './person/person.component';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restroom } from 'src/app/classes/restroom';
import { Person } from 'src/app/classes/person';
import { Reference } from 'src/app/classes/reference';
import { MatSort } from '@angular/material/sort';
import { ImgReference } from 'src/app/classes/imgreference';
import { ModalImgreferenceComponent } from './modal-imgreference/modal-imgreference.component';
import { animationDuration } from 'src/app/classes/globals';
import { Birthday } from 'src/app/classes/birthday';
import { Router } from '@angular/router';
import { TopBron } from 'src/app/classes/topbron';

@Component({
  selector: 'app-main-index-admin',
  templateUrl: './main-index-admin.component.html',
  styleUrls: ['./main-index-admin.component.css']
})
export class MainIndexAdminComponent {
  displayedColumnsBirthdays: string[] = ['name', 'description_price', 'description_reference', 'action'];
  displayedColumnsReferences: string[] = ['name', 'price', 'action'];
  displayedColumnsRestrooms: string[] = ['name', 'action'];
  displayedColumnsPersons: string[] = ['login', 'role', 'action'];
  displayedColumnsImgReference: string[] = ['name', 'action'];

  birthdays: Birthday[] = [];
  references: Reference[] = [];
  persons: Person[] = [];
  topbron: TopBron[] = [];
  dataSourceBirthdays = new MatTableDataSource();
  dataSourceReferences = new MatTableDataSource();
  dataSourceRestrooms = new MatTableDataSource();
  dataSourcePersons = new MatTableDataSource();
  dataSourceImgReference = new MatTableDataSource();

  constructor(private router: Router, private _snackBar: MatSnackBar, private authServ: AuthorizationService, private restServ: RestroomService, private refServ: ReferenceService, public dialog: MatDialog){}
  @ViewChild('table_birthdays', {read: MatSort, static: true}) sortbirthday!: MatSort;
  @ViewChild('table_references', {read: MatSort, static: true}) sortreferences!: MatSort;
  @ViewChild('table_restrooms', {read: MatSort, static: true}) sortrestrooms!: MatSort;
  @ViewChild('table_persons', {read: MatSort, static: true}) sortpersons!: MatSort;

  ngOnInit(): void {
    if (this.authServ.getAuthorizationAdmin()){
      this.refServ.getTopReferences().subscribe((data) => {
        this.topbron = data;
      })
      this.reloadBirthday();
      this.reloadReferences();
      this.reloadImg();
      this.reloadPersons();
      this.reloadRestRooms();
    }
    else this.router.navigate(['lc/reservation']);
  }

  openDialogBirthday(element: Birthday | null): void {
    this.dialog.open(ModalBirthdayComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        birthday: element
      }
    }).afterClosed().subscribe((data) => {
      if (data == 'ok') this.reloadBirthday();
    });
  }

  openDialogReference(element: Reference | null): void {
    this.dialog.open(ModalReferenceComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        reference: element
      }
    }).afterClosed().subscribe((data) => {
      if (data == 'ok') this.reloadReferences();
    });
  }

  openDialogRestroom(element: Restroom | null): void {
    this.dialog.open(ModalRestroomComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        restroom: element
      }
    }).afterClosed().subscribe((data) => {
      if (data == 'ok') this.reloadRestRooms();
    });
  }

  openDialogPerson(element: Person | null): void {
    this.dialog.open(PersonComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        person: element
      }
    }).afterClosed().subscribe((data) => {
      if (data == 'ok') this.reloadPersons();
    });
  }

  openDialogImgReference(element: ImgReference | null): void {
    this.dialog.open(ModalImgreferenceComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        imgreference: element
      }
    }).afterClosed().subscribe((data) => {
      if (data == 'ok') this.reloadImg();
    });
  }

  delBirthday(element: Birthday): void {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.refServ.delBirthday(element).subscribe((data) => {
        if (data) {
          this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 });
          this.reloadBirthday();
        } 
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      });
    }
  }

  delRestroom(element: Restroom): void {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.restServ.delRestroom(element).subscribe((data) => {
        if (data) { 
          this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 });
          this.reloadRestRooms();
        }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      });
    }
  }

  delPerson(element: Person): void {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.authServ.delPerson(element).subscribe((data) => {
        if (data) {
          this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 });
          this.reloadPersons();
        }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      });
    }
  }

  delReference(element: Reference): void {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.refServ.delReference(element).subscribe((data) => {
        if (data) { 
          this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 });
          this.reloadReferences();
        }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      });
    }
  }

  delImgReference(element: ImgReference): void {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.refServ.delImgReference(element).subscribe((data) => {
        if (data) {
          this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 });
          this.reloadImg();
        }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      });
    }
  }

  reloadBirthday(): void {
    this.refServ.getAllBirthdays().subscribe((data) => {
      this.birthdays = data;
      this.dataSourceBirthdays.data = this.birthdays;
      this.dataSourceBirthdays.sort = this.sortbirthday;
    });
  }

  reloadReferences(): void {
    this.refServ.getAllReferences().subscribe((data) => {
      this.references = data;
      this.dataSourceReferences.data = this.references;
      this.dataSourceReferences.sort = this.sortreferences;
    });
  }

  reloadRestRooms(): void {
    this.restServ.getAllRestrooms().subscribe((data) => {
      this.dataSourceRestrooms.data = data;
      this.dataSourceRestrooms.sort = this.sortrestrooms;
    });
  }

  reloadPersons(): void {
    this.authServ.getPersons().subscribe((data) => {
      this.persons = data;
      this.dataSourcePersons.data = this.persons;
      this.dataSourcePersons.sort = this.sortpersons;
    });
  }

  reloadImg(): void {
    this.refServ.getAllImage().subscribe((data) => {
      this.dataSourceImgReference.data = data;
    })
  }
}
