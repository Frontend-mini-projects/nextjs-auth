
# Authentication using Next.js

## Authentication System with Next.js, TypeScript, MongoDB, and Mailtrap

This project implements a full-stack authentication system with various functionalities including login, signup, logout, email verification, and forgot password. It is built using Next.js, TypeScript, MongoDB, and Mailtrap.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [Contributing](#contributing)
6. [License](#license)

## Screenshots
### Login Page
![image](https://github.com/utkarshgupta04092003/nextjs-auth/assets/63789702/eefe84db-2d2a-41e9-ba75-6851e04d7a01)

### Mail Preview
![image](https://github.com/utkarshgupta04092003/nextjs-auth/assets/63789702/a6560238-14ad-4eba-9bfd-e4f9dcfbf2b0)

### User Profile Page
![image](https://github.com/utkarshgupta04092003/nextjs-auth/assets/63789702/98ed2561-f37f-448c-8949-8771e681036c)


## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/utkarshgupta04092003/nextjs-auth
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-auth
   ```

3. Install dependencies:

   ```bash
   npm install axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose
   ```

4. Set up environment variables:
   
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```
   
     MONGO_URI = "PUT_MONGO_URL"
     TOKEN_SECRET = "YOUR_NEXT_TOKEN"
     domain = "YOUR_DOMAIN"
     MAILTRAP_USER = "MAILTRAP_USER"
     MAILTRAP_PASS = "MAILTRAP_PASS"

     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

## Usage

1. **Signup**: Register a new user account by providing username, email, and password.

2. **Login**: Sign in with your registered email and password.

3. **Email Verification**: Upon signup, an email verification link is sent to the registered email address. Click on the link to verify your email.

4. **Forgot Password**: If you forget your password, you can request a password reset by providing your email address. A password reset link will be sent to your email.

5. **Logout**: Log out from the application to end the current session.

## Technologies Used

- Next.js
- TypeScript
- MongoDB
- Mailtrap

## Features

- User authentication with login, signup, email verification, forgot password, and logout functionality.
- Secure password storage using bcryptjs.
- Email verification and password reset using Mailtrap.
- Fully responsive UI design.
- Error handling and validation.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
