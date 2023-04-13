import Image from 'next/image';
import { ReactElement } from 'react';

interface Props {
  width?: number;
  height?: number;
}

function Celebration(props: Props): ReactElement {
  const scale = 2;
  const { width = 123 * scale, height = 94.09 * scale } = props;

  return (
    <Image
      src="/svg/celebration.svg"
      alt="celebration"
      width={width}
      height={height}
    />
  );
}

export default Celebration;
