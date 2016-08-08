import {nativeScriptBootstrap} from "nativescript-angular/application";
import {NS_HTTP_PROVIDERS} from 'nativescript-angular/http';
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {AppComponent} from "./app.component";

nativeScriptBootstrap(AppComponent, [APP_ROUTER_PROVIDERS, NS_HTTP_PROVIDERS]);