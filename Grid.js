class Grid {
  constructor() {
    this.img = false;
    this.swatch = false;
    this.__bg = false;
    this.__fg = false;
    this.__str = false;
    this.__recursion = false;
    this.__super = false;
    this.sw = 0;
    this.sh = 0;
    this.px = function (x, y) {};
  }
  setImage(img) {
    this.img = img;
    this.w = img.width;
    this.h = img.height;
    this.px = function (x, y) {
      return this.img.get(x, y)[0];
    };
  }
  setBlk(blkOrWidth, blkHeight) {
    this.w = this.w || width;
    this.h = this.h || height;
    this.blk = blkOrWidth || 50;
    this.blk2 = this.blk / 2;
    this.blkWidth = blkOrWidth || this.blk;
    this.blkHeight = blkHeight || this.blkWidth;
    this.cols = floor(this.w / this.blkWidth) + 1;
    this.rows = floor(this.h / this.blkHeight) + 1;
  }
  setGrid(cols, rows) {
    this.cols = cols || this.cols || 10;
    this.rows = rows || this.rows || 10;
    this.spacing = this.spacing || 0;
    this.w = (this.w || width) - this.spacing;
    this.h = (this.h || height) - this.spacing;
    this.sw = this.spacing / this.cols;
    this.sh = this.spacing / this.rows;
    this.blkWidth = this.w / this.cols - this.sw;
    this.blkHeight = this.h / this.rows - this.sh;
  }
  setOrdering(order = "grid") {
    this.ordering = order;
  }
  setRecursion(func) {
    return (this.__recursion = func);
  }
  bg() {
    if (!this.__bg) {
      this.__bg = this.swatch.random();
    }
    return this.__bg;
  }
  fg() {
    if (!this.__fg) {
      this.__fg = this.swatch.random();
      while (this.__fg == this.__bg) {
        this.__fg = this.swatch.random();
      }
    }
    return this.__fg;
  }
  clr() {
    return this.swatch.random();
  }
  //enabled via setImage()
  // px(x,y){
  // 	return this.img.get(x,y)[0];
  // }
  render() {
    if (this.onSetup && !this.__setup) {
      this.onSetup();
      this.__setup = true;
    }
    this.x = this.x || 0;
    this.y = this.y || 0;

    this.yi = 0;
    this.xi = 0;
    this.xp = 0;
    this.yp = 0;
    push();
    translate(this.x, this.y);
    for (this.yp = 0; this.yp <= this.h; this.yp += this.blkHeight) {
      this.xi = 0;
      for (this.xp = 0; this.xp <= this.w; this.xp += this.blkWidth) {
        if (!this.onRecursion()) {
          this.onRenderItem(this.xp, this.yp, this.blkWidth, this.blkHeight);
        }
        this.xi++;
      }
      this.yi++;
    }
    pop();
    if (this.onFinish && !this.__finish) {
      this.onFinish();
      this.__finish = true;
    }
  }
  onSetup() {}
  onRenderItem(x, y, w, h) {}
  onFinish() {}
  onRecursion() {
    if (this.__recursion && this.__recursion.apply(this, [this.current])) {
      push();
      let r = new Grid();
      Object.assign(r, this);
      r.__super = this;
      r.x = this.xp;
      r.y = this.yp;
      r.w = this.blkWidth;
      r.h = this.blkHeight;
      r.setBlk(this.blkWidth * 0.5, this.blkHeight * 0.5);
      r.render();
      pop();
      return true;
    }
    return false;
  }
}
