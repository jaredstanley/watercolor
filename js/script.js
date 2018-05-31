import utils from './utils';
import Shape from './shape';
import shapeConfig from './shapeConfig';
let _App = {
  seed: 176,
  init: function(){
    utils.initSeed(this.seed);

    // console.log(`Hello ${name}, how are you ${time}?`);
    // this.PRNG.initSeed(this.seed);
    this.canvas = document.getElementById('c');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w/2;
    this.centerh = this.h/2;
    this.ctx = this.canvas.getContext("2d");
    //
    // this.ctx.imageSmoothingEnabled = true;
    this.ctx.beginPath();
    //
    let newShape = shapeConfig.list[1];
    // console.log(newShape);
    this.ctx.fillStyle=newShape.bg;
    this.ctx.fillRect(0,0,this.w, this.h);
    //
    this.ctx.globalCompositeOperation = newShape.blend;
    //
    // console.log(newShape);
    this.createShape(newShape);
    // this.drawShape();
  },
  createShape:function(s){
    // console.log("createShape", s);
    for (var j = 0; j < s.shapes.length; j++) {
      if(j==2){

        let boxw=this.centerh*0.3;
        this.ctx.beginPath();
        this.ctx.rect(0, this.centerh-boxw/2,this.w, boxw)
        this.ctx.arc(this.centerw, this.centerh, boxw*2.222, 0, Math.PI * 2);
        this.ctx.clip();


      }
      var newGuy = new Shape(_App, s.shapes[j], s);
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
}
_App.init();
