import { Button } from '@material-ui/core';
import CommonLayout from 'layouts/CommonLayout';
import { ReactElement } from 'react';

function ControlMaster(): ReactElement {
  return (
    <CommonLayout>
      <div>
        <Button variant="outlined">Ping</Button>
        <Button variant="outlined">Play</Button>
      </div>
    </CommonLayout>
  );
}

export default ControlMaster;
