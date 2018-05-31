
var _App = {
  seed: 172,
  init: function(){
    this.PRNG.initSeed(this.seed);
    console.log("iniiiit");
    this.canvas = document.getElementById('c');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w/2;
    this.centerh = this.h/2;
    this.ctx = _App.canvas.getContext("2d");
    //
    this.ctx.beginPath();
    this.ctx.arc(this.centerw, this.centerh, 160, 0, Math.PI * 2, true);
    this.ctx.clip();
    this.ctx.fillStyle="rgb(44,44,44)";
    this.ctx.fillRect(0,0,this.w, this.h)
    //
    this.clrArr = [
      // {color1: "rgba(200,200,0,0.0213)", color2: "rgba(0,111,0,0.01623)"}
      {color1: "rgba(250,50,0,0.023)", color2: "rgba(25,110,110,0.01623)"}
      // {color1: "rgba(250,50,255,0.0123)", color2: "rgba(0,111,122,0.0023)"}
    ]
    this.ctx.globalCompositeOperation = "screen";
    //
    this.createShape();

    // this.drawShape();
  },
  createShape:function(){
    shp = new Shape(this.clrArr[0]);
    shp.createStartingPoints();
    shp.createBaseShape();

    // shp.drawShape(shp.baseShape);
    //
    for (var k = 0; k < 40; k++) {
      for (var i = 0; i < 3; i++) {
        shp.generateLayer(i);
      }
      for (var s in shp.shapes) {
          shp.drawShape(shp.shapes[s]);
      }
    }
    // _App.Utils.debug(shp.baseShape, "black");


    // for (var s in shp.shapes) {
    //     _App.Utils.debug(shp.shapes[s], "black");
    // }


  }
}

function Shape(cObj){

  this.subdivisions= 0;
  this.totalPoints= 0;
  this.maxPoints= 10000;
  //
  this.color1 = cObj.color1;
  this.color2 = cObj.color2;
  //
  this.createStartingPoints = function(){
    this.shapes={ shapeArr_0: []};
    //create evenly-distributed points around a sphere
    var num_pts = 9;
    var ang = 0;
    var rad = _App.w*0.25;
    var step = (2*Math.PI)/num_pts;
    for (var i = 0; i < num_pts; i++) {
      var _x = _App.centerw+Math.cos(ang)*rad*_App.PRNG.getRandom();
      var _y = _App.centerh+Math.sin(ang)*rad;
      ang+=step;
      this.shapes.shapeArr_0.push({x:_x, y:_y});
    }
      // this.initialPoints = 4;
    // for (var i = 0; i < this.initialPoints; i++) {
    //   var itm = {
    //     x:_App.PRNG.getRandom()*_App.w,
    //     y:_App.PRNG.getRandom()*_App.h
    //   }
      // this.shapes.shapeArr_0.push(itm);
    // }
    // this.shapes.shapeArr_0 = [
    //   {x:_App.centerw,y:10},
    //   {x:_App.centerw+240,y:410},
    //   {x:_App.centerw-240,y:410}
    // ]
    // this.startingShape = this.shapes.shapeArr_0.slice();

  }
  this.createBaseShape = function(){
    for (var i = 0; i < 4; i++) {
      // if(this.totalPoints<this.maxPoints){
        this.subdivisions++;
        this.shapes["shapeArr_"+this.subdivisions] = this.subDivide(this.shapes["shapeArr_"+i], i);
        // this.totalPoints+=this.shapes["shapeArr_"+this.subdivisions].length;
      // }else{
        // console.log(this.totalPoints,"hey we're jammed up w a ton of points so gonna chill rn");
      // }
    }
    this.baseShape = this.shapes["shapeArr_"+this.subdivisions].slice();
    this.shapes = {};
    this.subdivisions=0;
  }
  //
  this.subDivide = function(arr, dampen){
    // console.log("subdivide");
    var tmparr=arr.slice();
    var newArr = [];
    for (var i = 0; i < tmparr.length; i++) {
      if(i==0){
        //*|* first one
        newArr.push(tmparr[i]);
      }else{
        //*|* main loop
        var newPt = _App.Utils.createNewPoint(tmparr[i], tmparr[i-1], dampen);
        //push new point, then push older existing point
        newArr.push(newPt);
        newArr.push(arr[i]);
      }
    }
    //*|* last one! Wrap back to connect to the first point at the end of the loop
    var newPt = _App.Utils.createNewPoint(arr[arr.length-1], arr[0], 1);
    newArr.push(newPt);

    return newArr;
  }
  //
  this.generateLayer = function(pos){
    var tmparr = this.baseShape.slice();
    for (var i = 0; i < 3; i++) {
      tmparr = this.subDivide(tmparr);
    }
    this.shapes["shapeArr_"+pos]=tmparr.slice();
  }
  //
  this.drawShape= function(_arr){
    // console.log("drawshape");
    // console.log("ShapeMgr.drawShape:", this.subdivisions+"shapes", this.shapes["shapeArr_"+i].length+" points most complex shape,", this.shapes["shapeArr_"+this.subdivisions].length+"total points drawn");
      // _App.ctx.fillStyle=_App.color;
      // let grad = _App.ctx.createLinearGradient(_App.PRNG.getRandom()*_App.w,_App.PRNG.getRandom()*_App.h,_App.PRNG.getRandom()*_App.w,_App.PRNG.getRandom()*_App.h);
      // grad.addColorStop(0,this.color1);
      // grad.addColorStop(1,this.color2);

      // _App.ctx.fillStyle=grad;
      _App.ctx.fillStyle=this.color2;
      // _App.ctx.fillStyle="rgba(155,10,10,0.013324)";

      // _App.ctx.fillStyle= "rgba(150,"+Math.round(Math.random()*255)+",255,0.025)";

      _App.ctx.beginPath();
      _App.ctx.moveTo(_arr[0].x, _arr[0].y);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        _App.ctx.lineTo(itm.x, itm.y);
      }
      _App.ctx.fill();
  }

}
//
_App.Utils = {
  createNewPoint: function(p1, p2, iter){


      // console.log(diminish);
      var p = {};
      var xx =(p1.x+p2.x) / 2;
      var yy = (p1.y+p2.y) / 2;
      var rnd = ((_App.PRNG.getRandom()+_App.PRNG.getRandom()+_App.PRNG.getRandom()+_App.PRNG.getRandom()+_App.PRNG.getRandom()+_App.PRNG.getRandom())-3/3);
      rnd*=Math.min(Math.pow(rnd, rnd), rnd*3.5);
      // console.log(iter, rnd);
      var ang =rnd*(2*Math.PI);

      var x = xx+rnd*Math.cos(ang);
      var y = yy+rnd*Math.sin(ang);
      p.x = x;
      p.y = y;
      return p;
    },
  debug: function(arr, clr){
    var ctx = _App.ctx;
    ctx.save();
    arr.forEach(function(e,i){
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle=clr;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 2, 0, Math.PI*2);
      ctx.stroke();
    });
    ctx.restore();
  }
}


_App.PRNG = {
  initSeed: function(s){
    this._seed = s % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  },
  newOne: function () {
    return this._seed = this._seed * 16807 % 2147483647;
  },
  getRandom:function(){
    return Math.random();
    return (this.newOne() - 1) / 2147483646;
  }
}
//
_App.init();
