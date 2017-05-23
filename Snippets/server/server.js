// general server-side code
//will get specific if needed later
//console.log("use this to debug stuff!");

//This function returns a cursor to the client
//publishes/broadcasts that on the snippets channel (see tmpl-snippets.html)
//Must be subscribed to on the client side as well
Meteor.publish('snippets', function(){
    return Snippets.find({});
});
