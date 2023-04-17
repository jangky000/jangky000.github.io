import { useMediaQuery, useTheme } from '@mui/material';
import { GithubIcon, GithubLink } from './style';

interface Props {
  url: string;
}

function GithubCard({ url }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <GithubLink href={url} target="_blank">
      <GithubIcon>
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="github-icon"
        />
        <div className="title">GitHub</div>
      </GithubIcon>
      <div className="url">
        {isMobile ? url.replace('blob/master/issues/', '') : url}
      </div>
    </GithubLink>
  );
}

export default GithubCard;
