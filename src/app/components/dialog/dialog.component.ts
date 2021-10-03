import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParamsEnginesConst } from '../wrapper/params.engines.const';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public colors: Array<string>;
  public images: Array<string>;
  public engines: Array<Object>;
  public color: string = 'primary';
  
  public close(): void {
    this.dialogRef
      .close(this.data);
  }

  public setColor(color): void {
    const color_white = '#ffffff',
      color_black = '#8A8A8A';

    this.data.bgImage = null;
      this.data.bgColor = color;
        this.data.color = color === color_white ? color_black : color_white;
          this.setLocalStorageData();
  }

  public setImage(image): void {
    const _color_white = '#ffffff',
      _image = 'url(' + image + ')';

    this.data.bgColor = null;
      this.data.bgImage = _image;
        this.data.color = _color_white;
          this.setLocalStorageData();
  }

  public changeWeather(): void {
    this.data.isShowWeather = !this.data.isShowWeather;
      this.setLocalStorageData();
  }

  public changeTime(): void {
    this.data.isShowTime = !this.data.isShowTime;
      this.setLocalStorageData();
  }

  private setLocalStorageData(): void {
    const bg_image = 'BG_IMAGE',
      bg_color = 'BG_COLOR',
        color = 'COLOR',
          show_wether = 'SHOW_WEATHER',
            show_time = 'SHOW_TIME';

    this.setLocalStorage(bg_image, this.data.bgImage);
      this.setLocalStorage(bg_color, this.data.bgColor);
        this.setLocalStorage(color, this.data.color);
          this.setLocalStorage(show_wether, this.data.isShowWeather);
            this.setLocalStorage(show_time, this.data.isShowTime);
  }

  private setLocalStorage(key, value): void {
    localStorage.setItem(key, value)
  }

  constructor(
    private paramConst: ParamsEnginesConst,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this)
    const param = this.paramConst;

    this.colors = param.COLORS;
      this.images = param.IMAGES.map(v => param.ROOT + v);
        this.engines = param.ENGINES;
  }

}
