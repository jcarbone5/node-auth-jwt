import { connect } from 'mongoose'

const connectToDatabase = async () => {
    try {
        await connect('mongodb://localhost/node-auth-jwt', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
        console.log('DB is conected')
    } catch (error) {
        console.log(error)
    }
}

connectToDatabase();