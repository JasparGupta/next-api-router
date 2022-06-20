# next-api-router

The motivation for this package was basically the want to write NextJS API routes more declaratively with a means to easily supply a pipeline of middleware.

_Note: This was created primarily for personal use, don't expect active maintenance. By all means fork/open PR's, just manage your expectations_ ❤️ 

## Installation

Create/add registry scope to your `.npmrc` file.

```
@jaspargupta:registry=https://npm.pkg.github.com/
```

Install the package via `npm`.

```
npm i @jaspargupta/next-api-router
```

## Usage

```typescript
// pages/api/foos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import router from '@jaspargupta/nextjs-api-router';

const route = router(/** Commonly used middleware. */);

export default route.get(/** Route middleware. */)((request: NextApiRequest, response: NextApiResponse) => {
    /**
     * Write your NextJS api handler code as normal.
     */
});
```

### Writing middleware
```typescript
import router, { Middleware } from '@jaspargupta/nextjs-api-router';

const route = router();

const doSomething: Middleware = (request, response, next) => {
    // Do the thing.
    
    return next();
}

export default route.post(doSomething)((request, response) => {
    /**
     * Write your NextJS api handler code as normal.
     */
});
```

### Express middleware
The syntax is compatible with Express middlewares that are currently available, allowing seemless integration with your favourite Express middleware packages.

```typescript
import router from '@jaspargupta/nextjs-api-router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const route = router(cookieParser());

export default route.get(cors())((request, response) => {
    /**
     * Write your NextJS api handler code as normal.
     */
});
```

## API

### `router()` helper.
Creats a new `Router` instance.
```typescript
const route = router(...middleware: Middleware[]): Router;
// Same as.
const route = new Router(...middleware: Middleware[]);
```

### `Router` instance.
Each method returns a function that accepts a `NextApiHandler` function.

| Method                                                        | Description                             |
|---------------------------------------------------------------|-----------------------------------------|
| `route.any(...middleware: Middleware[])`                      | Accepts any HTTP method.                |
| `route.delete(...middleware: Middleware[])`                   | Accepts only the `delete` HTTP method.  |
| `route.get(...middleware: Middleware[])`                      | Accepts only the `get` HTTP method.     |
| `route.head(...middleware: Middleware[])`                     | Accepts only the `head` HTTP method.    |
| `route.match(methods: string[], ...middleware: Middleware[])` | Accepts any of the given HTTP methods.  |
| `route.options(...middleware: Middleware[])`                  | Accepts only the `options` HTTP method. |
| `route.patch(...middleware: Middleware[])`                    | Accepts only the `patch` HTTP method.   |
| `route.post(...middleware: Middleware[])`                     | Accepts only the `post` HTTP method.    |
| `route.put(...middleware: Middleware[])`                      | Accepts only the `put` HTTP method.     |
