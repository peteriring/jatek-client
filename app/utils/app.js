/* global PIXI */

import FieldObject from './object';

export default class Application extends PIXI.Application {
  static UID() {
    return 'Application';
  }
  constructor() {
    super(800, 600, { backgroundColor: 0x1099bb });
    this.stage = new FieldObject(this.stage);
  }
}
