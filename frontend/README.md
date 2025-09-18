# Lead Management System (Erino SDE Internship Assignment)

This project is a **Lead Management System** built as part of the Erino SDE Internship Assignment. It allows users to manage leads with features like authentication, CRUD operations, server-side pagination, and filtering.


---

## Features
- **User Authentication**: Register, login, and logout with JWT stored in httpOnly cookies.
- **Lead Management**: Create, view, update, and delete leads.
- **Server-Side Pagination**: Efficiently handle large datasets with pagination.
- **Advanced Filtering**: Filter leads by various fields (e.g., status, source, score, dates).
- **Responsive UI**: Built with ReactJS and styled for a seamless user experience.


---

## Pages
1. **Login/Register**: Authenticate users with JWT.
2. **Leads List**: View leads in a grid with server-side pagination and filters.
3. **Lead Create/Edit Form**: Add or update lead details.

---

## API Endpoints
The frontend interacts with the following backend API endpoints:
- `POST /register`: Register a new user.
- `POST /login`: Login and receive a JWT.
- `POST /logout`: Logout the user.
- `GET /leads`: Fetch leads with pagination and filters.
- `POST /leads`: Create a new lead.
- `GET /leads/:id`: Fetch a single lead.
- `PUT /leads/:id`: Update a lead.
- `DELETE /leads/:id`: Delete a lead.

---

## Deployment
### Frontend
The frontend is deployed on **Vercel**. You can access it at:
[Frontend Live Link](<your-frontend-live-link>)

### Backend
The backend is deployed on **Render/Railway/Fly/Heroku**. You can access it at:
[Backend Live Link](<your-backend-live-link>)

---

## Technologies Used
- **Frontend**: ReactJS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment**: Vercel (Frontend), Render/Railway/Fly/Heroku (Backend)    
- **Version Control**: Git, GitHub
- **Others**: Postman (API Testing), ESLint (Code Quality)
- **Environment Variables**: Managed using `.env` files for sensitive data.
- **State Management**: React Context API for managing authentication state.
- **Error Handling**: Implemented both client-side and server-side error handling for robustness.
---

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd Erino_LMS_Task
   ```
2. **Navigate to Frontend Directory**:
   ```bash
    cd frontend
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Set Environment Variables**:
    Create a `.env` file in the `frontend` directory and add:
    ```env
    REACT_APP_API_URL=<your-backend-api-url>
    ```
5. **Run the Application**:         
    ```bash
    npm start
    ```
6. **Access the Application**:      
    Open your browser and navigate to `http://localhost:3000`.                                                                                                                                      
---

## Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License.

---

## Acknowledgements
- Thanks to Erino for the opportunity to work on this assignment.   
---