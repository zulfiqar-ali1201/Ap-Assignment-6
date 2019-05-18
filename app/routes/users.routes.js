module.exports=(app)=>{
    const users=require('../controller/user.controller');

    //Creating a New User
    app.post('/users',users.create);

    //Retreive/read all Users
    app.get('/users',users.selectAll);

    //update any user
    app.put('/users/:UserId',users.update);

    //delete any user
    app.delete('/users/:UserId',users.delete);

    

}