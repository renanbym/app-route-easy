import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit  {

    api: string = "http://localhost:3001";
    markers: any = null
    map: any = null;

    constructor(public navCtrl: NavController, private _http: Http) {


    }

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
                this.addMarker(delivery.address.longitude, delivery.address.latitude, '<b>'+delivery.name+'</b><br>');
            })
        });

    }

}
