const db = require('./db');

const User = db.sequelize.define('users',{
    
    id_user:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    usuario:{
        type: db.Sequelize.STRING
    },
    nome:{
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.TEXT
    },
    senha:{
        type: db.Sequelize.TEXT
    }
});

User.sync({force:false});

module.exports = User;