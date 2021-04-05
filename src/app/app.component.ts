import { Component, OnInit } from '@angular/core';
// import { Plugins,StatusBarStyle} from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {}

  ngOnInit(){
    // const { StatusBar } = Plugins;
    // StatusBar.setStyle({style: StatusBarStyle.Light});
  }
}
