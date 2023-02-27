import GithubCard from '@components/GithubCard';
import { StyledAnchorList } from './style';

interface Props {
  urls: string[];
}
function AnchorList({ urls }: Props) {
  return (
    <StyledAnchorList>
      {urls.map(url => {
        return (
          <li key={url}>
            <GithubCard url={url} />
          </li>
        );
      })}
    </StyledAnchorList>
  );
}

export default AnchorList;
