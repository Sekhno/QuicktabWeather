import { Component, OnInit, Inject } from '@angular/core';
import { WeatherService } from '../../_service/weather.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DialogPosition } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { ParamsEnginesConst } from './params.engines.const'

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  providers: [ 
    WeatherService, 
    MatDialog, 
    ParamsEnginesConst 
  ]
})
export class WrapperComponent implements OnInit {
  
  public isHidePlaceholder: boolean;
  public hrefSearch: string;
  public searchQuery: string;
  public engines;
  public isShowTime: boolean;
  public isShowWeather: boolean;
  public searchParam: string = 'web';
  public weather;
  public weatherIcon: string;
  public whatTime;
  public params = {
    isShowTime: null,
    isShowWeather: null,
    bgColor: null,
    bgImage: null,
    searchEngine: null,
    color: null,
    currentEngine: null,
    setSearchParams: this.setSearchParams.bind(this)
  };
  private currentObjEngine: Object|null;
  private position: DialogPosition;
  private weatherIcons;
  private period: number = 4000;
  private interval;

  public backToTheFuture() {
    if (document && document.getElementById) {
      const FutureStr = 'future',
        Future = document.getElementById(FutureStr);
          if (Future.click) {
            Future.click();
      }
    }
  }

  public setSearchParams(Engin) {
    this.currentObjEngine = Engin.value;
      this.params.currentEngine = Engin.viewValue;
        this.setParamsEngine();
  }

  public toggleMonitor(): void {
    this.removeIntervalShowWeather();
      this.setIntervalShowWeather();
        this.isShowTime = !this.isShowTime;
          this.isShowWeather = !this.isShowWeather;
  }

  public openDialog(): void {
    let dialogRef = this.dialog
      .open(DialogComponent, {
        width: 'auto',
        position: {
          top: '70px',
          right: '30px'
        },
        data: this.params
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (this.params.isShowTime && this.params.isShowWeather) {
        this.isShowWeather = true;
        this.isShowTime = false;
        this.removeIntervalShowWeather();
        this.setIntervalShowWeather()
      } else {
        if (this.params.isShowTime) {
          this.isShowTime = true;
          this.isShowWeather = false;
        } else if (this.params.isShowWeather) {
          this.isShowTime = false;
          this.isShowWeather = true;
        } else {
          this.isShowTime = false;
          this.isShowWeather = false;
        }
        this.removeIntervalShowWeather()
      }
    });
  }

  public setParamsEngine(): void {
    const SearchParam = this.searchParam,
      CurEngine = this.params.currentEngine.toLowerCase(),
        Str = this.currentObjEngine[SearchParam][CurEngine],
          Query = this.searchQuery || '',
            CurrentEngineStr = 'CURRENT_ENGINE';

    this.params.searchEngine = this.formatString(Str, Query); 
      localStorage.setItem(CurrentEngineStr, this.params.currentEngine);
  }

  private saveIconsJSON(callback) {
    this.api
      .getIconsJSON()
        .subscribe(
          (success) => {
            this.weatherIcons = success;
              callback()
                });
  }

  private saveDataWeather(resp) {
    this.weather = resp;
      
    const prefix = 'wi wi-',
      code = resp.weather[0].id;
        var icon = this.weatherIcons[code].icon;
    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) 
      && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }
    // Finally tack on the prefix.
    this.weatherIcon = icon = prefix + icon;
  }

  private getTimeNow() {
    const Period = 100;

    this.whatTime = Observable
      .interval(Period)
        .map(x => new Date())
          .share();
  }

  private setIntervalShowWeather() {
    this.interval = Observable
      .interval(this.period)
        .subscribe(x => this.toggleMonitor())
  }

  private removeIntervalShowWeather() {
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  private formatString(Str, Request) {
    const Template = '<TEMPLATE>',
      FormatStr = Str.replace(Template, Request);
        return FormatStr;
  }

  private getLocalStorageData(): void {
    const current_engine = 'CURRENT_ENGINE',
      current_engine_def = 'Bing',
        bg_image = 'BG_IMAGE',
          bg_color = 'BG_COLOR',
            bg_image_def = 'url(./assets/image/grass.jpg)',
              color = 'COLOR',
                color_def = '#FFFFFF',
                  show_weather = 'SHOW_WEATHER',
                    show_time = 'SHOW_TIME';
    
    this.params.currentEngine = GET(current_engine) || current_engine_def;
      this.params.bgImage = GET(bg_image) || bg_image_def;
        this.params.bgColor = GET(bg_color);
          this.params.color = GET(color) || color_def;
            this.params.isShowWeather = GET(show_weather) !== null ? JSON.parse(GET(show_weather)) : true;
              this.isShowWeather = this.params.isShowWeather;
                this.params.isShowTime = GET(show_time) !== null ? JSON.parse(GET(show_time)) : true;
                  this.isShowTime = this.params.isShowTime;

    if (this.isShowWeather 
      && this.isShowTime) {
        this.isShowTime = false;
          this.setIntervalShowWeather()
    }

    function GET(Key) {
      return localStorage.getItem(Key);
    }
  }

  constructor(
    private api: WeatherService,
    public dialog: MatDialog,
    private _const: ParamsEnginesConst
  ) { }

  ngOnInit() {
    this.getLocalStorageData();
    this.engines = this._const.ENGINES;
    this.currentObjEngine = this.engines[0].value;
    this.params.searchEngine = this.formatString(
      this.engines[0].value[this.searchParam][this.params.currentEngine.toLowerCase()], 
      this.searchQuery || ''
    ); 
    
    this.api.data.subscribe(
      Url => {
        this.api.getWeather(Url)
          .subscribe(
            success => this.saveIconsJSON(
              () => this.saveDataWeather(success)))
      },
      error => console.log(error)
    );
    this.getTimeNow();
    
    if (this.isShowTime && this.isShowWeather) {
      this.setIntervalShowWeather();
    }
    
  }
}

