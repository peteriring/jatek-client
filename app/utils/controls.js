import EventEmitter from 'events';

export default class Controls extends EventEmitter {
  static UID() {
    return 'Controls';
  }

  constructor($log, $interval, Application) {
    super();
    const cache = {
      target: {},
      promise: null,
      refreshrate: 1000 / 60,
    };
    Application.view.addEventListener('mousedown', (event) => {
      if (event.buttons !== 1) return this.stop();
      cache.mousedown = true;
      cache.target.x = event.clientX - Application.stage.x;
      cache.target.y = event.clientY - Application.stage.y;
      if (!cache.promise) {
        return Object.assign(cache, {
          promise: $interval(() => this.emit('move', cache.target), cache.refreshrate),
        });
      }
      return null;
    });
    Application.view.addEventListener('mouseenter', (event) => {
      if (event.buttons !== 1) return this.stop();
      cache.mousedown = true;
      cache.target.x = event.clientX - Application.stage.x;
      cache.target.y = event.clientY - Application.stage.y;
      if (!cache.promise) {
        return Object.assign(cache, {
          promise: $interval(() => this.emit('move', cache.target), cache.refreshrate),
        });
      }
      return null;
    });
    Application.view.addEventListener('mouseup', () => {
      cache.mousedown = false;
    });
    Application.view.addEventListener('mouseleave', () => {
      cache.mousedown = false;
    });
    Application.view.addEventListener('mousemove', (event) => {
      if (!cache.mousedown) return;
      cache.target.x = event.clientX - Application.stage.x;
      cache.target.y = event.clientY - Application.stage.y;
    });
    this.stop = () => {
      if (cache.mousedown) return;
      $interval.cancel(cache.promise);
      cache.promise = null;
    };
    document.addEventListener('keypress', () => {
      cache.mousedown = false;
      this.stop();
      $log.debug('keypress');
    });
  }

  destructor() {
    Object.assign(this, {});
  }
}
