import { removeSpace } from 'libs/utf8';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Post } from 'types/post';
import { StyledPostList } from './style';

interface PostListProps {
  postList: Post[];
}
const PostList = ({ postList }: PostListProps): ReactElement => {
  return (
    <StyledPostList>
      {postList.map(post => (
        <div key={post.id} className="post-item">
          <h2>
            <Link
              href="/posts/[title]"
              as={`/posts/${removeSpace(post.title)}`}
            >
              {post.title}
            </Link>
            <small>{post.date}</small>
          </h2>
          <div className="desc">
            <Link
              href="/posts/[title]"
              as={`/posts/${removeSpace(post.title)}`}
            >
              {post.desc}
            </Link>
          </div>
        </div>
      ))}
    </StyledPostList>
  );
};

export default PostList;
