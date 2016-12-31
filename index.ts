declare var Proxy;

const is_string = function(str: any){
    return 'string' === typeof str || str instanceof String;
};

const getProxy = function (worker: Function){
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

export const apiClientBuilder = function(obj: any, plan: string = 'plain'): Function {

    let tree : any;

    if(plan === 'plain'){
        // build the tree
        tree = {};
        for(let i in obj){
            if(!obj.hasOwnProperty(i)){
                continue;
            }
            if(obj[i].length){
                const path = obj[i].join('.');
                const last = obj[i].length-1;
                let root = tree;
                for(let j = 0; j<last; j++){
                    if(!root.hasOwnProperty(obj[i][j])){
                        root[ obj[i][j]] = {};
                    }
                    root = root[ obj[i][j]];
                }
                root[obj[i][last]] = path;
            }else{
                // TODO warning
            }
        }
    }else{
        // TODO check structure
        tree = (Object as any).assign({}, obj);
    }

    return function(worker: Function) : any {
        const res = getProxy(worker);
        for(let i in tree){
            if(tree.hasOwnProperty(i)){
                switch(true){ // ){
                    case is_string(tree[i]): 
                        res[i] = tree[i];
                        break;
                    case 'object' === typeof tree[i]:
                        // pay attention to last argument
                        res[i] = apiClientBuilder(tree[i], 'tree')(worker);
                        break;
                    default:
                        // TODO error
                }
            }
        }
        return res;
    };
};
