import Lottie from '@components/Lottie';
import ThemeSwitch from '@components/ThemeSwitch';
import palmLottie from '@public/palm-lottie.json';
import seaWavesLottie from '@public/sea-waves.json';
import { CONFIGS } from 'configs';
import { HomeLink, StyledHeader } from './style';

export const Header = () => (
  <StyledHeader>
    <ThemeSwitch className="theme-switch" />
    <div className="wrapper">
      <div className="lottie-wrapper">
        <Lottie animationData={seaWavesLottie} width="100%" height="100%" />
      </div>
      <div className="title">
        <HomeLink href="/">
          <Lottie animationData={palmLottie} width="70px" height="70px" />
          <b>{CONFIGS.title}</b>
        </HomeLink>
        <div className="desc">{CONFIGS.description}</div>
      </div>
    </div>
  </StyledHeader>
);
