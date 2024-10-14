# Twitter Clone

A Twitter-like social media platform built using **Next.js** for the frontend and **Express.js** for the backend. This project includes basic functionalities such as creating, deleting, and liking posts, following/unfollowing users, and dynamic profile pages. The home page shows all posts from the logged-in user and the users they follow, with an additional section that only displays posts from followed users.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

1. **User Authentication**
   - Sign up and log in using an email and password.
   - User sessions are maintained using JWT tokens.

2. **Post Management**
   - Create and delete posts dynamically.
   - Like/unlike posts with real-time updates.

3. **Follow System**
   - Follow/unfollow users, with follower and following counts updated.
   - View posts from followed users on the home page.

4. **Dynamic Profile Pages**
   - Each user has a profile displaying their posts, posts count, and bio.
   - Posts are fetched dynamically based on user activity.

5. **Feed Section**
   - Home page shows a feed of the logged-in user’s posts and the posts from followed users.
   - A separate section displays only posts from users that the logged-in user follows.

## Screenshots

### Login Page:

![Login](https://github.com/user-attachments/assets/2af2d395-7538-4a1b-b7a8-4cf0a3adb0bc)

### Register Page:

![Register](https://github.com/user-attachments/assets/ddcfa892-61ca-4b1b-847c-a31a60704979)

### Home Page(All Posts):

![Feed (1)](https://github.com/user-attachments/assets/e50108fb-01d0-4db9-90f6-11884d109625)

### Followers Post:

![Followers_Post](https://github.com/user-attachments/assets/ef1e6854-5fa3-4b54-b4eb-9a9887375f5b)

### Creating Post:

![Create_Post](https://github.com/user-attachments/assets/d849cef4-965b-4ffb-b042-b2950c2cfb06)

### Delete Posts:

![Delete_Post](https://github.com/user-attachments/assets/8f5fab9c-985a-423f-851e-25361de895b8)

### Folllow User:

![Follow](https://github.com/user-attachments/assets/28a679a6-c1f7-4796-9979-1136f542d710)

### Unfollow User:

![Unfollow](https://github.com/user-attachments/assets/68d9b915-df26-4bc0-ae38-0e193d3abebe)

### User Profile:

![User_Profile](https://github.com/user-attachments/assets/4d074c6f-6c74-4317-a91d-40ae0b290c72)

### Other User Profile:

![Follow_Profile](https://github.com/user-attachments/assets/9573de1d-46e2-4dc0-9954-b7d502bc573f)

### Like Posts:

![Like](https://github.com/user-attachments/assets/97235d8b-c072-4c5a-8da7-57ce9f5cc31d)

### Bookmark Posts:

![Bookmark](https://github.com/user-attachments/assets/c5ac2657-f9b9-4008-97e1-85f502bfdf87)


## Technologies

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Express.js](https://expressjs.com/)
- **Database**: MongoDB (or similar NoSQL database)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: Redux 
- **CSS**: Tailwind CSS / CSS Modules / Styled Components

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/twitter-clone.git
   cd twitter-clone

2. Install dependencies for both frontend and backend:

    ```bash
        # For frontend
    cd client
    npm install
    
        # For backend
    cd ../server
    npm install

  3. Set up environment variables for backend:

     ```bash
         # server/.env
     
      PORT=5000
      MONGO_URI=your-mongodb-connection-string
      JWT_SECRET=your-secret-key

  4. Start the Server:

     ```bash
          # backend
     
      cd server
      npm start
  
          #frontend
     
      cd client
      npm run dev

## Usage

1. Create an account by signing up.

2. Log in to access the main home feed.

3. Create posts, like/unlike posts, and manage your profile.

4. Follow/unfollow users to customize your feed.

5. Navigate between the home feed and the following section to explore posts from different users.

## API Endpoints

#### POST

    post("/createpost")              # creating post
    
    delete('/deletepost/:id')        # deleting post
    
    put('/likepost/:id')             # like or Dislike post
    
    get('/getpost/:id')              # get the specific user post
    
    get('/getallposts/:id')          # get all the posts 
    
    get('/getfollowingposts/:id')    # get only the followers post

#### USER

    post("/register", Register)        # Register User
    
    post("/login", Login)              # Login User
    
    get("/logout", Logout)             # Logout User
    
    put("/bookmarkpost/:id")           # Bookmark Post
    
    get("/getprofile/:id")             # get user Profile
    
    get("/getotherprofile/:id")        # get All other User Profile
    
    post("/follow/:id")                # Follow User
    
    post("/unfollow/:id")              # Unfollow User



