import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {GroceriesAppComponent} from "./app.component";

bootstrap(GroceriesAppComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS]);