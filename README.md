# Recipe Book

A full-stack web application for creating, storing, and managing your favorite recipes with user authentication and nutrition information.

## Features

- **User Authentication**: Secure signup and login functionality
- **Recipe Management**: Create, view, edit, and delete your recipes
- **Recipe Categories**: Organize recipes by categories
- **Ingredient Tracking**: Add detailed ingredients with quantities
- **Nutrition Information**: View nutritional data for recipes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React with Vite
- Redux Toolkit for state management
- React Router for navigation
- Ant Design for UI components
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd recipe-book
```

2. Install server dependencies
```
cd server
npm install
```

3. Install client dependencies
```
cd ../client
npm install
```

4. Set up environment variables
   - Create `.env` file in the server directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Create `.env` file in the client directory with:
     ```
     VITE_API_URL=http://localhost:7000/api/v1
     ```

### Running the Application

1. Start the server
```
cd server
npm run dev
```

2. Start the client
```
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login a user

### Recipe Routes
- `GET /api/v1/recipe` - Get all recipes
- `GET /api/v1/recipe/:id` - Get a specific recipe
- `POST /api/v1/recipe` - Create a new recipe
- `PUT /api/v1/recipe/:id` - Update a recipe
- `DELETE /api/v1/recipe/:id` - Delete a recipe

## Future Enhancements

- Meal planning functionality
- Shopping list generation
- Social sharing features
- Advanced recipe search
- Dietary restriction filters

## License

This project is licensed under the MIT License.