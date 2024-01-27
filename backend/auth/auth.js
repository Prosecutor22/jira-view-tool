var connection = require('../db').connection;

async function authenticateAdmin(username, password) {
    if (username == "admin" && password == "bgsv-eds31") return {id: "admin", role: "admin"};
    else return null; 
}

async function authenticateTeam(username, password) {
    if (username == "user" && password == "bgsv-eds31") return {id: "team", role: "team"};
    else return null;
    // return new Promise((resolve, reject) => {
        
    //     const query = `SELECT * FROM user NATURAL JOIN student WHERE username=? AND password=?`;
    //     connection.query(query, [username, password], (err, result) => {
    //         if (err) reject(err);
    //         else if (result.length == 0) resolve(null);
    //         else resolve({
    //             role: "student",
    //             ...result[0]
    //         }); 
    //     })
    // });
}

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
    }
}

module.exports = {authenticateAdmin, authenticateTeam, authorize}