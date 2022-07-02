CREATE DATABASE perntodo;--this line is used only for development purpose but turn on comment for production

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)