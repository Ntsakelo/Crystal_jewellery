DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS catalogue;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers(
    id serial primary key not null,
    firstname text not null,
    lastname text not null,
    contact text not null,
    email text not null,
    password text not null,
    loyalty text not null,
    marketing text not null
);
CREATE TABLE products(
    id serial primary key not null,
    brand text not null,
    category text not null,
    gender text not null,
    item text not null,
    color text not null,
    item_url text not null,
    item_price decimal
);

CREATE TABLE catalogue(
    id serial primary key not null,
    item_id int not null,
    qty int not null,
    item_subTotal decimal not null,
    customer_ref text not null,
    customer_id int null,
    foreign key(item_id) references products(id) on delete cascade,
    foreign key(customer_id) references customers(id) on delete cascade
);

CREATE TABLE orders(
    id serial primary key not null,
    customer_id int not null,
    item text not null,
    color text not null,
    item_url text not null,
    qty int not null,
    item_subTotal decimal not null,
    order_date date not null DEFAULT CURRENT_DATE,
    order_time time not null DEFAULT CURRENT_TIME,
    order_status text null,
    foreign key(customer_id) references customers(id) on delete cascade
);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Apolio Avion','Earrings','Women','Apolio Avion Earrings','Gold And Silver','https://images.megapixl.com/1622/16221624.jpg',1499.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Lorex','Rings','Women','Lorex III Ring','Silver','https://images.pexels.com/photos/750148/pexels-photo-750148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',1299.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Constantia Florain','Rings','Women','Constantia Florain Ring','Silver','https://images.pexels.com/photos/1653227/pexels-photo-1653227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',899.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Apolio Avion','Rings','Men','Apolio Avion Ring','Mixed','https://images.pexels.com/photos/204427/pexels-photo-204427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',1199.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Apolio Avion','Watches','Women','Apolio Avion Wrist Watch','Black And Silver','https://images.megapixl.com/1316/13164746.jpg',999.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Vivianna','Necklaces','Women','Vivianna Necklace','Mixed','https://images.megapixl.com/316/3165738.jpg',899.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Vivianna','Earrings','Women','Vivianna Earrings','Black And Silver','https://images.megapixl.com/316/3165746.jpg',899.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Olidays Mccbride','Rings','All','Olidays Mccbride Ring','Silver','https://images.megapixl.com/53/530403.jpg',1199.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Olidays Mccbride','Necklaces','Women','Olidays Mccbride Necklace','Silver And Black','https://images.megapixl.com/4/48555.jpg',999.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Olidays Mccbride','Bracelets','Women','Olidays Mccbride Bracelets','Gold','https://images.megapixl.com/3043/30439023.jpg',799.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Apolio Avion','Watches','Men','Apolio Avion II Wrist Watch','Silver','https://images.megapixl.com/78/786343.jpg',999.99);

insert into products(brand,category,gender,item,color,item_url,item_price) values('Apolio Avion','Watches','Men','Apolio Avion III Wrist Watch','Black','https://images.megapixl.com/99/992163.jpg',899.99);



