/// <reference path="./swagger.d.ts" />

import { apiClientBuilder } from '../../index';

/* tslint:disable:quotemark */
let def = {
    "user": {
        "status": "user/status",
        "auth": "user/auth",
        "logout": "user/logout"
    },
    "datasets": {
        "get": "datasets/get"
    }
};
/* tslint:enable:quotemark */

let worker = function(path: string, data: any){
    console.log('worker!!!', path, data);
};

export let swaggerClient:SwaggerApi = apiClientBuilder(def, 'tree')(worker);
