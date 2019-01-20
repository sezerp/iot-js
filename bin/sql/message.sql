CREATE TABLE message(
    id SERIAL PRIMARY KEY,
    "deviceId" INTEGER,
    FOREIGN KEY ("deviceId") REFERENCES device(id)
);