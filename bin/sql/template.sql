CREATE TABLE template(
    id SERIAL PRIMARY KEY,
    rules TEXT,
    "accountId" INTEGER,
    FOREIGN KEY ("accountId") REFERENCES account(id)
);