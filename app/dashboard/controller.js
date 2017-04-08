/* global PIXI */

export default class controller {
  static get UID() {
    return 'DashboardController';
  }

  constructor($log, $element, $socket, SpriteLoader, Controls, Application, Character) {
    $log.debug('DashboardController');
    $element.find('div').append(Application.view);
    const bunny = Character;
    const bunny2 = SpriteLoader.get('bunny.png');

    Application.stage.x = (Application.renderer.width / 2);
    Application.stage.y = (Application.renderer.height / 2);

    Application.stage.addChild(bunny);
    Application.stage.addChild(bunny2);

    Controls.on('move', () => {
      Application.stage.x = -bunny.x + (Application.renderer.width / 2);
      Application.stage.y = -bunny.y + (Application.renderer.height / 2);
    });

    $socket.on('refresh', (data) => console.log('refresh', data));

    Application.ticker.add((delta) => {
      Application.stage.refresh(delta);
      // Stage.stage.x += 1 * delta;
    });
  }
}
