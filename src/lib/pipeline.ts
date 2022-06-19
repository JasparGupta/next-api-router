import type { NextApiHandler } from 'next';
import { Middleware } from '../types';

export default function pipeline([...pipes]: Middleware[]): (handler: NextApiHandler) => NextApiHandler {
    return handler => {
        return pipes
            .reverse()
            .reduce(
                (stack: NextApiHandler, pipe): NextApiHandler => (request, response) => pipe(request, response, () => stack(request, response)),
                handler
            );
    };
}
