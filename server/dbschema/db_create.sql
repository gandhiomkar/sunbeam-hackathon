create table users(
    uid int auto_increment primary key,
    uname varchar(30) not null,
    email varchar(40) unique not null,
    password varchar(60) not null,
    age int
);

-- insert into users(name, age) values('frodo',25);
-- insert into users(name, age) values('aragorn',35);
-- insert into users(name, age) values('gollum',45);
-- insert into users(name, age) values('legolas',25);
-- insert into users(name, age) values('gandalf',75);


create table tasks(
    tid int auto_increment primary key,
    task_name varchar(30),
    details text,
    task_status varchar(10),
    is_assigned boolean,
    assigned_to int, 
    assignee int, 
    foreign key (assigned_to) references users(uid),
    foreign key (assignee) references users(uid)
);

insert into tasks(task_name, details, task_status, is_assigned) values('defeat Sauron', "defeat Sauron and restore the Reunited Kingdom by reclaiming his rightful throne","pending",0);
insert into tasks(task_name, details, task_status, is_assigned) values('Transport ring', "to bear the One Ring to the Cracks of Doom in Mount Doom, where it was forged, and to destroy it by casting it into the fires","pending",0);
insert into tasks(task_name, details, task_status, is_assigned) values('deliever message', "serve as a messenger for Thranduil, to the Council of Elrond to report the escape of Gollum from Mirkwoods guard",'pending',0);

create table products(
    pid int auto_increment primary key,
    product_name varchar(30),
    product_desc text,  
    price decimal(7,2)
);

insert into products(product_name, product_desc, price) values('One Ring',"powerful magical ring", 10000.0);
insert into products(product_name, product_desc, price) values('Axe of Gimli',"powerful and agile axe", 5000.0);
insert into products(product_name, product_desc, price) values("Galadreil's phiel","magical lamp", 7000.0);