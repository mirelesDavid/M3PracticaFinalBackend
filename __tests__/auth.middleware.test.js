const verifyToken = require('../middleware/auth.middleware');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  test('should be a function', () => {
    expect(typeof verifyToken).toBe('function');
  });

  test('should return 403 when no token is provided', () => {
    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      message: 'No token provided!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 403 when token is empty', () => {
    req.headers['authorization'] = '';

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      message: 'No token provided!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 when token is invalid', () => {
    req.headers['authorization'] = 'Bearer invalidtoken';

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Unauthorized!',
    });
    expect(next).not.toHaveBeenCalled();
  });
}); 