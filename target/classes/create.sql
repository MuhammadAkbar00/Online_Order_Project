create table ADVERTISER
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ADVERTISER_PK
            primary key,
    USERNAME VARCHAR(50) not null
        constraint ADVERTISER_JWT_USER_USERNAME_FK
            references JWT_USER (USERNAME),
    COMPANY_NAME VARCHAR(30) not null,
    AD_AMNT INTEGER not null,
    PRICE_PER_AD INTEGER not null
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
    LAST_NAME VARCHAR(30) not null,
    ADDRESS VARCHAR(250) not null,
    EMAIL VARCHAR(50) not null,
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
    CODE VARCHAR(6) not null,
    EXPIRE DATE not null
);

create table "ORDER"
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ORDER_PK
            primary key,
    USER_ID BIGINT not null
        constraint ORDER_USER_ID_USER_ID_FK
            references USER,
    DATE DATE not null,
    TOTAL INTEGER not null,
    METHOD CHAR(1) not null,
    PAID CHAR(1) not null
);

create table REVIEW
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint REVIEW_ID
            primary key,
    USER_ID BIGINT not null
        constraint REVIEW_USER_ID_USER_ID_FK
            references USER,
    ORDER_ID BIGINT unique not null
        constraint REVIEW_ORDER_ID_ORDER_ID_FK
            references "ORDER",
    STARS INT not null
);

create table CART
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint CART_PK
            primary key,
    ORDER_ID BIGINT unique not null
        constraint CART_ORDER_ID_ORDER_ID_FK
            references "ORDER",
    LAST_ACCESS DATE not null
);

create table OCCASION
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint OCCASION_PK
            primary key,
    NAME VARCHAR(30) not null,
    AD_AMNT INTEGER not null ,
    PRICE_PER_AD INTEGER not null
);

create table PRODUCT
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint PRODUCT_PK
            primary key,
    NAME VARCHAR(30) not null,
    DESC VARCHAR(250) not null,
    IMAGE VARCHAR(20) not null,
    PRICE INTEGER not null,
    STOCK CHAR(1) not null,
    QUANTITY INTEGER not null,
    OCCASION_ID BIGINT not null
        constraint PRODUCT_OCCASION_ID_OCCASION_ID_FK
            references OCCASION
);

create table ANALYTICS
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ANALYTICS_PK
            primary key,
    PAGE CHAR(1) not null,
    PRODUCT_ID BIGINT not null
        constraint ANALYTICS_PRODUCT_ID_PRODUCT_ID_FK
            references PRODUCT,
    TIME DATE not null,
    USERNAME VARCHAR(50) not null
        constraint ANALYTICS_JWT_USER_USERNAME_FK
            references JWT_USER (USERNAME)
);

create table PART
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint PART_PK
            primary key,
    NAME VARCHAR(30) not null,
    TYPE VARCHAR(30) not null,
    PRICE INTEGER not null
);

create table CUSTOM
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint CUSTOM_PK
            primary key,
    USER_ID BIGINT not null
        constraint CUSTOM_USER_ID_FK
            references USER,
    NAME VARCHAR(30) not null,
    DATE DATE not null,
    TOTAL INTEGER not null,
    OCCASION_ID BIGINT not null
        constraint OCCASION_IO_OCCASION_ID_FK
            references OCCASION
);

create table CUSTOM_PART
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint CUSTOM_PART_PK
            primary key,
    PART_ID BIGINT not null
        constraint CUSTOM_PART_PART_ID_FK
            references PART,
    CUSTOM_ID BIGINT not null
        constraint CUSTOM_PART_CUSTOM_ID_FK
            references CUSTOM
);

create table ORDER_ITEM
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint ORDER_ITEM_PK
            primary key,
    ORDER_ID BIGINT unique not null
        constraint ORDER_ITEM_ORDER_ID_FK
            references "ORDER",
    PRODUCT_ID BIGINT not null
        constraint ORDER_ITEM_PRODUCT_ID_FK
            references PRODUCT,
    CUSTOM_ID BIGINT not null
        constraint ORDER_ITEM_CUSTOM_ID_FK
            references CUSTOM
);




-- drop table REGISTER;
-- drop table course;
-- drop table student;
--
-- create table COURSE
-- (
--     ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1) primary key,
--     NAME     VARCHAR(50),
--     CAPACITY INTEGER
-- );
--
-- create table STUDENT
-- (
--     ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1) primary key,
--     NAME     VARCHAR(50),
--     AGE INTEGER
-- );
--
-- create table REGISTER
-- (
--     ID        BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1) primary key,
--     STUDENTID BIGINT not null references STUDENT,
--     COURSEID  BIGINT not null references COURSE
-- );
--
-- INSERT INTO COURSE (NAME, CAPACITY) VALUES ('CP3231', 20);
-- INSERT INTO COURSE (NAME, CAPACITY) VALUES ('CP3230', 20);
-- INSERT INTO COURSE (NAME, CAPACITY) VALUES ('EP1240', 40);
-- INSERT INTO COURSE (NAME, CAPACITY) VALUES ('CM1000', 5);
--
-- INSERT INTO STUDENT (NAME, AGE) VALUES ('Joe', 22);
-- INSERT INTO STUDENT (NAME, AGE) VALUES ('Ann', 16);
-- INSERT INTO STUDENT (NAME, AGE) VALUES ('Fred', 23);