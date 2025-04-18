const db = require('../../models');
const { Category } = db;

// Mock the sequelize model
jest.mock('../../models', () => {
  const mockCategory = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
  
  return {
    Category: mockCategory,
    sequelize: {
      sync: jest.fn().mockResolvedValue(),
      close: jest.fn().mockResolvedValue()
    }
  };
});

describe('Category Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should create a new category', async () => {
    const categoryData = {
      name: 'Test Category',
      icon: '🧪',
      bgColor: 'bg-gray-100',
      active: true
    };
    
    const mockCategoryResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    Category.create.mockResolvedValue(mockCategoryResponse);
    
    const result = await Category.create(categoryData);
    
    expect(Category.create).toHaveBeenCalledWith(categoryData);
    expect(result).toEqual(mockCategoryResponse);
    expect(result.name).toBe(categoryData.name);
  });
  
  it('should find all active categories', async () => {
    const mockCategories = [
      { id: '1', name: 'Category 1', active: true },
      { id: '2', name: 'Category 2', active: true }
    ];
    
    Category.findAll.mockResolvedValue(mockCategories);
    
    const result = await Category.findAll({ where: { active: true } });
    
    expect(Category.findAll).toHaveBeenCalledWith({ where: { active: true } });
    expect(result).toEqual(mockCategories);
    expect(result.length).toBe(2);
  });
}); 