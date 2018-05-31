import utils from './utils';
import Shape from './shape';
let _App = {
  seed: 243,
  init: function(){
    utils.initSeed(this.seed);
    // console.log(`Hello ${name}, how are you ${time}?`);
    // this.PRNG.initSeed(this.seed);
    console.log("iniiiit");
    this.canvas = document.getElementById('c');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w/2;
    this.centerh = this.h/2;
    this.ctx = _App.canvas.getContext("2d");
    //
    this.ctx.beginPath();
    // this.ctx.arc(this.centerw-100, this.centerh-50, 175, 0, Math.PI * 2, true);
    // this.ctx.arc(this.centerw+120, this.centerh+20, 45, 0, Math.PI * 2, true);
    // this.ctx.fillStyle="rgb(44,44,44)";
    // this.ctx.fillStyle="rgb(144,144,144)";
    // this.ctx.fillRect(0,0,this.w, this.h);
    //
    this.ctx.imageSmoothingEnabled = true;
    // this.ctx.globalCompositeOperation = "color-dodge";
    // this.ctx.globalCompositeOperation = "overlay";
    //
    this.ctx.fillStyle="rgb(46,32,22)";
    this.ctx.globalCompositeOperation = "color-dodge";
    this.colorsArr =["rgba(215,155,0, 0.01)","rgba(255,0,30, 0.01)","rgba(33,228,52, 0.008)","rgba(99,43,225, 0.006)","rgba(238,69,64, 0.006)"]

    // this.ctx.fillStyle="rgb(44,44,144)";
    // this.ctx.globalCompositeOperation = "lighter";
    // this.colorsArr =["rgba(255,255,0, 0.01)","rgba(255,0,0, 0.01)"];
    //
    // this.ctx.fillStyle="rgb(44,44,44)";
    // this.ctx.globalCompositeOperation = "hard-light";
    // this.colorsArr =["rgba(0,255,0, 0.01)","rgba(0,0,230, 0.0123)","rgba(233,0,0, 0.010)"];
    //
    this.ctx.fillStyle="rgb(222,222,222)";
    this.ctx.globalCompositeOperation = "hard-light";
    this.colorsArr =["rgba(0,155,122, 0.021)","rgba(113,111,130, 0.001)","rgba(99,43,210, 0.006),rgba(215,155,0, 0.01)"]
    // //
    this.ctx.fillStyle="rgb(255,144,10)";
    this.ctx.globalCompositeOperation = "color-burn";
    this.colorsArr =["rgba(10,10,0, 0.006)","rgba(0,111,0, 0.0106)","rgba(99,43,0, 0.008)","rgba(0,111,111, 0.0059)"]
    // //
    this.ctx.fillStyle="rgb(235,10,10)";
    this.ctx.globalCompositeOperation = "lighter";
    this.colorsArr =["rgba(220,220,220, 0.006)","rgba(110,111,0, 0.01)","rgba(199,43,10, 0.008)","rgba(0,111,211, 0.0059)"]
    // //
    // //
    this.ctx.fillStyle="rgb(245,168,228)";
    this.ctx.globalCompositeOperation = "darken";
    this.colorsArr =["rgba(220,0,220, 0.026)","rgba(110,151,0, 0.01)","rgba(199,43,10, 0.008)","rgba(0,111,211, 0.0059)"]
    // //
    this.ctx.fillStyle="rgb(111,68,28)";
    this.ctx.globalCompositeOperation = "lighter";
    this.colorsArr =["rgba(220,0,220, 0.026)","rgba(110,151,0, 0.01)","rgba(199,43,10, 0.008)","rgba(0,111,211, 0.0059)"]



    this.ctx.fillRect(0,0,this.w, this.h);
    this.createShape();

    // this.drawShape();
  },
  createShape:function(){
    console.log("createShape");
    for (var j = 0; j < this.colorsArr.length; j++) {
      if(j==0){
        // this.ctx.arc(this.centerw, this.centerh, 185, 0, Math.PI * 2, true);
        // this.ctx.clip();

      }
      var nm = "n"+j;
      // console.log(nm);
      const nm = new Shape(_App, this.colorsArr[j]);
      // console.log(nm);
      for (var k = 0; k < 20; k++) {
        for (var i = 0; i < 3; i++) {
          nm.generateLayer(i);
        }
        for (var s in nm.shapes) {
            nm.drawShape(nm.shapes[s]);
            // utils.debug(nm.baseShape, nm.color, this.ctx);
        }
      }
    }







  }
}
_App.init();
