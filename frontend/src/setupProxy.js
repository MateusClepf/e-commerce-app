const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Add headers middleware
  app.use(function(req, res, next) {
    // Allow specific monitoring domains
    const monitoringOrigin1 = process.env.MONITORING_ORIGIN_1 || 'https://monitoring-service1.com';
    const monitoringOrigin2 = process.env.MONITORING_ORIGIN_2 || 'https://monitoring-service2.com';
    
    res.setHeader('Access-Control-Allow-Origin', `${monitoringOrigin1}, ${monitoringOrigin2}`);
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    
    // Allow cookies
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
  });
};