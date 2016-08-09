import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import {LoginComponent} from "./pages/login/login.component";
import {ListComponent} from "./pages/list/list.component";

@Component({
  selector: "groceries-app",
  directives: [ROUTER_DIRECTIVES],
  template: "<router-outlet></router-outlet>",
  precompile: [LoginComponent, ListComponent]
})
export class AppComponent {}
