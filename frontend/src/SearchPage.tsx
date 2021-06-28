/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  searchingQuestionsAction,
  searchedQuestionsAction,
} from './Store';
import Page from './Page';
import QuestionList from './QuestionList';
import { searchQuestions } from './QuestionsData';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const questions = useSelector((state: AppState) => state.questions.searched);
  const search = searchParams.get('criteria') || '';
  useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
  }, [search]);
  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for &quot;{search}&quot;
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};

export default SearchPage;
