import router from './index';
import Router from './lib/router';

describe('router', () => {
  test('returns a new Router instance', () => {
    expect(router()).toBeInstanceOf(Router);
  });
});
