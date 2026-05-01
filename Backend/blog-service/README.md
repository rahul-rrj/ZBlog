# Blog Service

A robust RESTful API backend for a Blog Content Management System, built with Spring Boot. This service handles the creation, management, and retrieval of blog posts, supporting both draft and published states.

## 🚀 Features

- **Post Management**: Create, Read, Update, and Delete (CRUD) operations for blog posts.
- **Publishing Workflow**: 
  - Save posts as **Drafts** initially.
  - Distinct endpoints for retrieving **Published** vs **Draft** posts.
  - Dedicated endpoint to **Publish** a draft.
- **Validation**: Input validation for post creation and updates.
- **Exception Handling**: Global exception handling for consistent error responses (e.g., Post Not Found).
- **Database Integration**: Persists data using MySQL with Spring Data JPA.

> 📖 **Deep Dive**: For a full explanation of the internal architecture and data flow, see [PROJECT_EXPLANATION.md](PROJECT_EXPLANATION.md).

## 🛠 Tech Stack

- **Java**: JDK 17
- **Framework**: Spring Boot
- **Build Tool**: Maven
- **Database**: MySQL
- **Dependencies**: 
  - Spring Data JPA
  - Spring Web MVC
  - Spring Validation
  - MySQL Connector

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Java Development Kit (JDK) 17** or higher
- **Maven** (or use the included `mvnw` wrapper)
- **MySQL** Server

## ⚙️ Setup & Configuration

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-service
   ```

2. **Configure Database**
   - Create a MySQL database named `blog_db`.
     ```sql
     CREATE DATABASE blog_db;
     ```
   - Set your database credentials through environment variables:
     ```properties
     DB_URL=jdbc:mysql://localhost:3306/blog_db
     DB_USERNAME=blog_user
     DB_PASSWORD=your_database_password
     ```
   - The application reads these values in `src/main/resources/application.properties`.

3. **Build the Project**
   ```bash
   ./mvnw clean install
   ```

## ▶️ Running the Application

Run the application using the Maven wrapper:

```bash
./mvnw spring-boot:run
```

The server will start on port **8080** (default).

## 🔌 API Endpoints

The base URL for all endpoints is `http://localhost:8080/posts`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/posts` | Create a new post |
| **GET** | `/posts/{id}` | Get a specific post by ID |
| **GET** | `/posts` | Get all **Published** posts |
| **GET** | `/posts/draft` | Get all **Draft** posts |
| **GET** | `/posts/all` | Get **All** posts (Published & Drafts) |
| **POST** | `/posts/{id}/publish` | Publish a draft post |
| **PUT** | `/posts/{id}` | Update an existing post |
| **DELETE** | `/posts/{id}` | Delete a post |

### request Examples

**Create Post (POST /posts)**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the blog post...",
  "authorName": "John Doe",
  "mediaUrls": ["http://example.com/image1.jpg"]
}
```

## 📂 Project Structure

```
com.example.blog_service
├── config/           # Configuration classes
├── controller/       # REST Controllers (API Layer)
├── dto/              # Data Transfer Objects
├── entity/           # JPA Entities (Database Models)
├── exception/        # Custom Exceptions & Global Handler
├── repository/       # Data Access Layer (Repositories)
└── service/          # Business Logic Layer
```
