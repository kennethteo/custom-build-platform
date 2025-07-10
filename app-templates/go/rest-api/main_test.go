package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealthEndpoint(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rr := httptest.NewRecorder()

	router := setupRouter() // assumes you have a function to set up your Gin router
	router.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", rr.Code)
	}
	// The health endpoint returns a JSON object: {"status": "ok"}
	expected := `{"status":"ok"}`
	actual := rr.Body.String()
	actual = strings.TrimSpace(actual)
	if actual != expected {
		t.Errorf("expected body '%s', got '%s'", expected, actual)
	}
}

// setupRouter should be implemented in main.go or refactored for testability.
