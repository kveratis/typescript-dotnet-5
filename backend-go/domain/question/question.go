package question

type Question struct {
	title string
	content string
	userId string
	userName string
	created string

	answers []*Answer
}