# 💻 DevTinder Backend

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</div>

---

## 🎯 About DevTinder

DevTinder is a **Tinder-like platform for developers** to discover, connect, and collaborate with fellow programmers.  
Just like dating apps, developers can swipe through profiles, match based on interests and skills, and build meaningful professional relationships.

---

## ✨ Key Features

### 🔐 Authentication & Security

- JWT-based authentication with secure cookie storage
- Password hashing using bcrypt
- Input validation & sanitization
- Protected routes with middleware authentication

### 👤 User Management

- Complete user profiles with skills, bio, and photos
- Profile editing & account management
- Strong password validation
- Photo URL validation & fallback handling

### 🤝 Connection System

- Swipe mechanism (interested/ignored)
- Mutual connection matching
- Connection request management
- Accept/reject functionality
- View all connections

### 📱 Smart Feed Algorithm

- Personalized feed excluding connected users
- Pagination support for efficient loading
- Filters out sent/received requests
- Optimized database queries

### 🛡️ Data Validation

- Mongoose schema validation
- Custom validation middleware
- Email format validation
- Age and skill limits
- Comprehensive error handling

---

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── middlewares/
│   │   └── auth.js            # Authentication middleware
│   ├── models/
│   │   ├── user.js            # User schema & model
│   │   └── connectionRequest.js # Connection request model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── profile.js         # Profile management
│   │   ├── requests.js        # Connection requests
│   │   └── user.js            # User operations
│   ├── utils/
│   │   ├── constants.js       # App constants
│   │   └── validations.js     # Validation helpers
│   └── app.js                 # Express app setup
├── package.json
└── README.md
```

---

## 🚀 API Endpoints

### 🔐 Authentication

- `POST /signup` → User registration
- `POST /login` → User login
- `POST /logout` → User logout

### 👤 Profile Management

- `GET /profile/view` → Get user profile
- `PATCH /profile/edit` → Update profile
- `DELETE /profile/delete` → Delete account

### 🤝 Connection System

- `GET /feed` → Get user feed
- `POST /request/send/:status/:userId` → Send connection request
- `GET /request/received` → Get received requests
- `POST /request/review/:status/:reqId` → Accept/reject request
- `GET /user/viewConnections` → Get all connections

---

## 🛠️ Tech Stack

| Technology        | Purpose               | Version |
| ----------------- | --------------------- | ------- |
| **Node.js**       | Runtime Environment   | Latest  |
| **Express.js**    | Web Framework         | ^4.x    |
| **MongoDB**       | Database              | ^6.x    |
| **Mongoose**      | ODM                   | ^7.x    |
| **bcrypt**        | Password Hashing      | ^5.x    |
| **jsonwebtoken**  | Authentication        | ^9.x    |
| **validator**     | Input Validation      | ^13.x   |
| **cookie-parser** | Cookie Management     | ^1.x    |
| **cors**          | Cross-Origin Requests | ^2.x    |

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 🔧 Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/devtinder-backend.git
cd devtinder-backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add environment variables
JWT_SECRET=your_super_secret_jwt_key
MONGO_URI=mongodb://localhost:27017/devtinder
NODE_ENV=development
PORT=3000

# Run in development mode
npm run dev

# Run in production mode
npm start
```

---

## 🗄️ Database Schema

### 👤 User Model

```javascript
{
  firstName: String (required, 2-50 chars)
  lastName: String (required, 2-50 chars)
  emailId: String (required, unique, validated)
  password: String (required, hashed, 8+ chars)
  age: Number (18-120, optional)
  gender: Enum ["male", "female", "other", "prefer not to say"]
  photoUrl: String (URL validated, optional)
  about: String (max 200 chars, optional)
  skills: [String] (max 10 skills, optional)
  timestamps: true
}
```

### 🤝 Connection Request Model

```javascript
{
  fromUserId: ObjectId (ref: User)
  toUserId: ObjectId (ref: User)
  status: Enum ["ignored", "interested", "accepted", "rejected"]
  timestamps: true
}
```

---

## 🔒 Security Features

- JWT Authentication with HTTP-only cookies
- Password hashing with bcrypt
- Input sanitization & validation
- CORS protection with specific origins
- Rate limiting ready architecture
- Secure headers configuration
- MongoDB injection prevention

---

## 🚀 Performance Optimizations

- Database indexing on frequently queried fields
- Efficient aggregation queries for feed generation
- Pagination support for large datasets
- Connection pooling for DB connections
- Optimized Mongoose queries with field selection

---

## 🧪 API Testing

### 📝 Sample Requests

#### User Registration

```bash
curl -X POST http://localhost:3000/signup   -H "Content-Type: application/json"   -d '{
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Send Connection Request

```bash
curl -X POST http://localhost:3000/request/send/interested/USER_ID   -H "Cookie: token=JWT_TOKEN"
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔮 Future Enhancements

- Real-time messaging system
- Advanced matching algorithms
- Push notifications for new connections
- Profile verification system
- Admin dashboard for user management
- Analytics and reporting
- Social media integration
- Video call integration

---

## 👨‍💻 Author

**Your Name**  
Appalanaidu Bagana

- GitHub: [@NaiduBagana](https://github.com/NaiduBagana)
- LinkedIn: [NaiduBagana](https://linkedin.com/in/naidu-bagana)

---

## 🙏 Acknowledgments

- Thanks to the Node.js & Express community
- MongoDB for excellent documentation
- All developers who inspired this project

---

<div align="center">  
  <sub>Built with ❤️ for the developer community</sub>  
</div>

---

## 🏷️ GitHub Topics/Tags

```
nodejs express mongodb mongoose jwt authentication backend-api rest-api
developer-platform tinder-clone connection-platform javascript bcrypt
cors validation middleware database-design professional-networking
```
