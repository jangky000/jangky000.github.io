import { HTMLProps, ReactNode } from 'react';
import { style } from './style';

const colors = {
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
  label: 'new' | 'reference' | 'summary';
  children: ReactNode;
}
export const Label = ({ label, children }: LabelProps) => (
  <span>
    {children}
    <style jsx>{style}</style>
    <style jsx>
      {`
        span {
          background-color: ${colors[label].bgc};
          color: ${colors[label].c};
        }
      `}
    </style>
  </span>
);
