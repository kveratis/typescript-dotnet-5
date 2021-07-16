package question

import (
	"gopkg.in/go-playground/validator.v9"
)

type AnswerGetResponse struct {
	AnswerId 		int
	Content 		string
	UserName 		string
	Created 		string
}

type AnswerPostFullRequest struct {
	QuestionId 	int
	Content 		string
	UserName 		string
	UserId 			string
	Created 		string
}

type AnswerPostRequest struct {
	QuestionId 	int			`validate:"required"`
	Content 		string	`validate:"required"`
}

func (request AnswerPostRequest) Validate() []*ErrorResponse {
	var errors []*ErrorResponse
	validate := validator.New()
	err := validate.Struct(request)
	if err != nil {
			for _, err := range err.(validator.ValidationErrors) {
					var element ErrorResponse
					element.FailedField = err.StructNamespace()
					element.Tag = err.Tag()
					element.Value = err.Param()
					errors = append(errors, &element)
			}
	}
	return errors
}

type QuestionGetManyResponse struct {
	QuestionId 	int
	Title 			string
	Content 		string
	UserName 		string
	Created 		string

	Answers []*AnswerGetResponse
}

type QuestionGetSingleResponse struct {
	QuestionId 	int
	Title 			string
	Content 		string
	UserName 		string
	UserId 			string
	Created 		string

	Answers []*AnswerGetResponse
}

type QuestionPostFullRequest struct {
	Title 			string
	Content 		string
	UserName 		string
	UserId 			string
	Created 		string
}

type QuestionPostRequest struct {
	Title 			string	`validate:"required,max=100"`
	Content 		string	`validate:"required"`
}

func (request QuestionPostRequest) Validate() []*ErrorResponse {
	var errors []*ErrorResponse
	validate := validator.New()
	err := validate.Struct(request)
	if err != nil {
			for _, err := range err.(validator.ValidationErrors) {
					var element ErrorResponse
					element.FailedField = err.StructNamespace()
					element.Tag = err.Tag()
					element.Value = err.Param()
					errors = append(errors, &element)
			}
	}
	return errors
}

type QuestionPutRequest struct {
	Title 			string	`validate:"max=100"`
	Content 		string
}

func (request QuestionPutRequest) Validate() []*ErrorResponse {
	var errors []*ErrorResponse
	validate := validator.New()
	err := validate.Struct(request)
	if err != nil {
			for _, err := range err.(validator.ValidationErrors) {
					var element ErrorResponse
					element.FailedField = err.StructNamespace()
					element.Tag = err.Tag()
					element.Value = err.Param()
					errors = append(errors, &element)
			}
	}
	return errors
}

type QuestionRepository interface {
	GetAnswer(answerId int) *AnswerGetResponse
	PostAnswer(answer *AnswerPostFullRequest) *AnswerGetResponse

	GetQuestion(questionId int) *QuestionGetSingleResponse
	GetQuestions() []*QuestionGetManyResponse
	GetQuestionsBySearch(search string) []*QuestionGetManyResponse
	GetQuestionsBySearchWithPaging(search string, pageNumber int, pageSize int) []*QuestionGetManyResponse
	GetQuestionsWithAnswers() []*QuestionGetManyResponse
	GetUnansweredQuestions(pageNumber int, pageSize int) []*QuestionGetManyResponse
	PostQuestion(question *QuestionPostFullRequest) *QuestionGetSingleResponse
	PutQuestion(questionId int, question *QuestionPutRequest)
	QuestionExists(questionId int) bool
	DeleteQuestion(questionId int)
}