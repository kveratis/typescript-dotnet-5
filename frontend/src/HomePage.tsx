import React, { useEffect, useState } from 'react';
import Page from './Page';
import PageTitle from './PageTitle';
import QuestionList from './QuestionList';
import { QuestionData, getUnansweredQuestions } from './QuestionsData';

const HomePage = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    console.log('TODO -  move to the Ask Page');
  };

  return (
    <Page>
      <div>
        <PageTitle>Unanswered Questions</PageTitle>
        <button type="button" onClick={handleAskQuestionClick}>
          Ask a question
        </button>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};

export default HomePage;
