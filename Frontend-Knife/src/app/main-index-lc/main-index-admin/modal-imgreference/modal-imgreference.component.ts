import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImgReference } from 'src/app/classes/imgreference';
import { Reference } from 'src/app/classes/reference';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-modal-imgreference',
  templateUrl: './modal-imgreference.component.html',
  styleUrls: ['./modal-imgreference.component.css']
})
export class ModalImgreferenceComponent implements OnInit {
  imgReference: ImgReference = new ImgReference();

  constructor(private _snackBar: MatSnackBar, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalImgreferenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.imgreference != null) {
      this.imgReference = Object.assign({}, this.data.imgreference);
    } 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    this.refService.saveImgReference(this.imgReference).subscribe(() => {
      if (this.data.imgreference != null) this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
      else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 });
      this.dialogRef.close('ok');
    });
  }
}
