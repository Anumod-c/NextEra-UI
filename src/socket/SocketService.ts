import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      upgrade: false,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        this.socket.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
    });
  }

  joinRoom(courseId: string) {
    this.socket.emit('joinRoom', courseId);
  }

  leaveRoom(courseId: string | null) {
    if (courseId) {
      this.socket.emit('leaveRoom', courseId);
    }
  }

  sendMessage(courseId: string, message: { userId: string; text: string }) {
    this.socket.emit('sendMessage', { courseId, message });
  }

  sendImage(courseId: string, imageMessage: { userId: string; image: string }) {
  this.socket.emit('sendImage', { courseId, imageMessage });
}

  onMessage(callback: (message: { userId: string; text: string; image:string; courseId: string }) => void) {
    this.socket.on('receiveMessage', callback);
  }

  loadPreviousMessages(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  removeMessageListener(callback: (message: { userId: string; image:string; text: string; courseId: string }) => void) {
    this.socket.off('receiveMessage', callback);
  }
}

export default new SocketService();
