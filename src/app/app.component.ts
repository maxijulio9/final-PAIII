import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonItem, IonContent,
   IonList, IonTitle, IonToolbar, IonHeader, IonMenu, IonMenuButton, IonToggle, IonMenuToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonList,
    IonContent, IonItem, IonApp, IonRouterOutlet,
     IonMenu, IonMenuButton, IonMenuToggle, RouterLink],
})
export class AppComponent {


  constructor() {}
}
