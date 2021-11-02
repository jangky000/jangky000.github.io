import Link from 'next/link';
// import Image from 'next/image';
// import LogoPic from '../../../public/logo.svg';
import { style } from './style';

export const Header = () => (
  <header>
    {/* header */}
    <div className="wrapper">
      <div className="title">
        <Link href="/">
          <a>
            {/* <Image src={LogoPic} alt="logo" width={32} height={32} /> */}
            <h1>FE 블로그</h1>
          </a>
        </Link>
        <div className="desc">FE 개발자로 일하면서 겪은 경험담을 정리합니다.</div>
      </div>
    </div>
    <style jsx>{style}</style>
  </header>
);
