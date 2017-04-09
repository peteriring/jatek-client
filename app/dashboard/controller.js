/* global PIXI */

export default class controller {
  static get UID() {
    return 'DashboardController';
  }

  constructor($log, $element, Controls, Application, Character) {
    $log.debug('DashboardController');

    $element.find('div').append(Application.view);

    Application.stage.x = (Application.renderer.width / 2);
    Application.stage.y = (Application.renderer.height / 2);

    Controls.on('move', () => {
      Application.stage.x = -Character.x + (Application.renderer.width / 2);
      Application.stage.y = -Character.y + (Application.renderer.height / 2);
    });
    Application.ticker.add((delta) => {
      Application.stage.children.sort(this.compare);
      Application.stage.refresh(delta);
    });
  }

  compare = (a, b) => (a.y > b.y);
}
