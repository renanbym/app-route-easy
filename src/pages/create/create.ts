import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {

  form: any = {}
  api: string = "http://localhost:3001";

  public userSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Endereço',
    "currentLocIconUrl":"https://cdn4.iconfinder.com/data/icons/proglyphs-traveling/512/Current_Location-512.png",
    "locationIconUrl":"http://www.myiconfinder.com/uploads/iconsets/369f997cef4f440c5394ed2ae6f8eecd.png",
    "recentStorageName":"componentData4",
    "noOfRecentSearchSave":8
  };

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public http: HttpClient
    , public actionSheetCtrl: ActionSheetController
  ) {


    var headers = new Headers({'Content-Type': 'application/json'});
    var options = new RequestOptions({headers });

    http
    .post("http://localhost:3001/api/deliveries", {name: "oi"} )
    .subscribe(data => {
      console.log(data['_body']);
    })
  }

  autoComplete(data:any) {
    this.form.address = data.data.description
    this.form.longitude = data.data.geometry.location.lng
    this.form.latitude = data.data.geometry.location.lat
  }

  addressForm() {

    var data = {
      name: this.form.name
      ,address: {
        street: this.form.address
        , latitude:  this.form.latitude
        , longitude: this.form.longitude
      }
    }

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    var options = new RequestOptions({headers });

    this.http
    .post("http://localhost:3001/api/deliveries", data, options )
    .map(data => {
      console.log(data['_body']);
    }).catch(data => {
      console.log(data['_body']);
    })
  }

}
