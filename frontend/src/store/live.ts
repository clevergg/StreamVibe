import { io, type Socket } from 'socket.io-client';
import { create } from 'zustand';
import type { Review } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:4000';

interface LiveState {
  connected: boolean;
  online: number;
  watching: number;
  lastReview: Review | null;
  connect: () => void;
  joinMovie: (movieId: number) => void;
  leaveMovie: (movieId: number) => void;
  clearLastReview: () => void;
}

let socket: Socket | null = null;

export const useLiveStore = create<LiveState>((set) => ({
  connected: false,
  online: 0,
  watching: 0,
  lastReview: null,

  connect: () => {
    if (socket) return;
    socket = io(WS_URL, { transports: ['websocket'] });

    socket.on('connect', () => set({ connected: true }));
    socket.on('disconnect', () => set({ connected: false, online: 0 }));
    socket.on('online:count', (count: number) => set({ online: count }));
    socket.on('watch:count', (data: { count: number }) => set({ watching: data.count }));
    socket.on('review:created', (review: Review) => set({ lastReview: review }));
  },

  joinMovie: (movieId) => {
    socket?.emit('watch:join', { movieId });
  },

  leaveMovie: (movieId) => {
    socket?.emit('watch:leave', { movieId });
    set({ watching: 0 });
  },

  clearLastReview: () => set({ lastReview: null }),
}));
