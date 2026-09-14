# Toyota API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, no authentication is required. Future versions will implement JWT-based authentication.

---

## Endpoints

### 1. Get All Cars
Retrieve the complete car inventory with optional filtering.

**Endpoint:** `GET /api/cars`

**Query Parameters:**
- `type` (optional): Filter by car type (sedan, suv, truck, sports, all)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `year` (optional): Filter by year

**Example Request:**
```bash
curl http://localhost:3001/api/cars
curl http://localhost:3001/api/cars?type=suv
curl http://localhost:3001/api/cars?minPrice=25000&maxPrice=40000
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "Toyota Camry 2024",
      "type": "sedan",
      "price": 28000,
      "year": 2024,
      "mileage": 25,
      "horsepower": 203,
      "image": "...",
      "description": "...",
      "features": [...],
      "inStock": true,
      "color": "Silver",
      "transmission": "Automatic",
      "fuelType": "Hybrid"
    }
  ]
}
```

---

### 2. Get Single Car
Retrieve details of a specific car by ID.

**Endpoint:** `GET /api/cars/:id`

**Example Request:**
```bash
curl http://localhost:3001/api/cars/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Toyota Camry 2024",
    "type": "sedan",
    "price": 28000
  }
}
```

---

### 3. Add New Car
Add a new car to the inventory (Admin functionality).

**Endpoint:** `POST /api/cars`

**Request Body:**
```json
{
  "name": "Toyota Prius 2024",
  "type": "sedan",
  "price": 26000,
  "year": 2024,
  "mileage": 56,
  "horsepower": 121,
  "image": "https://example.com/image.jpg",
  "description": "Eco-friendly hybrid sedan",
  "features": ["Hybrid", "Low Emissions"],
  "inStock": true,
  "color": "White",
  "transmission": "CVT",
  "fuelType": "Hybrid"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3001/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Toyota Prius 2024",
    "type": "sedan",
    "price": 26000,
    "year": 2024,
    "mileage": 56,
    "horsepower": 121,
    "description": "Eco-friendly hybrid sedan"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Car added successfully",
  "data": {
    "id": 7,
    "name": "Toyota Prius 2024"
  }
}
```

---

### 4. Update Car
Update an existing car's information.

**Endpoint:** `PUT /api/cars/:id`

**Request Body:** (Any fields to update)
```json
{
  "price": 27000,
  "inStock": false
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3001/api/cars/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 27000}'
```

---

### 5. Delete Car
Remove a car from inventory.

**Endpoint:** `DELETE /api/cars/:id`

**Example Request:**
```bash
curl -X DELETE http://localhost:3001/api/cars/1
```

**Response:**
```json
{
  "success": true,
  "message": "Car deleted successfully",
  "data": {
    "id": 1,
    "name": "Toyota Camry 2024"
  }
}
```

---

### 6. Submit Contact Form
Submit a customer inquiry or message.

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "message": "I'm interested in the RAV4"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "message": "I am interested in the RAV4"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "id": 1,
    "submittedAt": "2024-02-11T10:30:00.000Z"
  }
}
```

**Validation:**
- `name`: Required
- `email`: Required, must be valid email format
- `phone`: Optional
- `message`: Required

---

### 7. Get Contact Submissions
Retrieve all contact form submissions (Admin).

**Endpoint:** `GET /api/contact`

**Example Request:**
```bash
curl http://localhost:3001/api/contact
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "message": "...",
      "submittedAt": "2024-02-11T10:30:00.000Z",
      "status": "pending"
    }
  ]
}
```

---

### 8. Get Statistics
Get inventory and submission statistics.

**Endpoint:** `GET /api/stats`

**Example Request:**
```bash
curl http://localhost:3001/api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCars": 6,
    "carsByType": {
      "sedan": 2,
      "suv": 2,
      "truck": 1,
      "sports": 1
    },
    "averagePrice": 34833,
    "inStock": 6,
    "totalContactSubmissions": 5
  }
}
```

---

### 9. Search Cars
Search for cars by name, type, or description.

**Endpoint:** `GET /api/search`

**Query Parameters:**
- `q` (required): Search query

**Example Request:**
```bash
curl http://localhost:3001/api/search?q=camry
curl http://localhost:3001/api/search?q=hybrid
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "query": "hybrid",
  "data": [
    {
      "id": 1,
      "name": "Toyota Camry 2024",
      "fuelType": "Hybrid"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide name, email, and message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Car not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Something went wrong!"
}
```

---

## Testing with Postman

1. Import the following collection into Postman
2. Set base URL variable: `http://localhost:3001`
3. Test all endpoints

### Quick Postman Tests:

**Test 1: Get All Cars**
- Method: GET
- URL: `{{baseUrl}}/api/cars`

**Test 2: Filter SUVs**
- Method: GET
- URL: `{{baseUrl}}/api/cars?type=suv`

**Test 3: Submit Contact**
- Method: POST
- URL: `{{baseUrl}}/api/contact`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Test message"
}
```

**Test 4: Search**
- Method: GET
- URL: `{{baseUrl}}/api/search?q=toyota`

---

## Rate Limiting
Currently, no rate limiting is implemented. In production, implement rate limiting to prevent abuse.

## CORS
CORS is enabled for all origins in development. In production, restrict to specific domains.

## Future Enhancements
- JWT Authentication
- Role-based access control
- File upload for car images
- Pagination for large datasets
- Advanced search with multiple filters
- Caching with Redis
- WebSocket for real-time updates
