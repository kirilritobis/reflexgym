const mongoose = require('mongoose')

const connectionStringMain = 'mongodb+srv://kitodorovAdmin:100Kilatashaci@Cluster0.6c3aq.mongodb.net/Cluster0?retryWrites=true&w=majority'
// const connectionStringSec = process.env.MONGODB_URL_SECONDARY

var conn = mongoose.createConnection(connectionStringMain,
    {
        readPreference: 'secondaryPreferred',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAliveInitialDelay: 300000,
        connectTimeoutMS: 300000,
        keepAlive: true
        // poolSize: 10 // Maintain up to 10 socket connections
        //     // If not connected, return errors immediately rather than waiting for reconnect
        //     // bufferMaxEntries: 0
})

module.exports = { conn }
