var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');


mongoose.connect('mongodb://192.168.0.232:30017/Jaynil', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var dataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String
  });

var Data = mongoose.model('Data', dataSchema);

var schema = buildSchema(`

  type User {
    firstname : String
    lastname : String
  }
  type Query {
    get : [User]
  }
`);


var root = {
  get : Data.find().then((data)=>data)
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');