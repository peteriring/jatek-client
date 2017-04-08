/* global PIXI */

export default class FieldObject extends PIXI.Container {
  static UID() {
    return 'FieldObject';
  }

  constructor(obj) {
    super();
    Object.assign(this, { ...obj });
  }

  refresh(delta) {
    this.children.forEach(child => child.refresh && child.refresh(delta));
  }
}
