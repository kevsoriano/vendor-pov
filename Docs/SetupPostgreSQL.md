# PostgreSQL
## Install
```
brew update
brew install postgresql
```
## Configure the Postgres Database Server
```
psql postgres
CREATE ROLE newUser WITH LOGIN PASSWORD 'your_password';
ALTER ROLE newUser CREATEDB;
\q
psql postgres -U newuser
CREATE DATABASE your_db;
GRANT ALL PRIVILEGES ON DATABASE your_db TO newUser;
```
## Start
```
brew services start postgresql
```
## Stop
```
brew services stop postgresql
```
## Other useful commands
\l - list databases
\du - list users
\dt - list tables
SET ROLE new_username; - switch user
DROP DATABASE db_name;
tail -n 50 /opt/homebrew/var/log/postgresql@14.log - check logs (mac)