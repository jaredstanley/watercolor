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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _seed = 0;
var blendModeArr = ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
exports.createNewPoint = function (p1, p2, scale) {
  // console.log(scale);
  var p = {};
  var xx = (p1.x + p2.x) / 2;
  var yy = (p1.y + p2.y) / 2;
  var rnd = this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() - 3 / 3;
  rnd *= Math.min(Math.pow(rnd, rnd), rnd * scale * 100);
  // console.log(iter, rnd);
  var ang = rnd * (2 * Math.PI);

  var x = xx + rnd * Math.cos(ang);
  var y = yy + rnd * Math.sin(ang);
  p.x = x;
  p.y = y;
  return p;
};

exports.debug = function (arr, clr, ctx) {
  clr = "white";
  ctx.save();
  arr.forEach(function (e, i) {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = clr;
    // ctx.lineWidth=1;
    // ctx.globalAlpha=0.34;
    ctx.beginPath();
    ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
};

exports.getRandom = function () {
  // return Math.random();
  return (newOne() - 1) / 2147483646;
};

exports.initSeed = function (s) {
  _seed = s % 2147483647;
  if (_seed <= 0) _seed += 2147483646;
};

function newOne() {

  return _seed = _seed * 16807 % 2147483647;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _shape = __webpack_require__(2);

var _shape2 = _interopRequireDefault(_shape);

var _shapeConfig = __webpack_require__(3);

var _shapeConfig2 = _interopRequireDefault(_shapeConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _App = {
  seed: 176,
  init: function init() {
    _utils2.default.initSeed(this.seed);

    // console.log(`Hello ${name}, how are you ${time}?`);
    // this.PRNG.initSeed(this.seed);
    this.canvas = document.getElementById('c');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w / 2;
    this.centerh = this.h / 2;
    this.ctx = this.canvas.getContext("2d");
    //
    // this.ctx.imageSmoothingEnabled = true;
    this.ctx.beginPath();
    //
    var newShape = _shapeConfig2.default.list[1];
    // console.log(newShape);
    this.ctx.fillStyle = newShape.bg;
    this.ctx.fillRect(0, 0, this.w, this.h);
    //
    this.ctx.globalCompositeOperation = newShape.blend;
    //
    // console.log(newShape);
    this.createShape(newShape);
    // this.drawShape();
  },
  createShape: function createShape(s) {
    // console.log("createShape", s);
    for (var j = 0; j < s.shapes.length; j++) {
      if (j == 2) {
        var rad = 185;
        this.ctx.beginPath();
        // this.ctx.arc(this.centerw, this.centerh, 205, 0, Math.PI * 2, true);
        // this.ctx.rect(this.centerw-40, 0,80, 800)
        this.ctx.rect(0, this.centerh - 40, this.w, 80);
        this.ctx.arc(this.centerw, this.centerh, 205, 0, Math.PI * 2);
        // this.ctx.moveTo(this.centerw,0);
        // this.ctx.fill();
        this.ctx.clip();
      }
      var newGuy = new _shape2.default(_App, s.shapes[j], s.scale);
      // console.log(nm);
      for (var k = 0; k < 20; k++) {
        for (var i = 0; i < 3; i++) {
          newGuy.generateLayer(i);
        }
        // console.log(newGuy.shapes);
        for (var d in newGuy.shapes) {
          newGuy.drawShape(newGuy.shapes[d]);
          // utils.debug(newGuy.baseShape, newGuy.color, this.ctx);
        }
      }
    }
  }
};
_App.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//static class variables (internal)
//global (to this module)
var maxPoints = 10000;

function createBaseShape(s) {
  // console.log("createBaseShape");
  // console.log(this.shapes["shapeArr_0"]);
  for (var i = 0; i < 4; i++) {
    s.subdivisions++;
    // console.log(i,subdivisions, s.shapes);
    s.shapes["shapeArr_" + s.subdivisions] = s.subDivide(s.shapes["shapeArr_" + i], i);
  }
  s.baseShape = s.shapes["shapeArr_" + s.subdivisions].slice();
  s.shapes = {};
  s.subdivisions = 0;
}
// new

var Shape = function () {
  function Shape(app, obj, scl) {
    _classCallCheck(this, Shape);

    // console.log(obj);
    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.color = obj.color;
    this.scale = scl;
    this.shapes = { shapeArr_0: [] };
    this.createStartingPoints(obj);
    createBaseShape(this);
  }

  _createClass(Shape, [{
    key: "createStartingPoints",
    value: function createStartingPoints(obj) {
      // console.log(obj);
      if (obj.type.ngon == true) {
        var num_pts = obj.type.pointcount;
        var ang = 0;
        var rad = this.app.w * 0.15;
        var step = 2 * Math.PI / num_pts;
        for (var i = 0; i < num_pts; i++) {
          var _x = this.app.centerw + Math.cos(ang) * rad * _utils2.default.getRandom();
          var _y = this.app.centerh + Math.sin(ang) * rad;
          ang += step;
          this.shapes.shapeArr_0.push({ x: _x, y: _y });
        }
      } else {
        for (var i = 0; i < obj.points.length; i++) {
          this.shapes.shapeArr_0.push(obj.points[i]);
        }
      }
    }
  }, {
    key: "subDivide",
    value: function subDivide(arr) {
      // console.log("subdivide", arr);
      var tmparr = arr.slice();
      var newArr = [];
      for (var i = 0; i < tmparr.length; i++) {
        if (i == 0) {
          //*|* first one
          newArr.push(tmparr[i]);
        } else {
          //*|* main loop
          var newPt = _utils2.default.createNewPoint(tmparr[i], tmparr[i - 1], this.scale);
          //push new point, then push older existing point
          newArr.push(newPt);
          newArr.push(arr[i]);
        }
      }
      //*|* last one! Wrap back to connect to the first point at the end of the loop
      var newPt = _utils2.default.createNewPoint(arr[arr.length - 1], arr[0], this.scale);
      newArr.push(newPt);

      return newArr;
    }
  }, {
    key: "generateLayer",
    value: function generateLayer(pos) {
      // console.log("generateLayer");
      var tmparr = this.baseShape.slice();

      for (var i = 0; i < 3; i++) {
        tmparr = this.subDivide(tmparr);
      }

      this.shapes["shapeArr_" + pos] = tmparr.slice();
    }
  }, {
    key: "drawShape",
    value: function drawShape(_arr) {
      this.app.ctx.fillStyle = this.color;
      this.app.ctx.strokeStyle = this.color;
      // this.app.ctx.fillStyle="rgba(155,10,10,0.013324)";

      // this.app.ctx.fillStyle= "rgba(150,"+Math.round(Math.random()*255)+",255,0.025)";

      this.app.ctx.beginPath();
      this.app.ctx.moveTo(_arr[0].x, _arr[0].y);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        this.app.ctx.lineTo(itm.x, itm.y);
      }
      this.app.ctx.fill();
      // this.app.ctx.stroke();
    }
  }]);

  return Shape;
}();

exports.default = Shape;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"list":[{"bg":"rgb(56,55,59)","blend":"color-dodge","scale":3312,"shapes":[{"name":"a","color":"rgba(0,155,222, 0.01)","type":{"ngon":false,"pointcount":6},"points":[{"x":5200,"y":1200},{"x":3000,"y":3000},{"x":6000,"y":4200},{"x":200,"y":500}]},{"name":"b","color":"rgba(113,211,130, 0.009)","type":{"ngon":false},"points":[{"x":2200,"y":1200},{"x":7000,"y":4000},{"x":6000,"y":4000},{"x":-100,"y":1000}]},{"name":"c","color":"rgba(99,13,210, 0.03)","type":{"ngon":false},"points":[{"x":2200,"y":1200},{"x":7000,"y":3000},{"x":6000,"y":4000},{"x":-1000,"y":500}]},{"name":"d","color":"rgba(110,55,110, 0.009)","type":{"ngon":false},"points":[{"x":2200,"y":1200},{"x":7000,"y":3000},{"x":6000,"y":4000},{"x":0,"y":1000}]},{"name":"base1","color":"rgba(70,65,200, 0.003)","type":{"ngon":false},"points":[{"x":-2200,"y":4200},{"x":9000,"y":4500},{"x":8000,"y":7000},{"x":0,"y":7000}]},{"name":"base2","color":"rgba(220,95,80, 0.002)","type":{"ngon":false},"points":[{"x":-6200,"y":4500},{"x":19000,"y":5000},{"x":9000,"y":17400},{"x":-11100,"y":17400}]},{"name":"base3","color":"rgba(240,255,5, 0.002)","type":{"ngon":false},"points":[{"x":-2200,"y":4000},{"x":9000,"y":6000},{"x":3000,"y":8500},{"x":-11100,"y":8500}]},{"name":"base4","color":"rgba(250,5,130, 0.0034)","type":{"ngon":false},"points":[{"x":-6200,"y":-500},{"x":8000,"y":-1000},{"x":9000,"y":400},{"x":-1100,"y":100}]}]},{"bg":"rgb(206,142,162)","blend":"color-burn","scale":13,"shapes":[{"name":"a","color":"rgba(215,155,0, 0.01)","type":{"ngon":true,"pointcount":9}},{"name":"b","color":"rgba(255,0,230, 0.0123)","type":{"ngon":true,"pointcount":9}},{"name":"c","color":"rgba(33,28,52, 0.008)","type":{"ngon":true,"pointcount":9}},{"name":"d","color":"rgba(199,243,225, 0.006)","type":{"ngon":false},"points":[{"x":-6200,"y":-500},{"x":8000,"y":-1000},{"x":9000,"y":4400},{"x":-1100,"y":4100}]},{"name":"e","color":"rgba(238,69,164, 0.006)","type":{"ngon":true,"pointcount":9}}]}]}

/***/ })
/******/ ]);