CREATE TABLE person(
  id             SERIAL PRIMARY KEY,
  "usernameHash" CHARACTER(64),
  "passwordHash" CHARACTER(64),
  "sessionId"    CHARACTER(36),
  "address"      TEXT,
  "accountId"    INTEGER NOT NULL,
  FOREIGN KEY ("accountId") REFERENCES account(id)
);