
CREATE TABLE device(
  id             SERIAL PRIMARY KEY,
  "deviceName"       VARCHAR(64),
  "isActive"     BOOLEAN NOT NULL DEFAULT 'f',
  "accountId" INTEGER NOT NULL,
  "templateId" INTEGER,
  FOREIGN KEY ("accountId") REFERENCES account(id),
  FOREIGN KEY ("templateId") REFERENCES template(id)
);