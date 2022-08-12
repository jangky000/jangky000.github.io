import { Label } from '@components/Label';
import { StyledCard } from './style';

interface Props {
  thumbnail: string;
  title: string;
  tagList: string[];
}
function Card({ thumbnail, title, tagList }: Props) {
  // const handleImgError = (e) => {
  //   e.target.src = '/favicon.ico';
  // };

  return (
    <StyledCard>
      <div className="thumbnail">
        <img
          src={thumbnail}
          alt={title}
          // onError={handleImgError}
        />
      </div>
      <div className="title">{title}</div>
      <div className="tag-list">
        {tagList.map(tag => (
          <Label label="reference"># {tag}</Label>
        ))}
      </div>
    </StyledCard>
  );
}

export default Card;
