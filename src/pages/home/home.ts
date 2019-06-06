import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageUtilProvider } from '../../providers/image-util/image-util';
import { HttpClient } from '@angular/common/http';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base64Img:string;
  imagens:string = "eneyltondejesuscamposbarros";
  foto:string;
  fotoConvert:any;


  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private converter:ImageUtilProvider,
    private http: HttpClient) {

  }

  abreGaleria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
    
      this.foto = 'data:image/jpeg;base64,' + imageData;

      this.base64Img = imageData.substr(50,52);

      console.log(this.base64Img);

      this.fotoConvert = this.converter.dataUriToBlob(this.foto);
     
    }, (err) => {
      console.log(err);
     });
  }

  inputFilaChange(){
            
            let formData :  FormData = new FormData();

            formData.append('foto', this.fotoConvert,`${this.base64Img}.jpeg`);
  
            this.http.post('http://localhost:8080/fotos', formData)
            .subscribe(reposta=> console.log('Upload ok.'));

  
    }
  

}
