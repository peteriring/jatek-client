import SocketIO from 'socket.io-client';

export default class Socket {
  static UID() {
    return '$socket';
  }

  constructor(ENV) {
    this.socket = SocketIO(ENV.socketUrl);
  }

  on() {
    this.socket.on(arguments);
  }

  emit() {
    this.socket.emit(arguments);
  }
}
