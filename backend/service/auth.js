const sessionIDUSER = new Map();

function setUser(id, user){
    sessionIDUSER.set(id, user);
}

function getUser(id){
    return sessionIDUSER.get(id);
}

module.exports = {
    setUser,
    getUser
}