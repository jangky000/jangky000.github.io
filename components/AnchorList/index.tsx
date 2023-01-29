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
            <a href={url}>{url.slice(-10, -3)}</a>
          </li>
        );
      })}
    </StyledAnchorList>
  );
}

export default AnchorList;
