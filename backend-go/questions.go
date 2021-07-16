package main

import (
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func SetupQuestions(app* fiber.App) {
	app.Get("/questions", getQuestions)												// /questions
	app.Get("/questions/unanswered", getUnansweredQuestions)	// /questions/unanswered
}

func getQuestions(c* fiber.Ctx) error {
	var search string = c.Query("search")

	includeAnswers, err := strconv.ParseBool(c.Query("includeAnswers", "false"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	pageNumber, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if pageNumber < 1 {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	pageSize, err := strconv.Atoi(c.Query("pageSize", "20"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if pageSize < 5 || pageSize > 50 {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	log.Printf("Search: %s", search)
	log.Printf("IncludeAnswers: %v", includeAnswers)
	log.Printf("page: %d", pageNumber)
	log.Printf("pageSize: %d", pageSize)

	// log.Printf("Search: %s", s.search)
	// log.Printf("IncludeAnswers: %v", s.includeAnswers)
	// log.Printf("page: %d", p.pageNumber)
	// log.Printf("pageSize: %d", p.pageSize)

	if search == "" {
		if includeAnswers {

		}
	}

	return c.SendStatus(fiber.StatusOK)
}

func getUnansweredQuestions(c* fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
}