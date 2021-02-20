//https://pdfs.semanticscholar.org/5329/45da714768a106096cf2537293a012898a0e.pdf?_ga=2.66342185.60090947.1598500660-609679664.1598500660
let img, canvas, pp;

function preload() {
  // img = loadImage("frida.jpg");
  // img = loadImage("Che.PNG");
  // img = loadImage("rbg2.jpg");
  img = loadImage("mona.jpg");
  // img = loadImage("Abraham-Lincoln.jpg");
  // img = loadImage("Muybridge_race_horse_animated.gif");
  // img = loadImage("Frankenstein.jpg");
  // img = loadImage("cpas.png");
}

function setup() {
  // img.resize(0,height)
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas = createCanvas(img.width,img.height)
  img.resize(0, windowHeight);
  // background(0);
  // background(255)

  img.filter(BLUR, 10);

  fill(0);
  noStroke();

  // noiseSeed(3)
  // image(img,0,0)

  pp = new Grid();
  pp.setImage(img);
  pp.setBlk(10);
  pp.onSetup = function () {
    // this.engine = new HalfMoons();
    // this.engine = new Arcs();
    // this.engine = new RoundedSquares();
    // this.engine = new BrushLines();
    // this.engine = new QuadraticSquares();
    // this.engine = new Leafs2();
    // this.engine = new Leafs3();
    // this.engine = new QuadraticCorners();
    // this.engine = new AngledLines();
    // this.engine = new AngledLines2();
    // this.engine = new AngledLines3();
    // this.engine = new AngledQuads();
    // this.engine = new AngledTriangles();
    // this.engine = new PlayStation();
    // this.engine = new CairoPentagons();
    // this.engine = new HandyLines();
    // this.engine = new Triangle3();
    // this.engine = new Triangle4();
    // this.engine = new Rect3d();
    // this.engine = new SideTriangles();
    // this.engine = new Quads();
    // this.engine = new QuadraticLeafs();
    // this.engine = new SquaredDiamonds();
    // this.engine = new Knots();
    // this.engine = new MultCircle();
    // this.engine = new Donuts();
    // this.engine = new Diamonds();
    // this.engine = new Squares();
    // this.engine = new Circles();
    // this.engine = new Pluses();
    // this.engine = new Crosses();
    // this.engine = new Lines();
    // this.engine = new DoubleDots();
    this.engine = new LineBlock();
    // this.engine = new SpeechBlocks();
    // this.engine.intensityTarget = 150;
    this.engine.grid = this;
    Object.assign2(this.engine, this, ["rows", "cols"]);
    // console.log(this.engine.content.length)
    this.engine.setImage(this.img);
    // this.setBlk(sqrt(this.w*this.h / this.engine.content.length))
    this.engine.setBlk(this.blk);
    this.img.resize(0, this.rows);
    if (this.engine.onSetup && !this.engine.__setup) {
      this.engine.onSetup();
      this.engine.__setup = true;
    }
  };

  pp.onRenderItem = function (x, y) {
    push();
    translate(x, y);
    this.engine.xi = this.xi;
    this.engine.yi = this.yi;
    this.engine.xp = this.xp;
    this.engine.yp = this.yp;
    this.engine.intensity = this.px(this.xi, this.yi);
    this.engine.render();
    pop();
  };

  noLoop();
}

function draw() {
  // background(255)
  pp.render();
  // pp.img.nextFrame();
}

function mousePressed() {
  saveCanvas(canvas, "TruchetTile", "png");
}

p5.Image.prototype.nextFrame = function () {
  let f = this.getCurrentFrame();
  if (f >= img.numFrames() - 1) {
    f = -1;
  }
  return this.setFrame(++f);
};

Object.prototype.assign2 = function (target, source, props) {
  for (let p of props) {
    target[p] = source[p];
  }
};

function $() {
  console.log(Array.prototype.join.apply(arguments, [" | "]));
}
