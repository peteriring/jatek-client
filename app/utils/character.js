/* global PIXI */
import Animation from './animation';
import library from './library';

export default class Character extends Animation {
  static UID() {
    return 'Character';
  }

  constructor(SpriteLoader, Controls, $socket) {
    const { src, json } = library['char2.png'];
    super(src, json);
    this.speed = 5;
    this.Controls = Controls;
    this.$socket = $socket;
    Controls.on('move', data => this.move(data));
    Controls.on('spellcast', data => this.cast(data));
    Controls.on('idle', data => this.idle(data));
    this.id = Math.random();
    $socket.emit('joined', { name: 'asd', gender: 'male', id: this.id });
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
    this.$socket.emit('refresh', { x: this.x, y: this.y, currentFrame: this.currentFrame, id: this.id });
  }
  cast() {
    const fixed = 8 * 8 + this.orientation * 3;
    const counter = Math.max(this.currentFrame - fixed, 0);
    const nextFrame = fixed + ((counter + 0.2) % 3);
    this.goto(nextFrame);
    this.$socket.emit('refresh', { x: this.x, y: this.y, currentFrame: this.currentFrame, id: this.id });
  }
  idle() {
    // this.$socket.emit('spellcast', { x: this.x, y: this.y, currentFrame: this.currentFrame });
    this.goto((7 * 8) + this.orientation);
  }

  refresh(delta) {
    super.refresh(delta);
  }
}
