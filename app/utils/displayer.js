/* global PIXI */
import Animation from './animation';
import library from './library';

export default class Displayer {
  static UID() {
    return 'Displayer';
  }

  get(id) {
    const { src, json } = library['char2.png'];
    const animation = new Animation(src, json);
    animation.id = id || Math.random();
    return animation;
  }
}
