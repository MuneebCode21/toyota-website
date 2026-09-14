// Toyota Website Backend - Node.js + Express Server
// This server provides REST API endpoints for the car inventory and contact form

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database (in production, this would be MongoDB, PostgreSQL, etc.)
let carsDatabase = [
  {
    id: 1,
    name: 'Toyota Camry 2024',
    type: 'sedan',
    price: 28000,
    year: 2024,
    mileage: 25,
    horsepower: 203,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    description: 'Experience refined comfort and cutting-edge technology in the all-new Camry.',
    features: ['Adaptive Cruise Control', 'Lane Departure Warning', 'Apple CarPlay', 'LED Headlights'],
    inStock: true,
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Hybrid'
  },
  {
    id: 2,
    name: 'Toyota RAV4 2024',
    type: 'suv',
    price: 32000,
    year: 2024,
    mileage: 28,
    horsepower: 203,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop',
    description: 'Adventure-ready SUV with unmatched versatility and fuel efficiency.',
    features: ['All-Wheel Drive', 'Panoramic Sunroof', 'Smart Key', 'Power Liftgate'],
    inStock: true,
    color: 'Blue',
    transmission: 'Automatic',
    fuelType: 'Gasoline'
  },
  {
    id: 3,
    name: 'Toyota Corolla 2024',
    type: 'sedan',
    price: 22000,
    year: 2024,
    mileage: 33,
    horsepower: 169,
    image: 'https://images.unsplash.com/photo-1627454820516-ddb0cd01b8cc?w=800&auto=format&fit=crop',
    description: 'The world\'s best-selling car, now with hybrid efficiency.',
    features: ['Hybrid Technology', 'Toyota Safety Sense', 'Wireless Charging', 'Dual-Zone Climate'],
    inStock: true,
    color: 'Red',
    transmission: 'CVT',
    fuelType: 'Hybrid'
  },
  {
    id: 4,
    name: 'Toyota Highlander 2024',
    type: 'suv',
    price: 38000,
    year: 2024,
    mileage: 24,
    horsepower: 295,
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&auto=format&fit=crop',
    description: 'Premium family SUV with three rows of comfort and sophistication.',
    features: ['3-Row Seating', 'JBL Audio', 'Rear Entertainment', 'Hands-Free Liftgate'],
    inStock: true,
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Hybrid'
  },
  {
    id: 5,
    name: 'Toyota Tacoma 2024',
    type: 'truck',
    price: 34000,
    year: 2024,
    mileage: 20,
    horsepower: 278,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    description: 'Legendary off-road capability meets modern refinement.',
    features: ['4x4 System', 'Crawl Control', 'Multi-Terrain Select', 'Tow Package'],
    inStock: true,
    color: 'Gray',
    transmission: 'Manual',
    fuelType: 'Gasoline'
  },
  {
    id: 6,
    name: 'Toyota GR Supra 2024',
    type: 'sports',
    price: 55000,
    year: 2024,
    mileage: 22,
    horsepower: 382,
    image: 'https://images.unsplash.com/photo-1552519507-0fdee870ac9d?w=800&auto=format&fit=crop',
    description: 'Pure driving exhilaration in an iconic sports car design.',
    features: ['Turbocharged Engine', 'Sport-Tuned Suspension', 'Track Mode', 'Carbon Fiber Accents'],
    inStock: true,
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Gasoline'
  }
];

let contactSubmissions = [];

// ============================================
// API ROUTES
// ============================================

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Toyota API',
    version: '1.0.0',
    endpoints: {
      cars: '/api/cars',
      car: '/api/cars/:id',
      contact: '/api/contact',
      stats: '/api/stats'
    }
  });
});

// GET all cars
app.get('/api/cars', (req, res) => {
  const { type, minPrice, maxPrice, year } = req.query;
  
  let filteredCars = [...carsDatabase];

  // Filter by type
  if (type && type !== 'all') {
    filteredCars = filteredCars.filter(car => car.type === type);
  }

  // Filter by price range
  if (minPrice) {
    filteredCars = filteredCars.filter(car => car.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    filteredCars = filteredCars.filter(car => car.price <= parseInt(maxPrice));
  }

  // Filter by year
  if (year) {
    filteredCars = filteredCars.filter(car => car.year === parseInt(year));
  }

  res.json({
    success: true,
    count: filteredCars.length,
    data: filteredCars
  });
});

// GET single car by ID
app.get('/api/cars/:id', (req, res) => {
  const car = carsDatabase.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    return res.status(404).json({
      success: false,
      message: 'Car not found'
    });
  }

  res.json({
    success: true,
    data: car
  });
});

// POST new car (admin functionality)
app.post('/api/cars', (req, res) => {
  const newCar = {
    id: carsDatabase.length + 1,
    ...req.body,
    createdAt: new Date()
  };

  carsDatabase.push(newCar);

  res.status(201).json({
    success: true,
    message: 'Car added successfully',
    data: newCar
  });
});

// UPDATE car
app.put('/api/cars/:id', (req, res) => {
  const carIndex = carsDatabase.findIndex(c => c.id === parseInt(req.params.id));
  
  if (carIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Car not found'
    });
  }

  carsDatabase[carIndex] = {
    ...carsDatabase[carIndex],
    ...req.body,
    updatedAt: new Date()
  };

  res.json({
    success: true,
    message: 'Car updated successfully',
    data: carsDatabase[carIndex]
  });
});

// DELETE car
app.delete('/api/cars/:id', (req, res) => {
  const carIndex = carsDatabase.findIndex(c => c.id === parseInt(req.params.id));
  
  if (carIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Car not found'
    });
  }

  const deletedCar = carsDatabase.splice(carIndex, 1);

  res.json({
    success: true,
    message: 'Car deleted successfully',
    data: deletedCar[0]
  });
});

// POST contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  const submission = {
    id: contactSubmissions.length + 1,
    name,
    email,
    phone: phone || 'Not provided',
    message,
    submittedAt: new Date(),
    status: 'pending'
  };

  contactSubmissions.push(submission);

  // In production, you would:
  // 1. Send email notification
  // 2. Store in database
  // 3. Trigger CRM integration
  
  console.log('New contact submission:', submission);

  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us! We will get back to you soon.',
    data: {
      id: submission.id,
      submittedAt: submission.submittedAt
    }
  });
});

// GET contact submissions (admin)
app.get('/api/contact', (req, res) => {
  res.json({
    success: true,
    count: contactSubmissions.length,
    data: contactSubmissions
  });
});

// GET statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalCars: carsDatabase.length,
    carsByType: {
      sedan: carsDatabase.filter(c => c.type === 'sedan').length,
      suv: carsDatabase.filter(c => c.type === 'suv').length,
      truck: carsDatabase.filter(c => c.type === 'truck').length,
      sports: carsDatabase.filter(c => c.type === 'sports').length
    },
    averagePrice: Math.round(carsDatabase.reduce((sum, car) => sum + car.price, 0) / carsDatabase.length),
    inStock: carsDatabase.filter(c => c.inStock).length,
    totalContactSubmissions: contactSubmissions.length
  };

  res.json({
    success: true,
    data: stats
  });
});

// Search cars
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search query'
    });
  }

  const searchTerm = q.toLowerCase();
  const results = carsDatabase.filter(car => 
    car.name.toLowerCase().includes(searchTerm) ||
    car.type.toLowerCase().includes(searchTerm) ||
    car.description.toLowerCase().includes(searchTerm)
  );

  res.json({
    success: true,
    count: results.length,
    query: q,
    data: results
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   TOYOTA API SERVER RUNNING           ║
  ║   Port: ${PORT}                          ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}            ║
  ║   API Docs: http://localhost:${PORT}   ║
  ╚═══════════════════════════════════════╝
  
  Available Endpoints:
  - GET    /api/cars              (Get all cars)
  - GET    /api/cars/:id          (Get car by ID)
  - POST   /api/cars              (Add new car)
  - PUT    /api/cars/:id          (Update car)
  - DELETE /api/cars/:id          (Delete car)
  - POST   /api/contact           (Submit contact form)
  - GET    /api/contact           (Get all submissions)
  - GET    /api/stats             (Get statistics)
  - GET    /api/search?q=term     (Search cars)
  `);
});

module.exports = app;
