import Link from 'next/link';
import { style } from './style';

export const Header = () => (
  <header>
    <div className="wrapper">
      <div className="title">
        <Link href="/">
          <a>
            <h1>FE 블로그</h1>
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
