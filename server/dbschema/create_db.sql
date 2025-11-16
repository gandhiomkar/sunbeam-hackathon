drop database hackathon;
create database hackathon;
use hackathon;

create table users(
      uid int auto_increment primary key,
    firstname varchar(40) not null,
    lastname varchar(40) not null,
    email varchar(40) unique not null,
    password varchar(60) not null,
      mobile varchar(25),
      birth date
);

create table shares(
      review_id int,
      user_id int
);

create table reviews(
      rid int auto_increment primary key,
      movie_id int,
      rating int,
      review varchar(500),
      user_id int,
      modified timestamp default CURRENT_TIMESTAMP,
      foreign key (user_id) references 
      users (uid)
);

CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    release_date DATE,
    description TEXT,
    poster_url VARCHAR(300)
);


