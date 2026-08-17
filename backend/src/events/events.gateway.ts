import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.emitOnlineCount();
  }

  handleDisconnect(client: Socket) {
    const rooms = [...client.rooms].filter((r) => r.startsWith('movie:'));
    setImmediate(() => {
      rooms.forEach((room) => this.emitWatchCount(room));
      this.emitOnlineCount();
    });
  }

  @SubscribeMessage('watch:join')
  onWatchJoin(@ConnectedSocket() client: Socket, @MessageBody() body: { movieId: number }) {
    const room = `movie:${body?.movieId}`;
    client.join(room);
    this.emitWatchCount(room);
  }

  @SubscribeMessage('watch:leave')
  onWatchLeave(@ConnectedSocket() client: Socket, @MessageBody() body: { movieId: number }) {
    const room = `movie:${body?.movieId}`;
    client.leave(room);
    this.emitWatchCount(room);
  }

  emitReviewCreated(payload: unknown) {
    this.server.emit('review:created', payload);
  }

  emitImportDone(payload: { imported: number }) {
    this.server.emit('import:done', payload);
  }

  private emitOnlineCount() {
    this.server.emit('online:count', this.server.sockets.sockets.size);
  }

  private emitWatchCount(room: string) {
    const count = this.server.sockets.adapter.rooms.get(room)?.size ?? 0;
    this.server.to(room).emit('watch:count', { room, count });
  }
}
