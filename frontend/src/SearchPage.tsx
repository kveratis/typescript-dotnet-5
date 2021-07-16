/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from './Page';
import QuestionList from './QuestionList';
import { QuestionData, searchQuestions } from './QuestionsData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      if (!cancelled) {
        setQuestions(foundResults);
      }
    };
    doSearch(search);
    return () => {
      cancelled = true;
    };
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
