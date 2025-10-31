const db = require('./db');
const User = require('./Users');

const Post = db.sequelize.define('postagens',{
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    },
    usuario:{
        type: db.Sequelize.INTEGER,
        references:{ model: 'users', key:'id_user'},
        onDelete: 'CASCADE',
        allowNull:false,
    }
    
});

Post.belongsTo(User, { foreignKey: 'usuario', onDelete: 'CASCADE' });

Post.sync({force:false});

module.exports = Post;