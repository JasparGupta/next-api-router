import type { NextApiRequest, NextApiResponse } from 'next';
import pipeline from './pipeline';
import { Middleware } from '../types';
import morgan from 'morgan';

describe('pipeline', () => {
    test('runs through pipeline and returns final result', () => {
        const request = {} as NextApiRequest;
        const response = {} as NextApiResponse;
        const middleware: Middleware[] = [
            jest.fn((request, response, next) => next()),
            jest.fn((request, response, next) => next()),
            jest.fn((request, response, next) => next()),
        ];
        const handler = jest.fn(() => 'Foo');

        const actual = pipeline(middleware)(handler)(request, response);

        expect(handler).toHaveBeenCalled();
        expect(actual).toBe('Foo');

        const [pipe1, pipe2, pipe3] = middleware;

        expect(pipe1).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(pipe3).toHaveBeenCalled();
    });

    test('runs through pipeline and exits where `next` is not called', () => {
        const request = {} as NextApiRequest;
        const response = {} as NextApiResponse;
        const middleware = [
            jest.fn((request, response, next) => next()),
            jest.fn((request, response, next) => 'Baz'),
            jest.fn((request, response, next) => next()),
        ];
        const handler = jest.fn(() => 'Foo');

        const actual = pipeline(middleware)(handler)(request, response);

        expect(handler).not.toHaveBeenCalled();
        expect(actual).toBe('Baz');

        const [pipe1, pipe2, pipe3] = middleware;

        expect(pipe1).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(pipe3).not.toHaveBeenCalled();
    });

    test('supports Express middleware', () => {
        const request = {} as NextApiRequest;
        const response = {} as NextApiResponse;
        const expressMiddleware = jest.fn(morgan);
        const middleware: Middleware[] = [
            // @ts-ignore
            expressMiddleware('tiny'),
            jest.fn((request, response, next) => next()),
        ];
        const handler = jest.fn(() => 'Foo');

        pipeline(middleware)(handler)(request, response);

        const [, pipe2] = middleware;

        expect(expressMiddleware).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(handler).toHaveBeenCalled();
    });
});
