import { ReactNode } from 'react';
import { StyledSubTitle } from './style';

interface Props {
  children?: ReactNode;
}
function SubTitle({ children }: Props) {
  return <StyledSubTitle>{`${children} !!`}</StyledSubTitle>;
}

export default SubTitle;
