import { Button } from '@mui/material';
import useControlSocket from 'hooks/useControlSocket';
import CommonLayout from 'layouts/CommonLayout';
import { ReactElement } from 'react';

function ControlMaster(): ReactElement {
  const { isConnected, lastPong, play, sendPing, sendPlay } =
    useControlSocket();

  return (
    <CommonLayout>
      <div>
        <p>{`Connected: ${isConnected}`}</p>
        <p>{`Last pong: ${lastPong || '-'}`}</p>
        <p>{`Play: ${play}`}</p>
        <Button variant="outlined" onClick={sendPing}>
          Ping
        </Button>
        <Button variant="outlined" onClick={sendPlay}>
          Play
        </Button>
      </div>
    </CommonLayout>
  );
}

export default ControlMaster;
