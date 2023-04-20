const express = require('express');
const db=require('./mysql/connection')


  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));




  app.get("/createemployee", (req, res) => {

    let sql =
  
      "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),email VARCHAR(255), role VARCHAR(255),address VARCHAR(255), PRIMARY KEY(id))";
  
    db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee table created");
  
    });
});


// Insert employee 

app.post("/add", (req, res) => {

    let post = { name:"" ,email:"", role:"" , address:"" };
  
    let sql = "INSERT INTO employee SET ?";
  post.name=req.body.name;
  post.email=req.body.email;
  post.role=req.body.role;
  post.address=req.body.address;
    let query = db.query(sql, post, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee  added");
  
    });
  
  });



  app.listen("3000", () => {

    console.log("Server started on port 3000");
  
  });


 // Update employee

app.post("/update/:id", (req, res) => {

    let post = { name:"" ,email:"", role:"" , address:"" };
    
    let Nname=req.body.name;
  let Nemail=req.body.email;
  let Nrole=req.body.role;
  let Naddress=req.body.address;
 // let newName = "Updated name";

  let sql = `UPDATE employee SET name = '${Nname}', email = '${Nemail}', role = '${Nrole}', address = '${Naddress}' WHERE id = ${req.params.id}`;
  //let sql
  let query = db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Post updated...");

  });

});


// Delete employee

app.delete("/delete/:id", (req, res) => {

    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  
    let query = db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee deleted");
  
    });
  
  });

  //get all

  app.get("/getall", (req, res) => {

    db.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })

  });

  //get By id

  app.get("/get/:id", (req, res) => {

    let id1=req.params.id;
    console.log(req.params.id);
    db.query('SELECT * FROM employee WHERE id = ? ',req.params.id, (err, row, fields) => {
        if (!err)
        res.send(row);
        else
        console.log(err);
        })

  });

  // get records  in range from id1 to id2
  app.get("/get/:id1/:id2", (req, res) => {

   
    db.query('SELECT * FROM employee WHERE id >?  and id < ?',[req.params.id1,req.params.id2], (err, row, fields) => {
        if (!err)
        res.send(row);
        else
        console.log(err);
        })

  });


  //get record by name
  app.get("/getbyname/:name", (req,res)  => {

    db.query('SELECT * FROM employee WHERE name=?',req.params.name, (err, rows, fields) => {
        if (!err){
        res.send(rows);
    console.log("hello")
    console.log(rows)    
    }
        else{
            console.log(req.name)
        console.log(err);

        }
        })


  })