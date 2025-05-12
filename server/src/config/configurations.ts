import dotenv from 'dotenv';
dotenv.config();

export default Object.freeze({
    PORT: process.env.PORT,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
});