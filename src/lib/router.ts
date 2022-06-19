import type { NextApiHandler } from 'next';
import pipeline from './pipeline';
import { Method, Middleware } from '../types';
import checkHttpMethod from './check-http-method';

interface Handler {
    (handler: NextApiHandler): NextApiHandler,
}

export default class Router {
    private readonly middleware: Middleware[];

    constructor(...middleware: Middleware[]) {
        this.middleware = middleware;
    }

    public any(...middleware: Middleware[]): Handler {
        return this.route('any', ...middleware);
    }

    public delete(...middleware: Middleware[]): Handler {
        return this.route('delete', ...middleware);
    }

    public get(...middleware: Middleware[]): Handler {
        return this.route('get', ...middleware);
    }

    public head(...middleware: Middleware[]): Handler {
        return this.route('head', ...middleware);
    }

    public match(methods: Method[], ...middleware: Middleware[]): Handler {
        return this.route(methods, ...middleware);
    }

    public options(...middleware: Middleware[]): Handler {
        return this.route('options', ...middleware);
    }

    public patch(...middleware: Middleware[]): Handler {
        return this.route('patch', ...middleware);
    }

    public post(...middleware: Middleware[]): Handler {
        return this.route('post', ...middleware);
    }

    public put(...middleware: Middleware[]): Handler {
        return this.route('put', ...middleware);
    }

    protected route(method: Method | Method[], ...middleware: Middleware[]): Handler {
        return pipeline([checkHttpMethod(method), ...this.middleware, ...middleware]);
    }
}
