import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { LoadingController , ToastController } from '@ionic/angular';



@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  address: string;
  loaderToShow: any;
  data: string;
  constructor(private router: Router,private bluetoothSerial: BluetoothSerial,
    public loadingController: LoadingController, public toastController:ToastController ) {
    if(this.router.getCurrentNavigation().extras.state){
      this.address = this.router.getCurrentNavigation().extras.state.address;
      this.main();
    }else{
      this.presentToastWithOptions("Bluetooth Connection Failed!");
      this.router.navigate(['home']);
    }
     
    
   }

  main(){ 
    this.showLoader("Connecting To Sign");
    this.bluetoothSerial.disconnect();
    this.connect(this.address);
  }
  ngOnInit() {
    
  }

  
  connect(address){
    this.bluetoothSerial.connect(address).subscribe(success => {
    this.hideLoader(); 
  }, error => {
    alert("Error In Connecting to Device");
    this.hideLoader();
    this.router.navigate(['home']);
  });
  }

  
  showLoader(text) {
    this.loaderToShow = this.loadingController.create({
      message: text
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }
 
  hideLoader() {
      this.loadingController.dismiss();
  }

  sendData(){
    this.bluetoothSerial.write(this.data)
    .then(success => {
      this.presentToastWithOptions(success);
    }, error => {
      alert(error)
    });
  }


  clearData(){
    this.data = "";
  }

  async presentToastWithOptions(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'bottom',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }
}
