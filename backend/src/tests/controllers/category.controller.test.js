const categoryController = require('../../controllers/category.controller');
const db = require('../../models');
const { Category } = db;

// Mock the database models
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
    },
    Sequelize: {
      Op: {
        iLike: Symbol('iLike')
      }
    }
  };
});

describe('Category Controller', () => {
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
  
  describe('findAll', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' }
      ];
      
      Category.findAll.mockResolvedValue(mockCategories);
      
      await categoryController.findAll(req, res);
      
      expect(Category.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });
    
    it('should filter categories by name', async () => {
      req.query.name = 'Test';
      
      const mockCategories = [
        { id: '1', name: 'Test Category' }
      ];
      
      Category.findAll.mockResolvedValue(mockCategories);
      
      await categoryController.findAll(req, res);
      
      expect(Category.findAll).toHaveBeenCalledWith({
        where: expect.objectContaining({
          name: expect.anything()
        })
      });
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });
    
    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      Category.findAll.mockRejectedValue(new Error(errorMessage));
      
      await categoryController.findAll(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining(errorMessage)
      });
    });
  });
  
  describe('create', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'New Category',
        icon: '🆕',
        bgColor: 'bg-blue-100'
      };
      
      req.body = categoryData;
      
      const createdCategory = {
        id: '123',
        ...categoryData,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      Category.create.mockResolvedValue(createdCategory);
      
      await categoryController.create(req, res);
      
      expect(Category.create).toHaveBeenCalledWith(expect.objectContaining({
        name: categoryData.name,
        icon: categoryData.icon,
        bgColor: categoryData.bgColor
      }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdCategory);
    });
    
    it('should return 400 if name is missing', async () => {
      req.body = {
        icon: '🆕',
        bgColor: 'bg-blue-100'
      };
      
      await categoryController.create(req, res);
      
      expect(Category.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('required')
      }));
    });
  });
}); 