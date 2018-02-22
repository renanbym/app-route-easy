import { Component,  OnInit } from '@angular/core'
import { NavController, NavParams, ActionSheetController } from 'ionic-angular'
import { Http, Response } from '@angular/http'

import { CreatePage } from '../create/create'


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  items: any = []
  api: string = "https://fun-renanbym.herokuapp.com"

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: Http,public actionSheetCtrl: ActionSheetController) {

    this.refresh()

  }
 
  refresh(){
    this._http
    .get(`${this.api}/api/deliveries`)
    .map((res: Response) => res.json())
    .subscribe( (data) => {
      this.items = data.data
    })
  }

  delete( item ){
    this._http
    .delete(`${this.api}/api/deliveries/${item._id}`)
    .subscribe( () => {
        this.refresh()
    })

  }

  goCreate(){
    this.navCtrl.push(CreatePage)
  }


}
