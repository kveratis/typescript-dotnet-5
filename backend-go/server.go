package main

import (
	"github.com/gofiber/fiber/v2"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

func main() {
	app := fiber.New()

	app.Get("/", index)
	SetupAuthentication(app)
	SetupQuestions(app)

	app.Listen(":4000")
}

// Handlers

func index(c* fiber.Ctx) error {
	return c.SendString("Hello, World!") 
}

func unauthorized_handler(c* fiber.Ctx) error {
	return c.SendStatus(fiber.StatusUnauthorized)
}
