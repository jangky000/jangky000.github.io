import Lottie from '@components/Lottie';
import Link from 'next/link';
import seaWavesLottie from '@public/sea-waves.json';
import palmLottie from '@public/palm-lottie.json';
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
            <b>FE 블로그</b>
          </a>
        </Link>
        <div className="desc">
          FE 개발자로 일하면서 겪은 경험담을 정리합니다.
        </div>
      </div>
    </div>
    <style jsx>{style}</style>
  </header>
);
