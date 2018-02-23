import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-img-cropper',
  template: `<div>
                <img-cropper [image]="data" [settings]="cropperSettings"></img-cropper>
            </div>`,

  styleUrls: ['./img-cropper.component.css'],

})
export class ImgCropperComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  constructor() {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 417;
      this.cropperSettings.height = 315;
      this.cropperSettings.croppedWidth = 417;
      this.cropperSettings.croppedHeight = 315;
      this.cropperSettings.canvasWidth = 500;
      this.cropperSettings.canvasHeight = 378;
      this.data = {};
  }

  ngOnInit() {
  }

}
