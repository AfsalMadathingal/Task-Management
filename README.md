# Task Management Web App

This is a full-stack web application with a frontend built using Vite and a backend powered by Node.js. The project is divided into two parts: the `client` folder for the frontend and the `server` folder for the backend.

## Features

- **Frontend**: Built with Vite, React, and uses Socket.io-client for real-time communication with the backend.
- **Backend**: Built with Node.js and Express, using Socket.io for WebSocket communication.

## Setup and Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. **Install dependencies**:
   - Frontend:
     ```
     cd client
     npm install
     ```
   - Backend:
     ```
     cd server
     npm install
     ```

3. **Configure environment variables**:
   - Frontend: Create a `.env` file in the `client` folder:
     ```
     VITE_API_URL=http://localhost:5000
     ```
   - Backend: Create a `.env` file in the `server` folder:
     ```
     PORT=5000
     ```

## Running the Project

1. **Run the backend**:
   ```
   cd server
   npm start
   ```
   The backend will run on http://localhost:5000.

2. **Run the frontend**:
   ```
   cd client
   npm run dev
   ```
   The frontend will run on http://localhost:3000.

## Deployment

### Frontend Deployment
1. Build the frontend for production:
   ```
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to a static hosting service like Vercel or Netlify.

### Backend Deployment
Deploy the backend to a Node.js-compatible hosting service like Render or Heroku.


## Technologies Used

- **Frontend**: Vite, React, Socket.io-client
- **Backend**: Node.js, Express, Socket.io

## License

This project is licensed under the MIT License.

---

This is a basic text version with all the important details. Let me know if you need anything else!