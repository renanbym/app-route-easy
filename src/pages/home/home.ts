import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit  {

  api: string = "https://fun-renanbym.herokuapp.com";
  markers: any = null
  map: any = null

  constructor(public navCtrl: NavController, private _http: Http) {}

  private addMarker = ( lat, lon , text  ) => {
    let marker = L.marker([lat, lon]).bindPopup( text ).addTo(this.map);
    this.markers.addLayer(marker)
    this.map.addLayer(this.markers);
  }

  ngOnInit(){

    this.map = L.map('mapid').setView([-23.550136, -46.633331], 7);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://github.com/renanbym">renanbym</a> contributors'
    }).addTo(this.map);

    this.markers = L.layerGroup();

    this._http
    .get(`${this.api}/api/deliveries`)
    .map((res: Response) => res.json())
    .subscribe( (data) => {
      data.data.map( (delivery) => {
        this.addMarker(delivery.address.latitude, delivery.address.longitude, '<b>'+delivery.name+'</b><br>');
      })
    });

  }

}
