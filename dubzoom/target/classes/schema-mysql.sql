drop database if exists dubzoom;
Create database if not exists dubzoom;
Use dubzoom;

Create table if not exists Users
(
    id int primary key not null,
    fname varchar(50) not null,
    lname varchar(50) not null,
    email varchar(50) not null,
    password varchar(100) not null
)