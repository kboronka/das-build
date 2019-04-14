import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    console.log('constructor');
    document.body.className = "splash";
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngOnDestory() {
    console.log('ngOnDestory');
  }
}
