import { socket } from '@libs/socket';
import { useEffect, useState } from 'react';

function useControlSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState<string>();
  const [play, setPlay] = useState<boolean>(false);

  const sendPing = () => {
    socket.emit('ping');
  };

  const sendPlay = () => {
    socket.emit('play');
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnected', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('play ack', () => {
      setPlay(true);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return {
    isConnected,
    lastPong,
    play,
    sendPing,
    sendPlay,
  };
}

export default useControlSocket;
