DROP DATABASE IF EXISTS bamazon_DB;-- 

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  stock_quantity INTEGER(4) NOT NULL,
  price DECIMAL(8,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Nintendo Switch", "Video Games", 4, 300.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Adult Coloring Book", "Arts and Crafts", 200, 5.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Sewing Machine", "Arts and Crafts", 30, 225.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Warm Hat", "Apparel", 50, 11.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Comfy Shirt", "Apparel", 90, 15.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Self-Help Book", "Books", 500, 25.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("The Crockpot You Won't Use", "Cookware", 1000, 85.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Slipper Socks", "Footwear", 50, 10.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Snack Basket", "Food", 100, 35.00);

INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Your Biography (Hardcover)", "Books", 5, 40.00);

SELECT * FROM products;
