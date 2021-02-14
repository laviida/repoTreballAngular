import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { TeamsService } from 'src/app/services/teams.service';
import { latLng, MapOptions, tileLayer, Map, Marker, icon, Popup, PopupOptions, LayerGroup } from 'leaflet';
import { MarkersService } from 'src/app/services/markers.service';
import { MarkerModel } from 'src/app/models/marker-model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  map: Map;
  mapOptions: MapOptions;
  team: Team;
  players: Array<Player>
  popUpOptions: PopupOptions = {
    maxWidth: 150,
    minWidth: 150,
    maxHeight: 150,
    keepInView: true,
    closeButton: true,
    autoPan: true,
    autoClose: false,
    closeOnClick: true,
    closeOnEscapeKey: false,
    zoomAnimation: true
  }

  constructor(private activatedRoute: ActivatedRoute, private serviceTeams: TeamsService, private serviceMarkers: MarkersService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.serviceTeams.getTeam(params.id).subscribe(t => {
      this.team = t;
      this.initMap();
    }));
  }

  async onMapReady(map: Map) {
    this.map = map;
    (await this.serviceMarkers.getMarkers([this.team.City, this.team.Name])).forEach((m: MarkerModel) => this.createMarker(m));
  }

  private initMap() {
    this.mapOptions = {
      center: latLng(47.116386, -101.299591),
      zoom: 5,
      layers: [
        tileLayer(
          'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
          {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            attribution: 'Map data © OpenStreetMap contributors',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic2VyZ2ljbiIsImEiOiJja2hjMnRsbWkwNXJ0MnNta25nYjV0M3Y2In0.0PgDzmHjsMxpo_JKaxrZOg'
          })
      ],
    };
  }

  private createMarker(m: MarkerModel) {
    const marker = new Marker([m.lat, m.lng], { title: m.label })
      .setIcon(
        icon({
          iconSize: [40, 40],
          iconAnchor: [13, 41],
          iconUrl: '/assets/img/marker.png',
        }));
    marker.bindPopup(new Popup(this.popUpOptions).setContent(`<h4 class="text-center small"><strong>${m.label.slice(0, m.label.indexOf(","))}</strong></h4>
    <p class="text-justify small">${m.label.slice(m.label.indexOf(",") + 1).trim()}</p>`));
    marker.addTo(this.map);
    this.map.panTo(marker.getLatLng());
  }
}
