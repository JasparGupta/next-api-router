import { Method, Middleware } from '../types';

export default function checkHttpMethod(methods: Method | Method[]): Middleware {
    return (request, response, next) => {
        const requestMethod = request.method?.toLowerCase();

        if (
            methods !== 'any'
            && (requestMethod !== methods || (Array.isArray(methods) && !methods.includes(requestMethod)))
        ) {
            return response.status(405).json({ message: 'Method not allowed' });
        }

        return next();
    };
};
