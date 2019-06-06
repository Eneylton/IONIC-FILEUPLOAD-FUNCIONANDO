import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageUtilProvider } from '../../providers/image-util/image-util';


@IonicPage({})
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  foto:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera, private converter:ImageUtilProvider) {
  }
  abreCamera(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    
      this.foto = 'data:image/jpeg;base64,' + imageData;

      let fotoConvert = this.converter.dataUriToBlob(this.foto);

      console.log(fotoConvert);
     
    }, (err) => {
      console.log(err);
     });
  }

}
