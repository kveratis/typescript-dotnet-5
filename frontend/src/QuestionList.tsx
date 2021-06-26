import React from 'react';
import Question from './Question';
import { QuestionData } from './QuestionsData';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

const QuestionList = ({ data, renderItem }: Props) => (
  <ul>
    {data.map((question) => (
      <li key={question.questionId}>
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);

export default QuestionList;
