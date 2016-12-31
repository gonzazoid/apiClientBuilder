/// <reference path="./sql.d.ts" />

import { apiClientBuilder } from '../../index';

/* tslint:disable:quotemark */
let def = {
    "getindexationstatus": [
        "v1",
        "getindexationstatus"
    ],
    "getusersession": [
        "v1",
        "getusersession"
    ]
};
/* tslint:enable:quotemark */

let worker = function(path: string, data: any){
    console.log('worker!!!', path, data);
};

export let sqlClient:SqlApi = apiClientBuilder(def, 'plain')(worker);
