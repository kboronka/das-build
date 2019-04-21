import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'das-build';
  previousBodyClass: string;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousBodyClass) {
            this.renderer.removeClass(document.body, this.previousBodyClass);
          }

          let currentRoute = event.url;
          if (currentRoute && currentRoute == '/') {
            this.previousBodyClass = 'splash';
            this.renderer.addClass(document.body, 'splash');
          }
        }
      });
  }
}
