import Router from './router';
import { Method } from '../types';

describe('Router', () => {
    describe.each<Method>([
        'any',
        'delete',
        'get',
        'head',
        'options',
        'patch',
        'post',
        'put',
    ])('%s', (method) => {
        test(`declares a route matching "${method}" http request method`, async () => {
            const router = new Router();

            // @ts-ignore
            const spyRoute = jest.spyOn(router, 'route');

            // @ts-ignore
            router[method]();

            expect(spyRoute).toHaveBeenCalledWith(method);

            spyRoute.mockRestore();
        });
    });

    describe('match', () => {
        test('declares a route matching any of the given http request methods', async () => {
            const router = new Router();

            // @ts-ignore
            const spyRoute = jest.spyOn(router, 'route');

            router.match(['get', 'post']);

            expect(spyRoute).toHaveBeenCalledWith(['get', 'post']);

            spyRoute.mockRestore();
        });
    });
});
