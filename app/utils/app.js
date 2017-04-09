/* global PIXI */

import FieldObject from './object';
import Controls from './controls';

export default class Application extends PIXI.Application {
  static UID() {
    return 'Application';
  }
  constructor(Displayer, $socket, $interval) {
    super(800, 600, { backgroundColor: 0x1099bb });
    Object.assign(this, {
      Displayer,
      char: Displayer.get(Math.random(), { $socket, controls: new Controls($interval, this) }),
      stage: new FieldObject(this.stage),
    });
    this.stage.addChild(this.char);
    $socket.emit('joined', { name: 'nick', gender: 'male', id: this.char.id });

    $socket.on('refresh', data => this.refresh(data));
    $socket.on('new player', data => this.newPlayer(data));
    $socket.on('joined', data => this.joined(data));
    $socket.on('disconnect', data => this.disconnect(data));
  }

  refresh(data) {
    console.log('refresh', data);
    const { char } = this;
    data.forEach((obj) => {
      if (obj.id === char.id) return;
      const child = this.stage.children.find(elem => elem.id === obj.id);
      if (!child) return;
      child.x = obj.x;
      child.y = obj.y;
      child.goto(obj.currentFrame || 56);
    });
  }
  newPlayer(data) {
    console.log('new player', data);
    const { char, Displayer } = this;
    if (data.id === char.id) return;
    const child = Displayer.get(data.id);
    this.stage.addChild(child);
    child.x = data.x;
    child.y = data.y;
  }
  joined(data) {
    console.log('joined', data);
    const { char, Displayer } = this;
    data.forEach((obj) => {
      if (obj.id === char.id) return;
      const child = Displayer.get(obj.id);
      this.stage.addChild(child);
      child.x = obj.x;
      child.y = obj.y;
      console.log(obj.id);
      child.goto(56);
    });
  }
  disconnect(data) {
    console.log('disconnect', data);
    const index = this.stage.children.findIndex((obj) => obj.id === data.id);
    this.stage.removeChildAt(index);
  }
}
