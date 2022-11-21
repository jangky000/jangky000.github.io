import { Label } from '@components/Label';
import { StyledCard, StyledEmptyImage } from './style';

interface Props {
  thumbnail?: string;
  title: string;
  tagList: string[];
}
function Card({ thumbnail, title, tagList }: Props) {
  // const handleImgError = (e) => {
  //   e.target.src = '/favicon.ico';
  // };

  const renderImage = () =>
    thumbnail ? (
      <img
        src={thumbnail}
        alt={title}
        // onError={handleImgError}
      />
    ) : (
      <StyledEmptyImage />
    );

  return (
    <StyledCard>
      <div className="thumbnail">{renderImage()}</div>
      <div className="title">{title}</div>
      <div className="tag-list">
        {tagList.map(tag => (
          <Label key={tag} label="reference">
            # {tag}
          </Label>
        ))}
      </div>
    </StyledCard>
  );
}

export default Card;
