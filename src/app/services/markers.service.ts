import { Injectable } from '@angular/core';
import { icon, Marker, Popup, PopupOptions } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarkerModel } from '../models/marker-model';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor() {
    this.markers = new Array<MarkerModel>();
  }
  markers: Array<MarkerModel>;




  async getMarkers(keywords: Array<String>): Promise<Array<MarkerModel>> {
    const provider = new OpenStreetMapProvider();
    var query_addr = "United States, " + keywords.join(", ");
    var query_promise = provider.search({ query: query_addr });

    var values = await query_promise;
    values.forEach(value => {
      this.markers.push({ lng: parseFloat(value.x), lat: parseFloat(value.y), label: value.label });
    });

    return this.markers;

  }


}
