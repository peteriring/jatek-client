/* global PIXI, Image */
import Sprite from './sprite';

const FromCanvas = PIXI.BaseTexture.fromCanvas;
const FromFrame = PIXI.Sprite.fromFrame;

export default class Animation extends Sprite {
  constructor(src, json) {
    super();
    const { offset = { x: 0, y: 0 } } = json.meta;
    const image = new Image();
    const callbacks = [];
    image.setAttribute('crossorigin', 'anonymous');
    image.src = src;
    this.frames = Object.keys(json.frames).map((key) => {
      const frame = json.frames[key].frame;
      const source = json.frames[key].spriteSourceSize;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = frame.w;
      canvas.height = frame.h;
      const texture = new PIXI.Texture(new FromCanvas(canvas, 1));
      callbacks.push(() => context.drawImage(image, -frame.x, -frame.y));
      PIXI.Texture.addTextureToCache(texture, key);
      const sprite = new Sprite(new FromFrame(key));
      const anchor = {
        x: ((-source.x - source.w) + offset.x) / (frame.w),
        y: ((-source.y - source.h) + offset.y) / (frame.h),
      };
      sprite.anchor.set(anchor.x, anchor.y);
      this.addChild(sprite);
      sprite.visible = false;
      return sprite;
    });
    image.onload = () => {
      callbacks.map(cb => cb());
      this.goto(56);
    };
  }
  goto(frame) {
    this.frames[Math.floor(this.currentFrame) || 0].visible = false;
    this.currentFrame = frame % this.frames.length;
    this.frames[Math.floor(this.currentFrame)].visible = true;
  }
}
