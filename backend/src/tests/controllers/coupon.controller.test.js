const couponController = require('../../controllers/coupon.controller');
const db = require('../../models');
const { Coupon } = db;

// Mock the database models
jest.mock('../../models', () => {
  const mockCoupon = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
  
  return {
    Coupon: mockCoupon,
    sequelize: {
      sync: jest.fn().mockResolvedValue(),
      close: jest.fn().mockResolvedValue()
    },
    Sequelize: {
      Op: {
        and: Symbol('and'),
        or: Symbol('or'),
        lte: Symbol('lte'),
        gte: Symbol('gte')
      }
    }
  };
});

describe('Coupon Controller', () => {
  let req, res;
  
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    req = {
      params: {},
      query: {},
      body: {}
    };
    jest.clearAllMocks();
  });
  
  describe('validateCoupon', () => {
    it('should validate an active coupon', async () => {
      req.params.code = 'VALID10';
      
      const mockCoupon = {
        id: '123',
        code: 'VALID10',
        discount: 10,
        type: 'percentage',
        maxDiscount: 50,
        active: true
      };
      
      Coupon.findOne.mockResolvedValue(mockCoupon);
      
      await couponController.validateCoupon(req, res);
      
      expect(Coupon.findOne).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        valid: true,
        coupon: expect.objectContaining({
          code: 'VALID10',
          discount: 10,
          type: 'percentage'
        })
      });
    });
    
    it('should return invalid for non-existent coupon', async () => {
      req.params.code = 'INVALID';
      
      Coupon.findOne.mockResolvedValue(null);
      
      await couponController.validateCoupon(req, res);
      
      expect(Coupon.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        valid: false
      }));
    });
    
    it('should handle errors', async () => {
      req.params.code = 'ERROR';
      
      const errorMessage = 'Database error';
      Coupon.findOne.mockRejectedValue(new Error(errorMessage));
      
      await couponController.validateCoupon(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        valid: false,
        message: expect.stringContaining(errorMessage)
      }));
    });
  });
  
  describe('create', () => {
    it('should create a new coupon', async () => {
      const couponData = {
        code: 'NEW20',
        discount: 20,
        type: 'percentage',
        maxDiscount: 100,
        active: true
      };
      
      req.body = couponData;
      
      const createdCoupon = {
        id: '123',
        ...couponData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      Coupon.create.mockResolvedValue(createdCoupon);
      
      await couponController.create(req, res);
      
      expect(Coupon.create).toHaveBeenCalledWith(couponData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdCoupon);
    });
  });
}); 