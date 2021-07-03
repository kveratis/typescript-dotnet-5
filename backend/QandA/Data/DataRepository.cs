using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Dapper;
using QandA.Data.Models;
using System.Linq;
using static Dapper.SqlMapper;
using System.Threading.Tasks;

namespace QandA.Data
{
    public sealed class DataRepository : IDataRepository
    {
        private readonly string _connectionString;

        public DataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public void DeleteQuestion(int questionId)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            connection.Execute(@"EXEC dbo.Question_Delete @QuestionId = @QuestionId", new { QuestionId = questionId });
        }

        public AnswerGetResponse GetAnswer(int answerId)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.QueryFirstOrDefault<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByAnswerId @AnswerId = @AnswerId", new { AnswerId = answerId });
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();

            using var results = connection.QueryMultiple(
                @"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId;
                EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = questionId }
            );

            var question = results.Read<QuestionGetSingleResponse>().FirstOrDefault();

            if(question != null)
            {
                question.Answers = results.Read<AnswerGetResponse>().ToList();
            }
            
            return question;
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany");
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers()
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var questionDictionary = new Dictionary<int, QuestionGetManyResponse>();
            return connection.Query<QuestionGetManyResponse, AnswerGetResponse, QuestionGetManyResponse>(
                @"EXEC dbo.Question_GetMany_WithAnswers",
                map: (q, a) =>
                {
                    // This code addresses the N+1 issue of Questions + Answers
                    if (!questionDictionary.TryGetValue(q.QuestionId, out QuestionGetManyResponse question))
                    {
                        question = q;
                        question.Answers = new List<AnswerGetResponse>();
                        questionDictionary.Add(question.QuestionId, question);
                    }

                    question.Answers.Add(a);
                    return question;
                },
                splitOn: "QuestionId"   // This says everything before QuestionId goes into the QuestionGetManyResponse model and everything afterward including QuestionId goes into the AnswerGetResponse model
                )
                .Distinct() // Remove duplicate questions
                .ToList();
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany_BySearch @Search = @Search", new { Search = search });
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search, int pageNumber, int pageSize)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.Query<QuestionGetManyResponse>(
                @"EXEC dbo.Question_GetMany_BySearch_WithPaging
                  @Search = @Search,
                  @PageNumber=@PageNumber, 
                  @PageSize=@PageSize", new { Search = search, PageNumber = pageNumber, PageSize = pageSize });
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetUnanswered");
        }

        public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync()
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return await connection.QueryAsync<QuestionGetManyResponse>(@"EXEC dbo.Question_GetUnanswered");
        }

        public AnswerGetResponse PostAnswer(AnswerPostFullRequest answer)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.QueryFirst<AnswerGetResponse>(@"EXEC dbo.Answer_Post @QuestionId = @QuestionId, @Content=@Content, @UserId=@UserId, @UserName=@UserName, @Created=@Created", answer);
        }

        public QuestionGetSingleResponse PostQuestion(QuestionPostFullRequest question)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var questionId = connection.QueryFirst<int>(@"EXEC Question_Post @Title=@Title, @Content=@Content, @UserId=@UserId, @UserName=@UserName, @Created=@Created", question);
            return GetQuestion(questionId);
        }

        public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            connection.Execute(@"EXEC Question_Put @Questionid=@QuestionId, @Title=@Title, @Content=@Content", new { QuestionId=questionId, Title = question.Title, Content = question.Content });
            return GetQuestion(questionId);
        }

        public bool QuestionExists(int questionId)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection.QueryFirst<bool>(@"EXEC dbo.Question_Exists @QuestionId = @QuestionId", new { QuestionId = questionId });
        }
    }
}
