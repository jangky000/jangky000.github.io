import { Button } from '@mui/material';
import CommonLayout from 'layouts/CommonLayout';
import Link from 'next/link';

function Controls() {
  return (
    <CommonLayout>
      <div>
        <Link href="/controls/master">
          <Button variant="outlined">마스터</Button>
        </Link>
        <Link href="/controls/slave">
          <Button variant="outlined">슬레이브</Button>
        </Link>
      </div>
    </CommonLayout>
  );
}

export default Controls;
