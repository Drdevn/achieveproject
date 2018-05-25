let express = require("express");
let pg = require('pg');
let knex = require('knex')  
({
    client:'postgresql',
    connection:{
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'noob188620lol',
        database: 'achievepro',
        max:10
    },
    searchPath: 'public',
    pool: { min: 1, max: 20 }

});

let bodyParser = require("body-parser");
let morgan = require("morgan");
let cors = require("cors");
let PORT = 3000;
let pool = new pg.Pool({
    port: 5432,
    password: 'noob188620lol',
    database: 'achievepro',
    max: 10,
    host: 'localhost',
    user: 'postgres'
});

if (pool){
    console.log("success");
}

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get( '/', function (req, res) {
    
    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400);
        }
        else {
                   db.query(' SELECT * from users', (err, table) => {
                    done();
                    if (err) {
                        return console.log(err)
                    }
                    else {
                        console.log('SUCCESS!')
                        return res.status(200).send(table.rows);
                    }
                }
            )
            
        
        }
    
    })
})

app.delete('/delete/:id', function (request, response) {
    console.log(request.params.id);

    var id = request.params.id;
    console.log(id)
     pool.connect(function (err, db, done) {
         if(err){
             return response.status(400).send(err)
         }
         else{
             // db.query('DELETE FROM users WHERE users.id = $1', [id],  (err, table) => {
             knex('users')
                 .where({ id: id })
                 .del()
                 .then((err, table)=> {



             done();
                 if(err){
                     return response.status(400).send(err);
                 }
                 else{

                     response.status(200).send('Success')
                 }
             })
         }
     })
})
app.put('/update/:id', function (request, response) {
   var id = request.params.id;
    console.log(request);
    name = request.body.name;
    surname = request.body.surname;
    indef = request.body.indef;
    image_name = request.body.image_name;
    pool.connect((err, db,done) =>{
        if(err){
            return response.status(400).send(err)
        }
        else{
            db.query('UPDATE users SET name=$1, surname=$2, indef=$4, image_name=$5 WHERE id=$3', [name, surname, id, indef, image_name],(err, table) =>{
                done();
                if (err) {
                    return response.status(400).send(err);
                }
                else {
                    console.log('SUCCESS!')
                    // console.log(table.rows[0].name)
    
                    response.status(200);
                }
            })
        }
     })

})

app.post('/add', function(request, response){
    console.log(request.body);
   
    username = request.body.username;
    email = request.body.email;
    password = request.body.password;
    counter = request.body.counter;
    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err)
        }
        else {
            knex('users').insert({
                username:username,
                email:email,
                password:password,
                counter:counter,
            }).then( (table, err) =>{    
        {
            done();
            console.log(image_name);
            if (err) {
                return response.status(400).send(err);
            }
            else {
                console.log('SUCCESS!')
                return response.status(201).send(table.rows);
                

            }
        }}
    )
    }

});

});



app.get( '/select/:id', function (req, res) {

    var id = req.params.id;
    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400);
        }
        else {
                    db.query(' SELECT * from users WHERE id=$1',[id], (err, table) => {
                    done();
                    console.log(id);
                    if (err) {
                        return console.log(err)
                    }
                    else {
                        console.log('SUCCESS!')
                        return res.status(200).send(table.rows);
                    }
                }
            )
            
        
        }
    
    })
})


app.listen(PORT, () => console.log('LISTENING ON PORT ' + PORT));
