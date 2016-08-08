"use strict";
var application_1 = require("nativescript-angular/application");
var http_1 = require('nativescript-angular/http');
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [app_routes_1.APP_ROUTER_PROVIDERS, http_1.NS_HTTP_PROVIDERS]);
//# sourceMappingURL=main.js.map