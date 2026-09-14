# 🚗 Toyota Car Dealership Website

A modern, full-stack car dealership website built with **React**, **Node.js**, and **Express**. Features a sleek design, dynamic car inventory, API integration, and contact form functionality.

![Toyota Website](https://img.shields.io/badge/Toyota-Modern_Dealership-red?style=for-the-badge&logo=toyota)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-API-lightgrey?style=for-the-badge&logo=express)

## ✨ Features

### 🎨 Frontend (React)
- **5 Responsive Pages**: Home, Models, Car Details, About, Contact
- **Modern UI/UX**: Sleek automotive design with smooth animations
- **Dynamic Routing**: Single-page application with multiple views
- **Real-time Filtering**: Filter cars by type (sedan, SUV, truck, sports)
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Mobile Responsive**: Fully responsive design for all devices

### 🔧 Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for car inventory
- **Contact Form API**: Handle customer inquiries
- **Data Filtering**: Query cars by type, price range, year
- **Search Functionality**: Search across car names and descriptions
- **Statistics Endpoint**: Get inventory analytics
- **Error Handling**: Comprehensive error handling and validation

### 🎯 Key Pages

1. **Home Page**
   - Hero section with stunning visuals
   - Featured models showcase
   - Call-to-action buttons

2. **Models Page**
   - Complete car inventory
   - Filter by vehicle type
   - Card-based layout with specs

3. **Car Details Page**
   - Detailed car information
   - Key features list
   - Specifications (HP, MPG, Year)
   - Test drive request

4. **About Page**
   - Company history
   - Core values
   - Brand pillars

5. **Contact Page**
   - Working contact form
   - Backend integration
   - Company contact info

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```
The API will run on `http://localhost:3001`

### 3. Start the React Frontend
```bash
npm run client
```
The website will open on `http://localhost:3000`

### 4. Run Both Together (Recommended)
```bash
npm run dev:all
```

## 📡 API Endpoints

### Cars
- `GET /api/cars` - Get all cars (supports filtering)
- `GET /api/cars/:id` - Get single car by ID
- `POST /api/cars` - Add new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

### Other
- `GET /api/stats` - Get inventory statistics
- `GET /api/search?q=term` - Search cars

### Example API Usage

**Get all cars:**
```bash
curl http://localhost:3001/api/cars
```

**Filter by type:**
```bash
curl http://localhost:3001/api/cars?type=suv
```

**Submit contact form:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "message": "Interested in the Camry"n
  }'
```

**Get statistics:**
```bash
curl http://localhost:3001/api/stats
```

## 🏗️ Project Structure

```
toyota-website/
├── App.jsx                 # Main React application
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── README.md             # Documentation
└── public/               # Public assets (auto-created)
    └── index.html        # HTML template
```

## 🎨 Design Features

- **Typography**: Custom Google Fonts (Rajdhani + Poppins)
- **Color Scheme**: Toyota red (#EB0A1E) with dark theme
- **Animations**: Smooth fade-ins, slides, and transitions
- **Responsive**: Mobile-first design approach
- **Modern**: Gradient backgrounds, glassmorphism effects

## 🔐 Security Features

- CORS enabled for cross-origin requests
- Input validation on contact forms
- Email format validation
- Error handling middleware
- Safe query parameter handling

## 📊 Sample Data

The application includes 6 pre-loaded vehicles:
- Toyota Camry 2024 (Sedan)
- Toyota RAV4 2024 (SUV)
- Toyota Corolla 2024 (Sedan)
- Toyota Highlander 2024 (SUV)
- Toyota Tacoma 2024 (Truck)
- Toyota GR Supra 2024 (Sports)

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, etc.)
```bash
# Set environment variable
export NODE_ENV=production

# Start server
npm start
```

### Frontend Deployment (Vercel, Netlify)
```bash
# Build for production
npm run build

# Deploy the 'build' folder
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **Lucide React** - Icon library
- **CSS-in-JS** - Inline styling
- **Google Fonts** - Typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

## 📝 Future Enhancements

- [ ] User authentication & login
- [ ] Shopping cart functionality
- [ ] Real-time inventory updates
- [ ] Payment gateway integration
- [ ] Customer reviews and ratings
- [ ] Appointment scheduling
- [ ] Live chat support
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Image upload for cars
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Test drive booking system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ by Muneeb  - Demonstrating full-stack web development capabilities

## 📞 Support

For issues or questions, please open an issue on GitHub or contact support@toyota-demo.com

---

**Note**: This is a demonstration project showcasing modern web development practices. For production use, implement proper database integration, authentication, and security measures.

## 🎯 Quick Start Commands

```bash
# Install all dependencies
npm install

# Run backend only
npm start

# Run frontend only  
npm run client

# Run both together
npm run dev:all

# Production build
npm run build
```

**Enjoy exploring the Toyota website! 🚗💨**
