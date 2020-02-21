"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var app_settings_1 = require("@app/app.settings");
var AdministrativeLevelOneService = /** @class */ (function () {
    function AdministrativeLevelOneService(_http) {
        this._http = _http;
    }
    AdministrativeLevelOneService.prototype.queryAdminLevelOnes = function (countryID) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
        });
        return this._http.get(app_settings_1.APP_SETTINGS.ADMINISTRATIVE_LEVEL_ONES_URL + '?no_page&slim&country=' + countryID, options).pipe(operators_1.map(function (response) { return response.json(); }), 
        // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
        operators_1.catchError(this.handleError));
    };
    AdministrativeLevelOneService.prototype.getAdminLevelOnes = function () {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
        });
        return this._http.get(app_settings_1.APP_SETTINGS.ADMINISTRATIVE_LEVEL_ONES_URL + '?no_page', options).pipe(operators_1.map(function (response) { return response.json(); }), 
        // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
        operators_1.catchError(this.handleError));
    };
    AdministrativeLevelOneService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.throwError(JSON.stringify(error.json()) || 'Server error');
    };
    AdministrativeLevelOneService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AdministrativeLevelOneService);
    return AdministrativeLevelOneService;
}());
exports.AdministrativeLevelOneService = AdministrativeLevelOneService;
//# sourceMappingURL=administrative-level-one.service.js.map