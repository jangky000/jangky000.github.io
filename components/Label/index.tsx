import { HTMLProps, ReactNode } from 'react';
import { style } from './style';

const Colors = {
  new: {
    bgc: '#ec2F4B',
    c: '#fff',
  },
  reference: {
    bgc: '#009FFF',
    c: '#fff',
  },
  summary: {
    bgc: '#FFB75E',
    c: '#fff',
  },
};

interface LabelProps extends HTMLProps<HTMLButtonElement> {
  label: keyof typeof Colors;
  children: ReactNode;
}
export const Label = ({ label, children }: LabelProps) => (
  <span>
    {children}
    <style jsx>{style}</style>
    <style jsx>
      {`
        span {
          background-color: ${Colors[label].bgc};
          color: ${Colors[label].c};
        }
      `}
    </style>
  </span>
);
