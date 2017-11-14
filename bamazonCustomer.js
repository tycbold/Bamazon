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
      message: "Would you like to SEARCH or QUIT?",
      choices: ["SEARCH", "QUIT"]
    })
    .then(function(answer) {
      if (answer.activity === "SEARCH") {
        listProducts();
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
      querySearch();
});
}

function querySearch (){

  inquirer.prompt([{
      name: "purchase",
      type: "input",
      message: "Which item would you like to purchase? (id number)",
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?",
    }
    ])
    .then(function(answer) {

      var purchasedItem = answer.purchase;
      var quantityPurchased = answer.quantity;

      connection.query("SELECT * FROM products WHERE item_id = '" + purchasedItem + "'", function(err, res){
  if (err) throw err;
      var price = res[0].price;
      var itemName = res[0].product_name;
      var quantityInStock = res[0].stock_quantity;
      var quantityRemaining = quantityInStock - quantityPurchased;
      var totalCost = price * quantityPurchased;

      if (quantityPurchased > quantityInStock) {
        console.log("Insufficient quantity!");
        querySearch();
      }
      else {
      updateQuantity(purchasedItem, itemName, quantityPurchased, quantityRemaining, totalCost);
    }

});     
});
  }


function updateQuantity(item, itemName, quantityPurchased, newQuantity, totalCost){

  connection.query("UPDATE products SET ? WHERE ?",[
      {
        stock_quantity: newQuantity
      },
      {
        item_id: item
      }
    ], function(err, res){
  if (err) throw err;
  console.log("You have successfully purchased " + quantityPurchased + " " + itemName + "(s)!");
  console.log("Total cost: $" + totalCost);
  start();    

});
    }



// function queryTitle (){

// inquirer.prompt({
//       name: "title",
//       type: "input",
//       message: "Type the song title!",
//     })
//     .then(function(answer) {

//       connection.query("SELECT * FROM top5000 WHERE title = '" + answer.title + "'", function(err, res){
//   if (err) throw err;
//   for (var i = 0; i < res.length; i++) {
//     console.log (res[i].ranking + "|" + res[i].artist + "|" + res[i].title + "|" + res[i].song_year);
//     console.log("-------------------------------------");
//   }
// });

//      startOver();
      
//     });

//  // connection.end();
// }


// function queryRange (){

//   inquirer.prompt([
//     {
//       name: "start_rank",
//       type: "input",
//       message: "Type the starting rank!",
//     },
//     {
//       name: "end_rank",
//       type: "input",
//       message: "Type the ending rank!",
//     }
//     ])
//     .then(function(answer) {

//       connection.query("SELECT * FROM top5000 WHERE ranking BETWEEN " + answer.start_rank + " AND " + answer.end_rank, function(err, res){
//   if (err) throw err;
//   for (var i = 0; i < res.length; i++) {
//     console.log (res[i].ranking + "|" + res[i].artist + "|" + res[i].title + "|" + res[i].song_year);
//     console.log("-------------------------------------");
//   }
// });

//      startOver();
      
//     });

//  // connection.end();
// }


function queryDuplicate (){

connection.query("SELECT artist FROM top5000 GROUP BY artist HAVING COUNT(*) > 1", function(err, res){
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
    console.log (res[i].artist);
    console.log("-------------------------------------");
    

  }
});
connection.end();
}





function updatePlaylist() {
  var query = connection.query(
    "UPDATE songs SET ? WHERE ?",
    [
      {
        rating: 8
      },
      {
        title: "Bodak Yellow"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deletePlaylist() {
  connection.query(
    "DELETE FROM songs WHERE ?",
    {
      title: "Mi Gente"
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
    }
  );
}

