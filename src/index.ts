import { Middleware } from './types';
import Router from './lib/router';

export { Middleware } from './types';

export default function router(...middleware: Middleware[]): Router {
    return new Router(...middleware);
}
