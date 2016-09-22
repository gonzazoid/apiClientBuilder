/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** multi index ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./index.ts */1);


/***/ },
/* 1 */
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ function(module, exports) {

	"use strict";

	var is_string = function (str) {
	    return 'string' === typeof str || str instanceof String;
	};
	var getProxy = function (worker) {
	    return new Proxy({}, {
	        get(target, key, proxy) {
	            return is_string(target[key]) ? worker.bind(null, target[key]) : target[key];
	        },
	        has(target, key) {
	            return key in target;
	        },
	        set(target, key, value, proxy) {
	            target[key] = value;
	            return true;
	        }
	    });
	};
	exports.apiClientBuilder = function (obj, worker, plan = 'plain') {
	    let tree;
	    if (plan === 'plain') {
	        tree = {};
	        for (let i in obj) {
	            if (!obj.hasOwnProperty(i)) {
	                continue;
	            }
	            if (obj[i].length) {
	                let root = tree;
	                let last = obj[i].length - 1;
	                for (let j = 0; j < last; j++) {
	                    if (!root.hasOwnProperty(obj[i][j])) {
	                        root[obj[i][j]] = {};
	                    }
	                    root = root[obj[i][j]];
	                }
	                root[obj[i][last]] = i;
	            } else {}
	        }
	    } else {
	        tree = obj;
	    }
	    let res = getProxy(worker);
	    for (let i in tree) {
	        if (tree.hasOwnProperty(i)) {
	            switch (true) {
	                case 'string' === typeof tree[i] || tree[i] instanceof String:
	                    res[i] = tree[i];
	                    break;
	                case 'object' === typeof tree[i]:
	                    res[i] = exports.apiClientBuilder(tree[i], worker, 'tree');
	                    break;
	                default:
	            }
	        }
	    }
	    return res;
	};

/***/ }
/******/ ]);