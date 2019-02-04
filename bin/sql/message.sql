CREATE TABLE message(
    id SERIAL PRIMARY KEY,
    "deviceId" INTEGER NOT NULL,
    message TEXT,
    FOREIGN KEY ("deviceId") REFERENCES device(id)
);