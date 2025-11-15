use hackathon;

truncate users;
truncate movies;
truncate reviews;

insert into users(firstname, lastname, email, password, mobile, birth)
values("Sanket", "Raut", "sanket@gmail.com", "sanket", "9876543210","2002-1-1");

insert into users(firstname, lastname, email, password, mobile, birth)
values("Swaraj", "Raut", "swaraj@gmail.com", "swaraj", "9876543210","2002-1-1");

-- insert into users(firstname, lastname, email, password, mobile, birth)
-- values("shiva", "somvanshi", "shiva@gmail.com", "shiva", 9876543210,"2002-1-1");

-- insert into users(firstname, lastname, email, password, mobile, birth)
-- values("Sanket", "Raut", "sanket@gmail.com", "sanket", 9876543210,"2002-1-1");

insert into movies( title, release_date)
values("Titanic", "1995-12-25");
insert into movies( title, release_date)
values("Mission Impossible", "1995-12-25");
insert into movies( title, release_date)
values("The Golden Gun", "1995-12-25");

-- insert into reviews(movie_id, rating, user_id, review, modified)
-- values(1, 4, 1, "very good movie", "2025-11-14 09:30:00");
-- insert into reviews(movie_id, rating, user_id, review, modified)
-- values(2, 5, 1, "very good movie", "2025-11-14 09:30:00");
-- insert into reviews(movie_id, rating, user_id, review, modified)
-- values(1, 5, 2, "very nice movie", "2025-11-14 09:30:00");
-- insert into reviews(movie_id, rating, user_id, review, modified)
-- values(3, 4, 2, "my favourite", "2025-11-14 09:30:00");

insert into reviews(movie_id, rating, user_id, review)
values(1, 4, 1, "very good movie");
insert into reviews(movie_id, rating, user_id, review)
values(2, 5, 1, "very good movie");
insert into reviews(movie_id, rating, user_id, review)
values(1, 5, 2, "very nice movie");
insert into reviews(movie_id, rating, user_id, review)
values(3, 4, 2, "my favourite");


insert into shares(review_id, user_id)
values(1, 2);
insert into shares(review_id, user_id)
values(3, 1);