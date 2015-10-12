var auth = {}

auth.loginUser =  function(req, res) {
    console.log('Are you sure you want to log in this user ??');
    console.log(req.body)
}


auth.signupUser = function (req, res) {
    console.log('You are about to sign in this person.. Do you want to proceed??')
    console.log(req.body)
}


auth.returnUserDetails =  function(req, res) {
    console.log('You are trying to get this user information');
    console.log(req.body)    
    console.log(req.params)    
}

module.exports = auth