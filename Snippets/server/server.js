// general server-side code
//will get specific if needed later
//console.log("use this to debug stuff!");

//This function returns a cursor to the client
//publishes/broadcasts that on the snippets channel (see tmpl-snippets.html)
//Must be subscribed to on the client side as well
Meteor.publish('snippets', function(){
    return Snippets.find({owner:this.userId});
})

Meteor.publish('snippets-admin',function(){
    return Snippets.find({}); //we want ALL URL's
});

//Makes sure that users are logged in before adding anything to the snippets list
Snippets.allow({
    insert: function(userId, fields){
        return(userId); //make sure user is logged in
    },
    update: function(userId, fields){
        return(userId); //same as above
    }
})
