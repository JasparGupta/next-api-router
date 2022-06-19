import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export default interface Middleware {
    (request: NextApiRequest, response: NextApiResponse, next: () => any): unknown,
}
