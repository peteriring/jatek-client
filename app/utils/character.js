/* global PIXI */
import Animation from './animation';
import library from './library';

export default class Character extends Animation {
  static UID() {
    return 'Character';
  }

  constructor(SpriteLoader, Controls) {
    const { src, json } = library['char2.png'];
    super(src, json);
    this.speed = 5;
    this.Controls = Controls;
    Controls.on('move', data => this.move(data));
    // const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    // console.log({ colorMatrix })
    // this.filters = [colorMatrix];
    // colorMatrix.toBGR(2); this.tint = Math.random() * 0xFFFFFF;
  }

  move(target) {
    const dist = ((target.y - this.y) ** 2) + ((target.x - this.x) ** 2);
    if (dist < this.speed * this.speed) {
      this.x = target.x;
      this.y = target.y;
      this.Controls.stop();
      const nextFrame = (7 * 8) + this.orientation;
      this.goto(nextFrame);
    } else {
      const phi = Math.atan2(target.y - this.y, target.x - this.x);
      this.orientation = Math.floor(((-phi + Math.PI) / (Math.PI / 4)) + 7.5) % 8;
      const nextFrame = (this.orientation * 7) + ((this.currentFrame + 0.2) % 7);
      this.goto(nextFrame);
      this.x += this.speed * Math.cos(phi);
      this.y += this.speed * Math.sin(phi);
    }
  }

  refresh(delta) {
    super.refresh(delta);
  }
}
