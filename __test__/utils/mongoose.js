
import mongoose from 'mongoose'

export const connect = ()  => mongoose.connect('mongodb://localhost:27017/auth-auth_test', {
    useNewUrlParser:  true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

export const disconnect = () => mongoose.connection.close()

