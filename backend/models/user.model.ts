module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("user",{
        username:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })
    return User
}