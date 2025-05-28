const Poty = require('../models/poty.model');

describe('Poty Model', () => {
  describe('Constructor', () => {
    test('should create a new Poty instance with correct properties', () => {
      const potyData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const poty = new Poty(potyData);

      expect(poty.username).toBe('testuser');
      expect(poty.email).toBe('test@example.com');
      expect(poty.password).toBe('testpassword');
    });

    test('should handle undefined properties gracefully', () => {
      const poty = new Poty({});

      expect(poty.username).toBeUndefined();
      expect(poty.email).toBeUndefined();
      expect(poty.password).toBeUndefined();
    });
  });

  describe('Static Methods', () => {
    test('should have create method', () => {
      expect(typeof Poty.create).toBe('function');
    });

    test('should have login method', () => {
      expect(typeof Poty.login).toBe('function');
    });

    test('should have findAll method', () => {
      expect(typeof Poty.findAll).toBe('function');
    });

    test('should have updateById method', () => {
      expect(typeof Poty.updateById).toBe('function');
    });

    test('should have deleteById method', () => {
      expect(typeof Poty.deleteById).toBe('function');
    });
  });
}); 