import { Store, createStore, combineReducers } from 'redux';
import { QuestionData } from './QuestionsData';

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}

export interface AppState {
  readonly questions: QuestionsState;
}

const initialQuestionsState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

export const GETTING_UNANSWERED_QUESTIONS = 'GettingUnansweredQuestions';
export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTING_UNANSWERED_QUESTIONS,
  } as const);

export const GOT_UNANSWERED_QUESTIONS = 'GotUnansweredQuestions';
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOT_UNANSWERED_QUESTIONS,
    questions,
  } as const);

export const GETTING_QUESTION = 'GettingQuestion';
export const gettingQuestionAction = () =>
  ({
    type: GETTING_QUESTION,
  } as const);

export const GOT_QUESTION = 'GotQuestion';
export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOT_QUESTION,
    question,
  } as const);

export const SEARCHING_QUESTIONS = 'SearchingQuestions';
export const searchingQuestionsAction = () =>
  ({
    type: SEARCHING_QUESTIONS,
  } as const);

export const SEARCHED_QUESTIONS = 'SearchedQuestions';
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHED_QUESTIONS,
    questions,
  } as const);

type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

const questionsReducer = (
  state = initialQuestionsState,
  action: QuestionsActions,
) => {
  switch (action.type) {
    case GETTING_UNANSWERED_QUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_UNANSWERED_QUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case GETTING_QUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOT_QUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHING_QUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHED_QUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export default function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
