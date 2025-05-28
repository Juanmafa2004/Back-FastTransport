import cors from 'cors';


const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'https://4s1nkwvt-3000.use.devtunnels.ms',
    'http://localhost:3000',
    "https://fast-transport.vercel.app"
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors(
    {
        origin: (origin, callback) => {

            if (acceptedOrigins.includes(origin) || !origin) {
                callback(null, origin);
            } else {
                callback(new Error('Origin not allowed'));
            }
        }
    }

)