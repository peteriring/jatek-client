/* global PIXI, Image */
import library from './library';
import Sprite from './sprite';
import Animation from './animation';


export default class SpriteLoader {
  static UID() {
    return 'SpriteLoader';
  }
  get(path) {
    this.Sprite = PIXI.Sprite.fromImage;
    if (!SpriteLoader.cache[path]) {
      const { src, json } = library[path];
      if (json) return new Animation(src, json);
      const image = new Image();
      image.src = src;
      image.setAttribute('crossorigin', 'anonymous');
      const base = new PIXI.BaseTexture(image);
      const texture = new PIXI.Texture(base);
      PIXI.Texture.addTextureToCache(texture, path);
      SpriteLoader.cache[path] = texture;
    }
    return new Sprite(new this.Sprite(path));
  }
}
SpriteLoader.cache = {};
