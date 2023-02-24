import { StyledAnchorList, StyledGithubIcon } from './style';

interface Props {
  urls: string[];
}
function AnchorList({ urls }: Props) {
  return (
    <StyledAnchorList>
      {urls.map(url => {
        return (
          <li key={url}>
            <a href={url}>
              <StyledGithubIcon>
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="github-icon"
                />
                <div className="title">GitHub</div>
              </StyledGithubIcon>
              <div>{url}</div>
            </a>
          </li>
        );
      })}
    </StyledAnchorList>
  );
}

export default AnchorList;
