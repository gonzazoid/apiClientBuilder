interface user__auth__request {
        login: string;
        pwd: string;
}

interface SwaggerApi__user {
        status() : any;
        auth(arg:user__auth__request) : any;
        logout() : any;
}
interface SwaggerApi__datasets {
        get() : any;
}
interface SwaggerApi {
        user : SwaggerApi__user;
        datasets : SwaggerApi__datasets;
}
