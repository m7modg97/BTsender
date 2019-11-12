import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  buttonDisable = true;
  deviceList = null;
  loaderToShow: any;
  isValid = false;
  
  constructor(private bluetoothSerial: BluetoothSerial,public loadingController: LoadingController, private router: Router) {
    this.main();   
  };
  
  main(){
    this.deviceList = null;
    this.bluetoothSerial.disconnect();

    
    this.bluetoothSerial.isEnabled().then(
      () => {
        this.searchDevices();
    },
      () => {
        this.enableBluetooth();
      }
    )
  }
 

  enableBluetooth(){
    this.bluetoothSerial.enable().then(
      () => {
        this.searchDevices();
      }, () => {
        alert("Allow Bluetooth To Turn On Or Exit The App!");
      }
    ); 
  }

  searchDevices(){
    this.showLoader("Scan Bluetooth Devices");
    this.bluetoothSerial.discoverUnpaired().then(success => {
      this.deviceList = success; 
      this.hideLoader();
    }, () => { 
      this.hideLoader();
      alert("Can't Search For Devices!");
    });
    
  }

  connect(address){ 
    console.log(address);
   this.router.navigate(['sign'], { state: { address: address } });


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


  
}
