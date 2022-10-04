import useControlSocket from 'hooks/useControlSocket';
import CommonLayout from 'layouts/CommonLayout';
import { ReactElement } from 'react';

function ControlSlave(): ReactElement {
  const { isConnected, lastPong, play } = useControlSocket();
  return (
    <CommonLayout>
      <div>
        <p>{`Connected: ${isConnected}`}</p>
        <p>{`Last pong: ${lastPong || '-'}`}</p>
        <p>{`Play: ${play}`}</p>
      </div>
    </CommonLayout>
  );
}

export default ControlSlave;
