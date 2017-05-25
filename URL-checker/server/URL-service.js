var conn = DDP.connect('localhost:3000');
Snippets = new Mongo.Collection('snippets', conn);

//used for admin/security?
Tokens = new Mongo.Collection('user-tokens');

var token = Tokens.findOne({});

if (!token){
    initLogin();
    console.log("initialize");
} else {
    loginWithToken(token);
    console.log('logging in with token...');
}

//if we have a valid token we will proceed
if (token){
    conn.subscribe('snippets-admin', function(){
        Snippets.find({}).observeChanges({
            added: function(id, s){
                if (!s.text || s.URL) return;
                if (s.text.indexOf('http')==0){
                    s.URL = s.text;
                    try {
                        Snippets.update({_id:id}, {$set:s});
                        console.log("Added a URL");
                    } catch (e){
                        console.log('ERROR updating ', id);
                        console.log(e);
                    }
                }
            }
        });
    });
}

function initLogin(){
    conn.call("login", {
        user : {
            email:'admin@test.com'
        },
        password:'meteor'
    },
    function(err,result){
        if (err){
            console.log('ERROR logging in:');
            console.log(err);
            return;
        }
        Tokens.upsert({
            userid: result.id
        }, {
            $set: result
        });
    });
}

function loginWithToken(token){
    conn.call('login',
    {'resume' : token.token},
    function(err,res){
        if (err){
            Tokens.remove(mmm);
            console.log('ERROR logging in with token: ');
            console.log(err);
            initLogin(); //if the token didn't work, try logging in
            return;
        }
        Token.upsert({userid:res.id}, {$set:res});
    });
}

