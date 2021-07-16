using QandA.Data.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace QandA.Data
{
    public interface IDataRepository
    {
        IEnumerable<QuestionGetManyResponse> GetQuestions();
        IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers();
        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);
        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search, int pageNumber, int pageSize);
        IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions(int pageNumber, int pageSize);
        Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync(int pageNumber, int pageSize);
        QuestionGetSingleResponse GetQuestion(int questionId);
        Task<QuestionGetSingleResponse> GetQuestionAsync(int questionId);
        bool QuestionExists(int questionId);
        AnswerGetResponse GetAnswer(int answerId);
        QuestionGetSingleResponse PostQuestion(QuestionPostFullRequest question);
        Task<QuestionGetSingleResponse> PostQuestionAsync(QuestionPostFullRequest question);
        QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question);
        Task<QuestionGetSingleResponse> PutQuestionAsync(int questionId, QuestionPutRequest question);
        void DeleteQuestion(int questionId);
        Task DeleteQuestionAsync(int questionId);
        AnswerGetResponse PostAnswer(AnswerPostFullRequest answer);

    }
}
