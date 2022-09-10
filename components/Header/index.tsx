import Lottie from '@components/Lottie';
import palmLottie from '@public/palm-lottie.json';
import seaWavesLottie from '@public/sea-waves.json';
import { config } from 'config';
import Link from 'next/link';
import { style } from './style';

export const Header = () => (
  <header>
    <div className="wrapper">
      <div className="lottie-wrapper">
        <Lottie animationData={seaWavesLottie} width="100%" height="100%" />
      </div>
      <div className="title">
        <Link href="/">
          <a>
            <Lottie animationData={palmLottie} width="70px" height="70px" />
            <b>{config.title}</b>
          </a>
        </Link>
        <div className="desc">{config.description}</div>
      </div>
    </div>
    <style jsx>{style}</style>
  </header>
);
