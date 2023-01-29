import Lottie from '@components/Lottie';
import palmLottie from '@public/palm-lottie.json';
import seaWavesLottie from '@public/sea-waves.json';
import { CONFIGS } from 'configs';
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
          <Lottie animationData={palmLottie} width="70px" height="70px" />
          <b>{CONFIGS.title}</b>
        </Link>
        <div className="desc">{CONFIGS.description}</div>
      </div>
    </div>
    <style jsx>{style}</style>
  </header>
);
