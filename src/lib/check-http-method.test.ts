import type { NextApiRequest, NextApiResponse } from 'next';
import checkHttpMethod from './check-http-method';
import { Method } from '../types';

describe('checkHttpMethod', () => {
    test.each<[Method | Method[], Method]>([
        ['get', 'post'],
        [['put', 'patch'], 'get']
    ])('405 response is returned if request method does not match provided method', (methodToValidate, requestMethod) => {
        const request = { method: requestMethod } as NextApiRequest;
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;
        const next = jest.fn();

        checkHttpMethod(methodToValidate)(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(405);
        expect(response.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
    });

    test.each<Method>([
        'delete', 'get', 'head', 'options', 'patch', 'post', 'put'
    ])('[%s] next middleware is called if methods match', (method) => {
        const request = { method } as NextApiRequest;
        const response = {} as NextApiResponse;
        const next = jest.fn();

        checkHttpMethod(method)(request, response, next);

        expect(next).toHaveBeenCalled();
    });

    test.each<Method>([
        'delete', 'get', 'head', 'options', 'patch', 'post', 'put'
    ])('[%s] when method is "any" always call next middleware', (method) => {
        const request = { method } as NextApiRequest;
        const response = {} as NextApiResponse;
        const next = jest.fn();

        checkHttpMethod('any')(request, response, next);

        expect(next).toHaveBeenCalled();
    });
});
