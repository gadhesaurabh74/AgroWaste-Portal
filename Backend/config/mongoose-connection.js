const mongoose = require('mongoose');
const config=require('config');


mongoose.connect(`${config.get("MONGODB_URI")}/AgroPlus`)
.then(() => {
    console.log("Connected to database");
})

.catch(error => {
    console.log("Error connecting to database");
});

module.exports = mongoose.connection;