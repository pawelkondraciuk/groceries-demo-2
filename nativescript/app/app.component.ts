import {Component} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";

import {LoginComponent} from "./pages/login/login.component";
import {ListComponent} from "./pages/list/list.component";

@Component({
  selector: "main",
  directives: [NS_ROUTER_DIRECTIVES],
  template: "<page-router-outlet></page-router-outlet>",
  precompile: [LoginComponent, ListComponent]
})
export class AppComponent {}
