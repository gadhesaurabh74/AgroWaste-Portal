# Agro Waste Selling & Buying Platform API Documentation

This documentation provides detailed information about the API endpoints, models, and technologies used in the Agro Waste Selling & Buying Platform. This platform facilitates the buying and selling of agricultural waste products, allowing users to register as sellers or buyers, list products, make offers, and process payments.

## Models

### User
Represents a user of the platform, who can either be a seller or a buyer.
- **Role-based**: Users can have roles such as Seller or Buyer.
- **Fields:**
    - `id`: Unique identifier for the user.
    - `name`: Full name of the user.
    - `email`: Email address (unique).
    - `password`: Encrypted password.
    - `role`: Either "Seller" or "Buyer".
    - `state`: State of residence.
    - `district`: District within the state.
    - `taluka`: Taluka/Tehsil of the district.
    - `village_city`: Village or city name.
    - `createdAt`: Timestamp when the user was created.

### Product
Represents agricultural waste products listed for sale by sellers.
- **Fields:**
    - `id`: Unique identifier for the product.
    - `sellerId`: User ID of the seller.
    - `name`: Name of the product.
    - `description`: Details about the waste.
    - `price`: Price set by the seller.
    - `category`: Type of waste.
    - `quantity`: Quantity available for sale.
    - `unit`: Unit of measurement (e.g., kg, ton).
    - `location`: Location of the product.
    - `createdAt`: Timestamp when the product was listed.

### Offer
Represents offers made by buyers on products listed by sellers.
- **Fields:**
    - `id`: Unique identifier for the offer.
    - `buyerId`: User ID of the buyer.
    - `productId`: Product ID for which the offer is made.
    - `offeredPrice`: Price the buyer is willing to pay.
    - `status`: Offer status (`pending`, `accepted`, `rejected`).
    - `createdAt`: Timestamp when the offer was made.

### Reel (Optional)
Stores data about video reels related to waste selling.
- **Fields:**
    - `id`: Unique identifier for the reel.
    - `userId`: User ID who uploaded the reel.
    - `videoUrl`: URL of the reel.
    - `description`: Short description of the reel.
    - `createdAt`: Timestamp when the reel was uploaded.

---

## API Endpoints

### Authentication Endpoints

#### **1. Sign Up (Register)**
`POST /auth/signup`

Registers a new user on the platform.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "Seller"
}
```

**Response:**
```json
{
    "message": "User registered successfully",
    "userId": "12345"
}
```

#### **2. Sign In (Login)**
`POST /auth/signin`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**
```json
{
    "token": "JWT_ACCESS_TOKEN",
    "user": {
        "id": "12345",
        "name": "John Doe",
        "role": "Seller"
    }
}
```

---

### Product Endpoints

#### **3. Add Product**
`POST /product`

Allows a seller to add a new product to the platform.

**Request Body:**
```json
{
    "sellerId": "12345",
    "name": "Rice Husk",
    "description": "High-quality rice husk for composting",
    "price": 500,
    "category": "Organic Waste",
    "quantity": 100,
    "unit": "kg",
    "location": "Pune, India"
}
```

**Response:**
```json
{
    "message": "Product added successfully",
    "productId": "67890"
}
```

#### **4. Get All Products**
`GET /product`

Retrieves a list of all products available on the platform.

**Response:**
```json
[
    {
        "id": "67890",
        "name": "Rice Husk",
        "price": 500,
        "category": "Organic Waste",
        "quantity": 100,
        "unit": "kg",
        "location": "Pune, India"
    }
]
```

---

### Offer Endpoints

#### **5. Add Offer**
`POST /offer`

Allows a buyer to make an offer on a product.

**Request Body:**
```json
{
    "buyerId": "54321",
    "productId": "67890",
    "offeredPrice": 450
}
```

**Response:**
```json
{
    "message": "Offer submitted successfully",
    "offerId": "98765"
}
```

#### **6. Update Offer**
`PATCH /offer`

Updates the status of an offer (e.g., accepted, rejected).

**Request Body:**
```json
{
    "offerId": "98765",
    "status": "accepted"
}
```

**Response:**
```json
{
    "message": "Offer updated successfully"
}
```

---

### Notification Endpoints

#### **7. Send Bargain Notification**
`POST /notification/bargain`

Sends a notification to a buyer about a counter-offer from the seller.

**Request Body:**
```json
{
    "buyerId": "54321",
    "productId": "67890",
    "message": "Seller has counter-offered at 480"
}
```

**Response:**
```json
{
    "message": "Notification sent successfully"
}
```

---

### Payment Endpoints

#### **8. Process Payment**
`POST /payment`

Processes a payment for a product.

**Request Body:**
```json
{
    "buyerId": "54321",
    "productId": "67890",
    "amount": 480,
    "paymentMethod": "UPI"
}
```

**Response:**
```json
{
    "message": "Payment successful"
}
```

---

### Reels (Optional Features)

#### **9. Get All Reels**
`GET /reels`

Retrieves a list of all video reels uploaded by users.

**Response:**
```json
[
    {
        "id": "123",
        "userId": "456",
        "videoUrl": "http://example.com/reel.mp4",
        "description": "Reel description",
        "createdAt": "2023-10-01T12:00:00Z"
    }
]
```

#### **10. Add Reel**
`POST /reels`

Allows a user to upload a new video reel.

**Request Body:**
```json
{
    "userId": "456",
    "videoUrl": "http://example.com/reel.mp4",
    "description": "Reel description"
}
```

**Response:**
```json
{
    "message": "Reel added successfully",
    "reelId": "123"
}
```

#### **11. Upload Image for Classification**
`POST /image/classification`

Uploads an image for waste classification using an external API.

**Request Body:**
```json
{
    "imageUrl": "http://example.com/image.jpg"
}
```

**Response:**
```json
{
    "classification": "Organic Waste"
}
```

---

## Tech Stack

### Database
- **MongoDB**: A scalable NoSQL database used to store user, product, offer, and reel data.

### Frontend
- **React Native**: A framework for building iOS and Android apps using the same codebase.

### Backend
- **Node.js & Express**: A JavaScript runtime and framework used to build the backend API.

### External APIs
- **YouTube API**: Used for video-related functionalities.
    - `POST https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID&key=YOUR_API_KEY`
- **Gemini API**: Used for text generation.
    - `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=YOUR_API_KEY`
- **Google Maps API**: Used for location-related functionalities.
    - `POST https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
- **Google Vision API**: Used for image classification.
    - `POST https://vision.googleapis.com/v1/images:annotate`

---
