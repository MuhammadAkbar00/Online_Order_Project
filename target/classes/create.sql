drop table jwt_User if exists CASCADE;

create table jwt_User (
                          id bigint primary key GENERATED ALWAYS AS IDENTITY(START WITH 1),
                          username varchar(50) not null
                              constraint JWT_USER_USERNAME_UINDEX
                                  unique,
                          password varchar(60) not null,
                          role varchar(50)
);

INSERT INTO jwt_User (username, password, role) VALUES ('joe', '$2a$10$xZ5Hq/WNG8A.Viujt26uKOaT1l0rNUKS3gDhTWuyNKQ6CjnFgJ26W', 'ROLE_USER');
INSERT INTO jwt_User (username, password, role) VALUES ('ann', '$2a$10$oPYMdYOC58/jEIxchTu8cuJyaCICUxbURzrnyKeUbpT1ECIePU3Ky', 'ROLE_USER');
INSERT INTO jwt_User (username, password, role) VALUES ('admin', '$2a$10$ncFNgFU70d20U/YLHC.pBOAgGBUaRJUCNUsRfqilvQ0OI67mtJx.6', 'ROLE_ADMIN');
INSERT INTO jwt_User (username, password, role) VALUES ('marketing', '$2a$10$gR8AJKwRGH6malNTO7VU3OkzBwOroB9usOrjiRo645Y9bMR7HqmNC', 'ROLE_MARKETING');
INSERT INTO jwt_User (username, password, role) VALUES ('advertiser', '$2a$10$xCIdUocTQbo7vyR7OrJcnOWufptsftV4F05AvyggcC035NORthKye', 'ROLE_ADVERTISER');


DROP TABLE ADVERTISER IF EXISTS CASCADE;
DROP TABLE ADVERT IF EXISTS CASCADE;
DROP TABLE USER IF EXISTS CASCADE;
DROP TABLE COUPON IF EXISTS CASCADE;
DROP TABLE "ORDER" IF EXISTS CASCADE;
DROP TABLE EXPERIENCE IF EXISTS CASCADE;
DROP TABLE OCCASION IF EXISTS CASCADE;
DROP TABLE PART IF EXISTS CASCADE;
DROP TABLE CUSTOM IF EXISTS CASCADE;
DROP TABLE CUSTOM_PART IF EXISTS CASCADE;
DROP TABLE ANALYTICS IF EXISTS CASCADE;
DROP TABLE NORMAL IF EXISTS CASCADE;
DROP TABLE PRODUCT IF EXISTS CASCADE;
DROP TABLE ORDER_ITEM IF EXISTS CASCADE;
DROP TABLE BRANCH IF EXISTS CASCADE;

create table ADVERTISER
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ADVERTISER_PK
            primary key,
    USERNAME VARCHAR(50) not null
        constraint ADVERTISER_JWT_USER_USERNAME_FK
            references JWT_USER (USERNAME),
    COMPANY_NAME VARCHAR(30) not null,
    AD_AMNT INTEGER null,
    PRICE_PER_AD INTEGER null,
    DISPLAY CHAR(1) null
);

CREATE TABLE ADVERT
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ADVERT_PK
            primary key,
    ADVERTISER_ID BIGINT not null
        constraint ADVERT_ID_ADVERTISER_ID_FK FOREIGN KEY
            references ADVERTISER,
    DESC VARCHAR(250) not null,
    IMAGE VARCHAR(20) not null,
    SLOT INTEGER NULL,
    DISPLAY CHAR(1) NOT NULL
);

create table USER
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint USER_PK
            primary key,
    USERNAME VARCHAR(50) not null
        constraint USER_USERNAME_JWT_USERNAME_FK
            references JWT_USER (USERNAME),
    FIRST_NAME VARCHAR(30) not null,
    LAST_NAME VARCHAR(30) null,
    ADDRESS VARCHAR(250) null,
    EMAIL VARCHAR(50) null,
    MAILING CHAR(1) not null,
    POINTS INTEGER not null,
    LANGUAGE CHAR(2) not null
);

create table COUPON
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint COUPON_ID
            primary key,
    USER_ID BIGINT not null
        constraint COUPON_USER_ID_USER_ID_FK
            references USER,
    DISCOUNT INTEGER NOT NULL,
    CODE VARCHAR(6) not null,
    EXPIRE DATE not null,
    DESC VARCHAR(250) NOT NULL
);

CREATE TABLE BRANCH
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint BRANCH_PK
            primary key,
    NAME VARCHAR(50) NOT NULL,
    PROVINCE VARCHAR(30) NOT NULL,
    LON DOUBLE NOT NULL,
    LAT DOUBLE NOT NULL
);

create table "ORDER"
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ORDER_PK
            primary key,
    USER_ID BIGINT not null
        constraint ORDER_USER_ID_USER_ID_FK
            references USER,
    BRANCH_ID BIGINT not null
        constraint ORDER_BRANCH_ID_BRANCH_ID_FK
            references BRANCH,
    DATE DATE not null,
    TOTAL INTEGER not null,
    PAYMENT_METHOD CHAR(1) not null,
    PAID CHAR(1) not null,
    LAST_ACCESS DATE not null,
    DINEIN CHAR(1) NOT NULL
);

create table EXPERIENCE
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint EXPERIENCE_ID
            primary key,
    ORDER_ID BIGINT unique not null
        constraint EXPERIENCE_ORDER_ID_ORDER_ID_FK
            references "ORDER",
    STARS INTEGER not null
);

create table OCCASION
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint OCCASION_PK
            primary key,
    NAME VARCHAR(30) not null,
    DISCOUNT INTEGER NOT NULL,
    START_DATE DATE NOT NULL,
    END_DATE DATE NOT NULL
);

CREATE TABLE PART
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint PART_PK
            primary key,
    NAME VARCHAR(30) NOT NULL,
    TYPE VARCHAR(30) NOT NULL,
    PRICE INTEGER NOT NULL,
    IMAGE VARCHAR(20) NOT NULL,
    POSITION CHAR(1) NOT NULL,
    REQUIRED CHAR(1) NOT NULL
);

CREATE TABLE CUSTOM
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint CUSTOM_PK
            PRIMARY KEY,
    NAME VARCHAR(30) NOT NULL,
    DESC VARCHAR(250) NOT NULL,
    DATE DATE NOT NULL,
    TYPE VARCHAR(30) NOT NULL,
    TOTAL INTEGER NOT NULL,
    OCCASION_ID BIGINT NULL
    constraint CUSTOM_OCCASION_ID_OCCASION_ID_FK FOREIGN KEY
        REFERENCES OCCASION
);

CREATE TABLE CUSTOM_PART
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint CUSTOM_PART_PK
            primary key,
    PART_ID BIGINT not null
        constraint CUSTOM_PART_PART_ID_PART_ID_FK
            references PART,
    CUSTOM_ID BIGINT not null
        constraint CUSTOM_PART_CUSTOM_ID_CUSTOM_ID_FK
            references CUSTOM
);

CREATE TABLE NORMAL
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint NORMAL_PK
            PRIMARY KEY,
    NAME VARCHAR(30) NOT NULL,
    DESC VARCHAR(250) NOT NULL,
    IMAGE VARCHAR(20) NOT NULL,
    TYPE VARCHAR(30) NOT NULL,
    PRICE INTEGER NOT NULL,
    STOCK CHAR(1) NOT NULL,
    QUANTITY INTEGER NOT NULL,
    OCCASION_ID BIGINT NULL
    constraint NORMAL_OCCASION_ID_OCCASION_ID_FK FOREIGN KEY
        references OCCASION
);

CREATE TABLE PRODUCT
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint PRODUCT_PK
            primary key,
    CUSTOM_ID BIGINT unique not null
        constraint PRODUCT_CUSTOM_ID_CUSTOM_ID_FK
            references CUSTOM,
    NORMAL_ID BIGINT not null
        constraint PRODUCT_NORMAL_ID_NORMAL_ID_FK
            references NORMAL
);

CREATE TABLE ANALYTICS
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ANALYTICS_PK
            PRIMARY KEY,
    PAGENAME VARCHAR(30) NOT NULL,
    PRODUCT_ID BIGINT NOT NULL
        constraint ANALYTICS_PRODUCT_ID_PRODUCT_ID_FK FOREIGN KEY
            references PRODUCT,
    DATE DATE NOT NULL,
    TIME INT NOT NULL,
    USERNAME VARCHAR(50) not null
        constraint ANALYTICS_USERNAME_JWT_USERNAME_FK
            references JWT_USER (USERNAME),
);

CREATE TABLE ORDER_ITEM
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ORDER_ITEM_PK
            primary key,
    ORDER_ID BIGINT unique not null
        constraint ORDER_ITEM_ORDER_ID_FK
            references "ORDER",
    PRODUCT_ID BIGINT not null
        constraint ORDER_ITEM_PRODUCT_ID_FK
            references PRODUCT
);

--User Inserts
INSERT INTO USER (USERNAME,MAILING,POINTS,LANGUAGE)
    VALUES ('joe','Y',0,'EN');
INSERT INTO USER (USERNAME,MAILING,POINTS,LANGUAGE)
    VALUES ('ann','N',0,'EN');
INSERT INTO USER (USERNAME,MAILING,POINTS,LANGUAGE)
    VALUES ('admin','N',0,'EN');

--Advertiser Inserts
INSERT INTO ADVERTISER (USERNAME,COMPANY_NAME)
    VALUES ('advertiser','Talabat');

--Advert Inserts
INSERT INTO ADVERT (ADVERTISER_ID, DESC, IMAGE, SLOT, DISPLAY)
    VALUES (1,'Order from all your favorite restaurants on Talabat from the comfort of your home',
            'talabat.png',3,'N');

--Coupon Inserts
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (1,20,'POD453', CURRENT_DATE+40 , '20 Percent off your next purchase from following our Facebook page!');
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (1,10,'PHB352', CURRENT_DATE+7, 'Please accept 10% off your next purchase as a warm welcome from the inDine team');
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (2,10,'PHB352', CURRENT_DATE+7, 'Please accept 10% off your next purchase as a warm welcome from the inDine team');

--Branch Inserts
INSERT INTO BRANCH (NAME, PROVINCE, LON, LAT)
    VALUES ("","",);