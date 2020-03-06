drop table jwt_User if exists;

create table jwt_User (
    id bigint primary key GENERATED ALWAYS AS IDENTITY(START WITH 1),
    username varchar(50) not null,
    password varchar(60) not null,
    role varchar(50)
);

insert into jwt_User (username, password, role) values ('joe', '$2a$10$xZ5Hq/WNG8A.Viujt26uKOaT1l0rNUKS3gDhTWuyNKQ6CjnFgJ26W', 'ROLE_USER');
insert into jwt_User (username, password, role) values ('ann', '$2a$10$oPYMdYOC58/jEIxchTu8cuJyaCICUxbURzrnyKeUbpT1ECIePU3Ky', 'ROLE_USER');
insert into jwt_User (username, password, role) values ('admin', '$2a$10$ncFNgFU70d20U/YLHC.pBOAgGBUaRJUCNUsRfqilvQ0OI67mtJx.6', 'ROLE_ADMIN');
