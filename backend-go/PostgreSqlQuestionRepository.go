package main

type Question struct {
	QuestionId int32
	Title string
	Content string
	UserId string
	UserName string
	Created string
	Answers []*Answer `pg:"rel:has-many"`
}

type Answer struct {
	AnswerId int32
	QuestionId int32
	Content string
	UserId string
	UserName string
	Created string
}