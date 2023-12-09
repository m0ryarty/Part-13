CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Jakub Romanowski', 'https://learnsql.com/blog/sql-for-human-resources/', 'SQL for Human Resources')

insert into blogs (author, url, title) values ('Alexandre Bruffa', 'https://learnsql.com/blog/sql-practice-for-students/', 'SQL Practice for Students: 11 Basic SQL Practice Exercises with Solutions')

SELECT * from blogs