/* global PIXI */

export default class Sprite extends PIXI.Sprite {
  constructor(obj) {
    super();
    Object.assign(this, { ...obj });
  }

  refresh(delta) {
    this.children.forEach(child => child.refresh && child.refresh(delta));
  }
}
