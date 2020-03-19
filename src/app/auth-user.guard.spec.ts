import {AuthUserGuard} from './auth-user.guard';

describe('AuthGuard', () => {
  let authUserGuard: AuthUserGuard;
  let authServiceFake;

  it('can activate route for authenticated user', () => {
    authServiceFake = { isAuthenticated: () => true };
    authUserGuard = new AuthUserGuard(authServiceFake);

    expect(authUserGuard.canActivate()).toBeTruthy();
  });

  it('rejects route for unauthenticated user', () => {
    authServiceFake = { isAuthenticated: () => false };
    authUserGuard = new AuthUserGuard(authServiceFake);

    expect(authUserGuard.canActivate()).toBeFalsy();
  });
});
