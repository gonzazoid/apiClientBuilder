
var is_string = function(str: any){
    return 'string' === typeof str || str instanceof String;
};

var getProxy = function (worker: Function){
    return new Proxy({}, {  
      get (target: any, key: string, proxy: any) {
        return is_string(target[key]) ? worker.bind(null, target[key]) : target[key];
      },
      has (target: any, key: string): boolean {
        return key in target;
      },
      set (target: any, key: string, value: string, proxy: any): boolean{
        target[key] = value;
        return true;
      }
    });
};

export let apiClientBuilder = function(obj: any, worker: Function, plan: string = 'plain'): any{

    let tree;

    if(plan === 'plain'){
        // build the tree
        tree = {};
        for(let i in obj){
            if(!obj.hasOwnProperty(i)){
                continue;
            }
            if(obj[i].length){
                let root = tree;
                let last = obj[i].length-1;
                for(let j = 0; j<last; j++){
                    if(!root.hasOwnProperty(obj[i][j])){
                        root[ obj[i][j]] = {};
                    }
                    root = root[ obj[i][j]];
                }
                root[obj[i][last]] = i;
            }else{
                // TODO warning
            }
        }
    }else{
        // TODO check structure
        tree = Object.assign({}, obj);
    }

    let res = getProxy(worker);
    for(let i in tree){
        if(tree.hasOwnProperty(i)){
            switch(true){ // ){
                case 'string' === typeof tree[i] || tree[i] instanceof String : 
                    res[i] = tree[i];
                    break;
                case 'object' === typeof tree[i]:
                    // pay attention to last argument
                    res[i] = apiClientBuilder(tree[i], worker, 'tree');
                    break;
                default:
                    // TODO error
            }
        }
    }
    return res;
};
