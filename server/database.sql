CREATE DATABASE ask_it;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE questions(
    id SERIAL PRIMARY KEY NOT NULL,
    question VARCHAR(2000) NOT NULL,
    creator_id INT  REFERENCES users(id)
);

CREATE TABLE notifications(
    id SERIAL PRIMARY KEY NOT NULL,
    question_creator_id INT  REFERENCES users(id),
    answer_creator_id INT  REFERENCES users(id),
    question_id INT REFERENCES questions(id),
    answer_id INT REFERENCES answer(id)
);

CREATE TABLE questions_likes(
    id SERIAL PRIMARY KEY NOT NULL,
    creator_id INT REFERENCES users(id),
    question_id INT REFERENCES questions(id)
);

CREATE TABLE answers_likes(
    id SERIAL PRIMARY KEY NOT NULL,
    creator_id INT REFERENCES users(id),
    answer_id INT REFERENCES answer(id)
);



CREATE TABLE answer(
    id SERIAL PRIMARY KEY NOT NULL,
    answer VARCHAR(2000) NOT NULL,
    creator_id INT  REFERENCES users(id),
    question_id INT  REFERENCES questions(id)
);