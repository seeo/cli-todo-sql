console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'siangeeeo',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("result", result.rows );
    }
};

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  let text = "INSERT INTO items (name) VALUES ($1) RETURNING id";

  const values = ["hello"]; //process.argv[3]

  client.query(text, values, queryDoneCallback);
};

client.connect(clientConnectionCallback);
