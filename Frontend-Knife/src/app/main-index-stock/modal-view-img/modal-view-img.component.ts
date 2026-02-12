import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImgReference } from 'src/app/classes/imgreference';

@Component({
  selector: 'app-modal-view-img',
  templateUrl: './modal-view-img.component.html',
  styleUrls: ['./modal-view-img.component.css']
})
export class ModalViewImgComponent {
  imgurl!: ImgReference;

  constructor(private dialogRef: MatDialogRef<ModalViewImgComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.imgurl = this.data.urlimg;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
