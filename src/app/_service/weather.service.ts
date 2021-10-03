import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Params } from './params';

const KEYWORDS = { Lon: '&lon=', Lat: '&lat=' },
  LAT = 'LATITUDE',
    LON = 'LONGITUDE';

@Injectable()
export class WeatherService {

  private getGeo(): Observable<any> {
    return this.http
      .get(this.params.GEO)
        .map(
          success => this.extractResponse(success),
          error => this.params.DEF_GEO
        )
  }

  public data = new Observable(observer => {
    this.getGeo()
      .subscribe(
        (RespGeo) => {
          const FullGetRequest = RespGeo.geo ? 
            this.setGeoLocation(RespGeo.geo) : 
              this.setGeoLocation(this.params.DEF_GEO.geo);
                observer.next(FullGetRequest);
        },
        (error) => {
          const FullGetRequest = this.setGeoLocation(error.geo);
            observer.next(FullGetRequest); 
        }
      )
    }
  )

  private setGeoLocation(GeoData) {
    const Geo = GeoData,
      AddParams = KEYWORDS.Lon + Geo[LON] + KEYWORDS.Lat + Geo[LAT],
        FullGetRequest = this.params.URL + this.params.PARAMS + AddParams;
          return FullGetRequest;
  }

  public getWeather(UrlRequest): Observable<any> {
    return this.http
      .get(UrlRequest)
        .map(
          resp => this.extractResponse(resp),
          error => error
        );
  }

  public getIconsJSON() {
    return this.http
      .get(this.params.ICONS_JSON)
        .map(success => this.extractResponse(success))
  }

  private extractResponse(response: Response) {
    return response.json()
  }

  constructor(
    private http: Http,
    private params: Params
  ) { }

}
