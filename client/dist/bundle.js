/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/index.jsx":
/*!******************************!*\
  !*** ./client/src/index.jsx ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/sam/Desktop/immersion_sr/leadthedeal/client/src/index.jsx: Argument name clash (64:10)\\n\\n\\u001b[0m \\u001b[90m 62 | \\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 63 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 64 | \\u001b[39maddTag(x\\u001b[33m,\\u001b[39m x\\u001b[33m,\\u001b[39m x){\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m          \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 65 | \\u001b[39maxios\\u001b[33m.\\u001b[39mpost(\\u001b[32m'/tags'\\u001b[39m\\u001b[33m,\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 66 | \\u001b[39m  query\\u001b[33m:\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 67 | \\u001b[39m    userId\\u001b[33m:\\u001b[39m x\\u001b[33m,\\u001b[39m\\u001b[0m\\n    at Object.raise (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:3851:17)\\n    at Object.checkLVal (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:5528:18)\\n    at Object.checkParams (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:6935:12)\\n    at Object.parseFunctionBody (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:6908:12)\\n    at Object.parseFunctionBodyAndFinish (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:6879:10)\\n    at Object.parseMethod (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:6835:10)\\n    at Object.pushClassMethod (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8264:30)\\n    at Object.parseClassMemberWithIsStatic (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8189:12)\\n    at Object.parseClassMember (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8128:10)\\n    at withTopicForbiddingContext (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8083:14)\\n    at Object.withTopicForbiddingContext (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7185:14)\\n    at Object.parseClassBody (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8060:10)\\n    at Object.parseClass (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8034:22)\\n    at Object.parseStatementContent (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7333:21)\\n    at Object.parseStatement (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7291:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7868:25)\\n    at Object.parseBlockBody (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7855:10)\\n    at Object.parseTopLevel (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:7220:10)\\n    at Object.parse (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:8863:17)\\n    at parse (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/parser/lib/index.js:11135:38)\\n    at parser (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/Users/sam/Desktop/immersion_sr/leadthedeal/node_modules/@babel/core/lib/transform.js:34:34)\\n    at _combinedTickCallback (internal/process/next_tick.js:132:7)\\n    at process._tickCallback (internal/process/next_tick.js:181:9)\");\n\n//# sourceURL=webpack:///./client/src/index.jsx?");

/***/ })

/******/ });