/* global PIXI */
import Animation from './animation';
import library from './library';
import Character from './character';

export default class Displayer {
  static UID() {
    return 'Displayer';
  }

  get(id, options) {
    const { $socket, controls } = options || {};
    const { src, json } = library['char2.png'];
    const hash = Math.random();
    const result = (controls) ? new Character($socket, controls) : new Animation(src, json);
    result.id = id || hash;
    return result;
  }
}
