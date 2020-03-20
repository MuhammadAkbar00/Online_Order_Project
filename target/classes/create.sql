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
DROP TABLE FAQ IF EXISTS CASCADE;

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

CREATE TABLE FAQ
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint FAQ_PK
            primary key,
    QUESTION VARCHAR(250) not null,
    ANSWER VARCHAR(500) not null,
    HIDDEN CHAR(1) NOT NULL
);

create table USER
(
    ID BIGINT GENERATED ALWAYS AS IDENTITY(START WITH 1)
        constraint USER_PK
            primary key,
    USERNAME VARCHAR(50) not null
        constraint USER_USERNAME_JWT_USERNAME_FK
            references JWT_USER (USERNAME),
    FIRST_NAME VARCHAR(30) null,
    LAST_NAME VARCHAR(30) null,
    ADDRESS VARCHAR(250) null,
    EMAIL VARCHAR(50) null,
    MAILING CHAR(1) not null,
    POINTS INTEGER not null,
    LANGUAGE CHAR(2) not null,
    PHONE INTEGER NULL
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
    CUSTOM_ID BIGINT null
        constraint PRODUCT_CUSTOM_ID_CUSTOM_ID_FK
            references CUSTOM,
    NORMAL_ID BIGINT null
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
            references JWT_USER (USERNAME)
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
    VALUES (1,'Order from all your favorite restaurants from the comfort of your home only on Talabat',
            'talabat.png',3,'N');

--Coupon Inserts
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (1,20,'POD453', DATEADD( 'dd', 40,  CURRENT_DATE ) , '20 Percent off your next purchase from following our Facebook page!');
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (1,10,'PHB352', DATEADD( 'dd', 7,  CURRENT_DATE ), 'Please accept 10% off your next purchase as a warm welcome from the inDine team');
INSERT INTO COUPON (USER_ID, DISCOUNT, CODE, EXPIRE, DESC)
    VALUES (2,10,'PHB352', DATEADD( 'dd', 7,  CURRENT_DATE ), 'Please accept 10% off your next purchase as a warm welcome from the inDine team');

--Branch Inserts
INSERT INTO BRANCH (NAME, PROVINCE, LON, LAT)
    VALUES ('inDine Khor','Al-Khor',5734420.253940262,2959501.989090159);
 INSERT INTO BRANCH (NAME, PROVINCE, LON, LAT)
    VALUES ('inDine','Mushaireb',5735012.110758717,2910249.8948588166);
 INSERT INTO BRANCH (NAME, PROVINCE, LON, LAT)
    VALUES ('inDine Aziziya','Al-Aziziya',5727456.750964634,2905822.4373057233);

--Normal Inserts
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Aloo gobi','Cauliflower with potatoes sautéed with garam masala',
    'aloog.jpg','main',50,'Y',40,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Aloo tikki','Potato patties mixed with some fried vegetables','aloo-t.jpg','side',25,'Y',70,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Aloo matar','Potatoes and peas in curry','aloo-m.jpg','main',42,'Y',36,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Aloo methi','Potato with fresh Methi leaves','aloo-me.jpg','side',22,'Y',56,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Aloo shimla mirch','Capsicum with potatoes and cumin seeds, onions, tomatoes, ginger-garlic paste, red chilli powder and garam masala',
    'aloo-s.jpg','main',48,'Y',45,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kulcha','Indian mildly leavend bread','kulcha.jpg','side',12,'Y',84,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kuzhakkattai','Coconut dumplings','Kuzhakkattai.jpg','side',32,'Y',64,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Baati','Hard, unleavened and sour bread','baati.jpg','dessert',8,'Y',90,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Biryani','Mixed rice dish with spices, vegetables and meat','biryani.jpg','main',43,'Y',139,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Butter chicken','Indian chicken dipped in butter and garlic','butterchicken.jpg','main',46,'Y',26,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Chaat','Potato patty fried in oil, topped with sweet yogurt','chaat.jpg','dessert',17,'Y',33,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Chana masala','Chickpeas of the Chana type in tomato based sauce','chana.jpg','main',43,'Y',12,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Chicken tikka masala','Chicken marinated in a Yogurt tomato sauce','chicken.jpg','main',55,'Y',0,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Chole bhature','Chick peas with assorted spices, wheat flour and bhatura yeast','chole.jpg','main',42,'Y',41,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Imarti','Round batter from moong dal dipped in sugary syrup','imarti.jpg','dessert',18,'Y',59,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Jalebi','A North Indian twisted noodle like sweet dish dipped in sugary syrup','jalebi.jpg','dessert',14,'Y',43,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kadai paneer','Paneer and green peppers in tomato gravy','kadai.jpg','main',46,'Y',23,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kofta','Gram flour, veggies, rolled into balls and fried in oil then cooked with curry','kofta.jpg','main',40,'Y',53,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kulfi falooda','A frozen dairy dessert to ward off the sweltering heat of summers','kulfi.jpg','dessert',14,'Y',24,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Phirni','Rice pudding','phirni.jpg','dessert',10,'Y',45,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Arabic tea','Traditional Arabic tea','arabic.jpg','beverage',5,'Y',78,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Kharak tea','Sweet and creamy Kharak tea','kharak.jpg','beverage',3,'Y',75,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Lemon tea','Sour lemon tea','lemon.jpg','beverage',9,'Y',65,null);
INSERT INTO NORMAL (NAME,DESC,IMAGE,TYPE,PRICE,STOCK,QUANTITY,OCCASION_ID)
    VALUES ('Ginger honey tea','Hot honey tea with Ginger','honey.jpg','beverage',9,'Y',72,null);


--Part Inserts
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Lettuce','salad',2,'lettuce.jpg','Y');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Cucumber','salad',2,'cucumber.png','Y');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Scallion','salad',4,'scallion.jpg','Y');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Olive','salad',5,'olive.jpg','Y');

INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Parmesan cheese','salad',6,'parmesan.jpg','N');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Cheddar cheese','salad',1,'cheddar.jpg','N');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Swiss cheese','salad',4,'swiss.jpg','N');

INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Ranch dressing','salad',2,'ranch.jpg','N');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Coconut cream dressing','salad',2,'coconut.jpg','N');
INSERT INTO PART (NAME,TYPE,PRICE,IMAGE,REQUIRED)
    VALUES ('Italian dressing','salad',2,'italian.jpg','N');


-- Product Inserts
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,1);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,2);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,3);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,4);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,5);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,6);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,7);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,8);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,9);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,10);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,11);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,12);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,13);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,14);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,15);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,16);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,17);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,18);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,19);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,20);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,21);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,22);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,23);
INSERT INTO PRODUCT (CUSTOM_ID,NORMAL_ID)
    VALUES (null,24);