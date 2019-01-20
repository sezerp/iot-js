
CREATE TABLE device(
  id             SERIAL PRIMARY KEY,
  "deviceName"       VARCHAR(64),
  "isActive"     BOOLEAN NOT NULL,
  "accountId" INTEGER,
  "templateId" INTEGER,
  FOREIGN KEY ("accountId") REFERENCES account(id),
  FOREIGN KEY ("templateId") REFERENCES template(id)
);