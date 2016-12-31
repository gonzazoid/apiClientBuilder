"use strict";
var is_string = function (str) {
    return 'string' === typeof str || str instanceof String;
};
var getProxy = function (worker) {
    return new Proxy({}, {
        get: function (target, key, proxy) {
            return is_string(target[key]) ? worker.bind(null, target[key]) : target[key];
        },
        has: function (target, key) {
            return key in target;
        },
        set: function (target, key, value, proxy) {
            target[key] = value;
            return true;
        }
    });
};
exports.apiClientBuilder = function (obj, plan) {
    if (plan === void 0) { plan = 'plain'; }
    var tree;
    if (plan === 'plain') {
        // build the tree
        tree = {};
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) {
                continue;
            }
            if (obj[i].length) {
                var path = obj[i].join('.');
                var last = obj[i].length - 1;
                var root = tree;
                for (var j = 0; j < last; j++) {
                    if (!root.hasOwnProperty(obj[i][j])) {
                        root[obj[i][j]] = {};
                    }
                    root = root[obj[i][j]];
                }
                root[obj[i][last]] = path;
            }
            else {
            }
        }
    }
    else {
        // TODO check structure
        tree = Object.assign({}, obj);
    }
    return function (worker) {
        var res = getProxy(worker);
        for (var i in tree) {
            if (tree.hasOwnProperty(i)) {
                switch (true) {
                    case is_string(tree[i]):
                        res[i] = tree[i];
                        break;
                    case 'object' === typeof tree[i]:
                        // pay attention to last argument
                        res[i] = exports.apiClientBuilder(tree[i], 'tree')(worker);
                        break;
                    default:
                }
            }
        }
        return res;
    };
};
