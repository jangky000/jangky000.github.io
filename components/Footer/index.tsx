import { CONFIGS } from 'configs';
import { style } from './style';

export const Footer = () => (
  <>
    <footer>
      <div className="copyright">
        Copyright 2021. {CONFIGS.author} all rights reserved.
      </div>
      <style jsx>{style}</style>
    </footer>
  </>
);
