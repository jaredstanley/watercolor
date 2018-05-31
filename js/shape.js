import utils from './utils';
//static class variables (internal)
//global (to this module)
const maxPoints= 10000;


function createBaseShape(s) {
  // console.log("createBaseShape");
  // console.log(this.shapes["shapeArr_0"]);
  for (var i = 0; i < 4; i++) {
      s.subdivisions++;
      // console.log(i,subdivisions, s.shapes);
      s.shapes["shapeArr_"+s.subdivisions] = s.subDivide(s.shapes["shapeArr_"+i], i);
  }
  s.baseShape = s.shapes["shapeArr_"+s.subdivisions].slice();
  s.shapes = {};
  s.subdivisions = 0;
}
// new
class Shape {
  constructor(app, obj, s) {
    // console.log(obj);
    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.color = obj.color;
    this.scale = s.scale;
    this.randomness = s.randomness;
    this.shapes = { shapeArr_0: [] };
    this.createStartingPoints(obj);
    createBaseShape(this);
  }
  createStartingPoints(obj) {
    // console.log(obj);
    if(obj.type.ngon==true){
      let num_pts = obj.type.pointcount;
      let ang = 0;
      let rad = this.app.w*this.scale;
      let step = (2*Math.PI)/num_pts;
      for (var i = 0; i < num_pts; i++) {
        var _x = this.app.centerw+Math.cos(ang)*rad*utils.getRandom();
        var _y = this.app.centerh+Math.sin(ang)*rad;
        ang+=step;
        this.shapes.shapeArr_0.push({x:_x, y:_y});
      }
    }else{
      for (var i = 0; i < obj.points.length; i++) {
        this.shapes.shapeArr_0.push(obj.points[i]);
      }
    }

  }

  subDivide(arr) {
    // console.log("subdivide", arr);
    var tmparr=arr.slice();
    var newArr = [];
    for (var i = 0; i < tmparr.length; i++) {
      if(i==0){
        //*|* first one
        newArr.push(tmparr[i]);
      }else{
        //*|* main loop
        var newPt = utils.createNewPoint(tmparr[i], tmparr[i-1], this.randomness);
        //push new point, then push older existing point
        newArr.push(newPt);
        newArr.push(arr[i]);
      }
    }
    //*|* last one! Wrap back to connect to the first point at the end of the loop
    var newPt = utils.createNewPoint(arr[arr.length-1], arr[0], this.randomness);
    newArr.push(newPt);

    return newArr;
  }
  generateLayer(pos) {
    // console.log("generateLayer");
    var tmparr = this.baseShape.slice();

    for (var i = 0; i < 3; i++) {
      tmparr = this.subDivide(tmparr);
    }

    this.shapes["shapeArr_"+pos]=tmparr.slice();
  }
  drawShape(_arr) {
      this.app.ctx.fillStyle=this.color;
      this.app.ctx.strokeStyle=this.color;
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

}
export default Shape;
