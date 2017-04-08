/* global PIXI */

export default class controller {
  static get UID() {
    return 'DashboardController';
  }

  constructor($log, $element, $socket, SpriteLoader, Controls, Application, Character, Displayer) {
    $log.debug('DashboardController');

    $element.find('div').append(Application.view);
    const char = Character;

    Application.stage.x = (Application.renderer.width / 2);
    Application.stage.y = (Application.renderer.height / 2);

    Application.stage.addChild(char);

    Controls.on('move', () => {
      Application.stage.x = -char.x + (Application.renderer.width / 2);
      Application.stage.y = -char.y + (Application.renderer.height / 2);
    });
    $socket.on('refresh', (data) => {
      console.log('refresh', data);
      data.forEach((obj) => {
        if (obj.id === Character.id) return;
        const child = Application.stage.children.find(elem => elem.id === obj.id);
        if (!child) return;
        child.x = obj.x;
        child.y = obj.y;
        child.goto(obj.currentFrame);
      });
    });
    $socket.on('new player', (data) => {
      console.log('NEW PLAYER', data);
      if (data.id === Character.id) return;
      const child = Displayer.get(data.id);
      Application.stage.addChild(child);
      child.x = data.x;
      child.y = data.y;
    });
    $socket.on('joined', (data) => {
      console.log('joined', data);
      data.forEach((obj) => {
        if (obj.id === Character.id) return;
        const child = Displayer.get(obj.id);
        Application.stage.addChild(child);
        child.x = obj.x;
        child.y = obj.y;
        child.goto(obj.currentFrame);
      });
    });

    Application.ticker.add((delta) => {
      Application.stage.refresh(delta);
      // Stage.stage.x += 1 * delta;
    });
  }
}
