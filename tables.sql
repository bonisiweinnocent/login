create table love_user(
	id serial not null primary key,
	username text not null,
    password text not null,
    love_count text not null
);



insert into love_user(username,password,love_count) values ('bonisiweinnocent','hgd1234','3');