package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type RegisterUserRequest struct {
	Email string `json:"email" xml:"email" form:"email"`
}

func SetupAuthentication(app* fiber.App) {
	auth := app.Group("/auth", unauthorized_handler)		// /auth

	// Setup Version 1 API
	v1 := auth.Group("/v1", unauthorized_handler)   		// /auth/v1
  v1.Post("/register", route_auth_register)         	// /auth/v1/register
}

func route_auth_register(c* fiber.Ctx) error {
	c.Accepts("application/x-www-form-urlencoded")
	c.Accepts("application/json")
	c.Accepts("application/xml")

	var req *RegisterUserRequest = new(RegisterUserRequest)

	if err := c.BodyParser(req); err != nil {
			return err
	}

	log.Println(req.Email)

	return c.SendStatus(fiber.StatusCreated)
}