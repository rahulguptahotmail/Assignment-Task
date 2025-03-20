const mongoose= require('mongoose');

const connection = async()=>
{
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

connection();