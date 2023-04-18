import PostList from '@components/PostList';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import DIMENS from '@styles/dimens';
import usePostList from 'hooks/usePostList';
import CommonLayout from 'layouts/CommonLayout';
import { useState } from 'react';

const StyledWrapper = styled.div`
  margin: 30px auto;
  max-width: ${DIMENS.CONTENT_MAX_WIDTH};
`;

const StyledPostListSection = styled.div`
  label: post-section;
  .tab {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 0.5rem;
    width: fit-content;
  }

  .MuiTabPanel-root {
    padding: 0 0.5rem;
  }
`;

export function PostListSection() {
  const theme = useTheme();
  const postList = usePostList();
  const reviewList = postList.filter(
    post => post.category.indexOf('업무 회고') > -1,
  );
  const etcList = postList.filter(post => post.category.indexOf('기타') > -1);
  const [value, setValue] = useState('1');
  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <StyledPostListSection>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="post tab list"
          TabIndicatorProps={{
            style: { background: theme.colors.dark },
          }}
        >
          <Tab label={`모든 게시글(${postList.length})`} value="1" />
          <Tab label={`업무 회고(${reviewList.length})`} value="2" />
          <Tab label={`기타(${etcList.length})`} value="3" />
        </TabList>
        <TabPanel value="1">
          <PostList postList={postList} />
        </TabPanel>
        <TabPanel value="2">
          <PostList postList={reviewList} />
        </TabPanel>
        <TabPanel value="3">
          <PostList postList={etcList} />
        </TabPanel>
      </TabContext>
    </StyledPostListSection>
  );
}

function PostListPage() {
  return (
    <CommonLayout>
      <StyledWrapper>
        <PostListSection />
      </StyledWrapper>
    </CommonLayout>
  );
}

export default PostListPage;
