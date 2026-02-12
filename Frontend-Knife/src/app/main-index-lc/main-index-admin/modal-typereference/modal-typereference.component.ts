import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Birthday } from 'src/app/classes/birthday';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-modal-typereference',
  templateUrl: './modal-typereference.component.html',
  styleUrls: ['./modal-typereference.component.css']
})
export class ModalBirthdayComponent implements OnInit {
  birthday: Birthday = new Birthday();
  selectedFile!: File;

  constructor(private _snackBar: MatSnackBar, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalBirthdayComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.birthday.status = true;
    if (this.data.birthday != null) this.birthday = Object.assign({}, this.data.birthday);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    this.refService.saveBirthday(this.birthday).subscribe(() => {
      if (this.data.birthday != null) this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
      else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 });
      this.dialogRef.close('ok');
    });
  }

  onChange(e : any) {
    this.birthday.status = e.checked;
  }
}
