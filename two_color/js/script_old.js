
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
    this.centerw = this.centerh = 100;
    this.ctx = _App.canvas.getContext("2d");
    //
    // this.ctx.globalCompositeOperation = "hard-light";
    this.color = "rgba(250,50,255,0.025)";
    // this.color1 = "rgba(250,50,255,0.023)";
    // this.color2 = "rgba(0,111,122,0.023)";
    this.color1 = "rgba(255,0,0,0.019)";
    this.color2 = "rgba(255,255,0,0.0191)";
    this.initialPoints = 4;
    //
    _App.ShapeMgr.init();
  }
}

_App.ShapeMgr = {
  subdivisions: 0,
  totalPoints:0,
  maxPoints:1000000,

  init: function(){
    console.log("_App.ShapeMgr.init");

    this.shapes={ shapeArr_0: []};
    this.createInitialShape();
    // console.log(_App.PRNG.getRandom());


    for (var i = 0; i < 17; i++) {
      if(this.totalPoints<this.maxPoints){
        this.subDivide(this.shapes["shapeArr_"+i]);
        this.drawShape(i);
      }else{
        console.log(this.totalPoints,"hey we're jammed up w a ton of points so gonna chill rn");
      }

    }

  },
  drawShape: function(i){
    // console.log("ShapeMgr.drawShape:", this.subdivisions+"shapes", this.shapes["shapeArr_"+i].length+" points most complex shape,", this.shapes["shapeArr_"+this.subdivisions].length+"total points drawn");
      // _App.ctx.fillStyle=_App.color;
      let grad = _App.ctx.createLinearGradient(_App.PRNG.getRandom()*_App.w,_App.PRNG.getRandom()*_App.h,_App.PRNG.getRandom()*_App.w,_App.PRNG.getRandom()*_App.h);
      grad.addColorStop(0,_App.color1);
      grad.addColorStop(1,_App.color2);

      _App.ctx.fillStyle=grad;
      // _App.ctx.fillStyle= "rgba(250,"+Math.round(Math.random()*255)+",255,0.025)";

      _App.ctx.beginPath();
      var _arr = this.shapes["shapeArr_"+i];
      _App.ctx.moveTo(_arr[0].x+_App.centerw, _arr[0].y+_App.centerh);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        _App.ctx.lineTo(itm.x, itm.y);
      }
      _App.ctx.fill();
  },
  subDivide: function(arr){
    // console.log("subdivide");
    this.subdivisions++;
    var tmparr=arr.slice();
    var newArr = [];
    for (var i = 0; i < tmparr.length; i++) {
      if(i==0){
        //*|* first one
        newArr.push(tmparr[i]);
      }else{
        //*|* main loop
        var newPt = _App.Utils.createNewPoint(tmparr[i], tmparr[i-1]);
        //push new point, then push older existing point
        newArr.push(newPt);
        newArr.push(arr[i]);
      }
    }
    //*|* last one! Wrap back to connect to the first point at the end of the loop
    var newPt = _App.Utils.createNewPoint(arr[arr.length-1], arr[0]);
    newArr.push(newPt);
    this.shapes["shapeArr_"+this.subdivisions] = newArr.slice();
    this.totalPoints+=newArr.length;
    newArr=[];

  },
  createInitialShape: function(){
    for (var i = 0; i < _App.initialPoints; i++) {
      var itm = {
        x:_App.PRNG.getRandom()*_App.w,
        y:_App.PRNG.getRandom()*_App.h
      }
      this.shapes.shapeArr_0.push(itm);
    }
    var squarr = [{x:10, y:10},{x:330, y:10},{x:330, y:210},{x:10, y:210}];
    // this.shapes.shapeArr_0 = squarr;
  }

}

_App.Utils = {
  createNewPoint: function(p1, p2){
      var diminish = _App.ShapeMgr.subdivisions;
      // diminish = 0;
      var p = {};
      var xx =(p1.x+p2.x) / 2;
      var yy = (p1.y+p2.y) / 2;
      var rrr = _App.PRNG.getRandom()*(20-diminish);
      var ang =rrr*(2*Math.PI);
      var x = xx+rrr*Math.cos(ang);
      var y = yy+rrr*Math.sin(ang);
      p.x = x;
      p.y = y;
      return p;
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
    // return (this.newOne() - 1) / 2147483646;
  }


}

_App.init();
