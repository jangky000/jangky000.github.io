import { Post } from 'types/post';
import postList from '../jsons/posts.json';

const usePostList = (): Post[] => {
  return postList || [];
};

export default usePostList;
