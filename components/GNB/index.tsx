import Link from 'next/link';
import { StyledGNB } from './style';

export const GNB = () => {
  const navList = [
    { key: 'home', label: '홈', path: '/' },
    { key: 'galleries', label: '갤러리', path: '/galleries' },
  ];
  return (
    <StyledGNB>
      {navList.map(nav => (
        <Link key={nav.key} href={nav.path}>
          {nav.label}
        </Link>
      ))}
    </StyledGNB>
  );
};
