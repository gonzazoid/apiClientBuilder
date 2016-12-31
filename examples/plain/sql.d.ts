interface SqlApi__v1__getindexationstatus {
        
}
interface SqlApi__v1__getusersession {
    (id: string): any;
}
interface SqlApi__v1 {
        getindexationstatus : SqlApi__v1__getindexationstatus;
        getusersession : SqlApi__v1__getusersession;
}

interface SqlApi {
    v1: SqlApi__v1;
}
