var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');
const cors = require('cors');


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
    id : ID
    firstname : String
    lastname : String
  }
  type Mutation {
    set(firstname:String lastname:String) : User
  }
  type Query {
    get : [User]
  }
`);


var root = {
    get : function(){
      return Data.find().then((data)=>data);
    },
    set : async function({firstname,lastname}){
      var user = {
        firstname:firstname,
        lastname :lastname
      }
      var data = new Data(user);
      
      await data.save().then((res,err)=>{
        if(err)
          console.log("Error",err);
        else{
          user.id = res._id;
        }
      });
      return user
    }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');