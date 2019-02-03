export PGPASSWORD='docker'

echo "Configuring database...."

dropdb -U docker --host=127.0.0.1 iot
createdb -U docker --host=127.0.0.1 iot

psql -U docker --host=127.0.0.1 iot < ./bin/sql/account.sql
psql -U docker --host=127.0.0.1 iot < ./bin/sql/person.sql
psql -U docker --host=127.0.0.1 iot < ./bin/sql/template.sql
psql -U docker --host=127.0.0.1 iot < ./bin/sql/device.sql
psql -U docker --host=127.0.0.1 iot < ./bin/sql/message.sql

echo "Database configured"