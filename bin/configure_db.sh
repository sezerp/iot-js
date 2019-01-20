export PGPASSWORD='docker'

echo "Configuring database...."

dropdb -U docker --host=0.0.0.0 iot
createdb -U docker --host=0.0.0.0 iot

psql -U docker --host=0.0.0.0 iot < ./bin/sql/account.sql
psql -U docker --host=0.0.0.0 iot < ./bin/sql/person.sql
psql -U docker --host=0.0.0.0 iot < ./bin/sql/template.sql
psql -U docker --host=0.0.0.0 iot < ./bin/sql/device.sql
psql -U docker --host=0.0.0.0 iot < ./bin/sql/message.sql

echo "Database configured"