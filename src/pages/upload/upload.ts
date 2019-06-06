import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage({})
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: HttpClient) {
  }

  inputFilaChange(event){

    if (event.target.files && event.target.files[0]){
            const foto = event.target.files[0];
            const formData = new FormData();
      
            formData.append('foto', foto);

            console.log(foto);
  
            this.http.post('http://localhost:8080/fotos', formData)
            .subscribe(reposta=> console.log('Upload ok.'));
      
    }
  
    }
  
  }