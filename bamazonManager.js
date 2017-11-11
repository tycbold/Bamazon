var mysql = require("mysql");
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  // Your password
  password: "Northwestern1",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

// -----------------------------------------------------------

function start() {
  inquirer.prompt({
      name: "activity",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "QUIT"]
    })
    .then(function(answer) {
      if (answer.activity === "View Products for Sale") {
        listProducts();
      }
      else if (answer.activity === "View Low Inventory") {
        lowInventory();
      }
      else if (answer.activity === "Add to Inventory") {
        queryAddInventory();
      }
      else if (answer.activity === "Add New Product") {
        queryAddProduct();
      }
      else if (answer.activity === "QUIT") {
        connection.end();
      }
    });
}


// ------------------------------------------------------------

function listProducts(){
  connection.query("SELECT * FROM products", function(err, res){
  if (err) throw err;
      console.table(res);
      start();
});
}

function lowInventory(){
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
  if (err) throw err;
      console.table(res);
      start();
});
}

function queryAddInventory (){

  inquirer.prompt([{
      name: "add",
      type: "input",
      message: "Which item would you like to add more to? (id number)",
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to add?",
    }
    ])
    .then(function(answer) {

      var addedItem = answer.add;
      var quantityAdded = answer.quantity;

      connection.query("SELECT * FROM products WHERE item_id = '" + addedItem + "'", function(err, res){
  if (err) throw err;
      var itemName = res[0].product_name;
      var quantityInStock = res[0].stock_quantity;
      var quantityTotal = parseInt(quantityInStock) + parseInt(quantityAdded);

      updateQuantity(addedItem, itemName, quantityAdded, quantityTotal);

});     
});
  }


function updateQuantity(item, itemName, quantityAdded, newQuantity){

  connection.query("UPDATE products SET ? WHERE ?",[
      {
        stock_quantity: newQuantity
      },
      {
        item_id: item
      }
    ], function(err, res){
  if (err) throw err;
  console.log("You have successfully added " + quantityAdded + " " + itemName + " to inventory!");
  start();    

});
    }

function queryAddProduct(){
    inquirer.prompt([{
      name: "name",
      type: "input",
      message: "What is the name of the product you would like to add?",
    },
    {
      name: "department",
      type: "input",
      message: "What department should this be listed in?",
    },
    {
      name: "stock",
      type: "input",
      message: "How many do we have in stock?",
    },
    {
      name: "price",
      type: "input",
      message: "How much would you like to sell this item for (US Dollars)?",
    },
    ])
    .then(function(answer) {

      connection.query(
        'INSERT INTO products (product_name, department_name, stock_quantity, price) VALUES ("' + answer.name + '", "' + answer.department + '", ' + answer.stock + ', ' + answer.price + ');', 
        function(err, res){
         if (err) throw err;
      console.log("You have successfully added this product!");
      start();
});
      });     


}





