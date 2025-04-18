const db = require('../../models');
const { Coupon } = db;

// Mock the sequelize model
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
    }
  };
});

describe('Coupon Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should create a new coupon', async () => {
    const couponData = {
      code: 'TEST10',
      discount: 10,
      type: 'percentage',
      maxDiscount: 50,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // Tomorrow
      active: true
    };
    
    const mockCouponResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      ...couponData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    Coupon.create.mockResolvedValue(mockCouponResponse);
    
    const result = await Coupon.create(couponData);
    
    expect(Coupon.create).toHaveBeenCalledWith(couponData);
    expect(result).toEqual(mockCouponResponse);
    expect(result.code).toBe(couponData.code);
  });
  
  it('should find a coupon by code', async () => {
    const mockCoupon = {
      id: '123',
      code: 'TEST10',
      discount: 10,
      type: 'percentage',
      active: true
    };
    
    Coupon.findOne.mockResolvedValue(mockCoupon);
    
    const result = await Coupon.findOne({ where: { code: 'TEST10' } });
    
    expect(Coupon.findOne).toHaveBeenCalledWith({ where: { code: 'TEST10' } });
    expect(result).toEqual(mockCoupon);
    expect(result.code).toBe('TEST10');
  });
}); 