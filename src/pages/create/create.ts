import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ListPage } from '../list/list';

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
    , private _http: Http
    , public actionSheetCtrl: ActionSheetController
    , private alertCtrl: AlertController
  ) {

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
 

    this._http
    .post(`${this.api}/api/deliveries`, data)
    .subscribe(
      res => {
        this.navCtrl.push(ListPage);
      },
      err => {

            let alert = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Falha ao cadastrar',
              buttons: ['Fechar']
            });
            alert.present();
      }
    );

  }

}
