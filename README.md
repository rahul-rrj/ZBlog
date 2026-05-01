# ZBlog Desk

ZBlog Desk is a full-stack blog content management project with a Spring Boot REST API, MySQL persistence, and a React + Vite editorial dashboard. It supports creating draft posts, managing all entries, publishing drafts, reading published posts, editing content, deleting posts, and attaching media URLs.

## Project Structure

```text
ZBlog_Project/
+-- SpingProjectBlog/
|   +-- blog-service/        # Spring Boot backend API
+-- Frontend/
    +-- blog-frontend/       # React + Vite frontend
```

## Tech Stack

**Backend**
- Java 17+
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Bean Validation
- MySQL
- Maven Wrapper

**Frontend**
- React
- Vite
- React Router
- Lucide React icons
- CSS custom properties

## Features

- Create blog posts as drafts
- View published posts on the public feed
- Manage all posts from an editorial board
- Publish draft posts
- Edit post title, content, and media URLs
- Delete posts
- View individual post pages
- Attach image, video, or file URLs to posts
- Responsive editorial dashboard UI

## Prerequisites

Install these before running the project:

- Java JDK 17 or newer
- Node.js and npm
- MySQL Server

## Database Setup

Create the MySQL database:

```sql
CREATE DATABASE blog_db;
```

The backend reads database settings from environment variables, with safe local defaults:

```properties
DB_URL=jdbc:mysql://localhost:3306/blog_db
DB_USERNAME=blog_user
DB_PASSWORD=your_database_password
```

Set these values in your shell or IDE run configuration before starting the backend. You can also adjust the defaults in:

```text
SpingProjectBlog/blog-service/src/main/resources/application.properties
```

## Run The Backend

From the backend folder:

```bash
cd SpingProjectBlog/blog-service
./mvnw spring-boot:run
```

On Windows PowerShell or Command Prompt:

```bash
cd SpingProjectBlog\blog-service
mvnw.cmd spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

## Run The Frontend

From the frontend folder:

```bash
cd Frontend/blog-frontend
npm install
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

## API Endpoints

Base URL:

```text
http://localhost:8080/posts
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/posts` | Get published posts |
| `GET` | `/posts/all` | Get all posts |
| `GET` | `/posts/draft` | Get draft posts |
| `GET` | `/posts/{id}` | Get one post |
| `POST` | `/posts` | Create a draft post |
| `PUT` | `/posts/{id}` | Update a post |
| `POST` | `/posts/{id}/publish` | Publish a draft |
| `DELETE` | `/posts/{id}` | Delete a post |

## Example Create Request

```json
{
  "title": "Modern Web Architecture",
  "content": "This is the article body.",
  "authorName": "Alex Writer",
  "mediaUrls": [
    "https://example.com/image.jpg"
  ]
}
```

## Showing Images In Posts

Images appear only when a post has a direct image URL in `mediaUrls`.

Use URLs that:

- Start with `http://` or `https://`
- Point directly to an image file
- End with `.jpg`, `.jpeg`, `.png`, or `.gif`
- Are publicly reachable by the browser

Good example:

```text
https://images.unsplash.com/photo-example.jpg
```

Common reasons images do not appear:

- The post has no media URL saved
- The post is still a draft, so it does not appear on the public home feed
- The URL points to a web page instead of an image file
- The image URL does not end with a supported extension
- The host blocks hotlinking or cross-origin image loading
- The URL requires login or permission

## Frontend Pages

| Path | Purpose |
| --- | --- |
| `/` | Public published post feed |
| `/posts/:id` | Single post reader page |
| `/create` | Create draft post |
| `/edit/:id` | Edit existing post |
| `/manage` | Editorial management board |

## Useful Commands

Backend:

```bash
./mvnw test
./mvnw spring-boot:run
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
```

## Future Improvements

- File upload support instead of only external media URLs
- Rich-text editor for post content
- Search and filtering on the management board
- Post preview before publishing
- Cover image selection
- Categories and tags
- Authentication for admin-only routes
- Markdown support
- Toast notifications for create, update, publish, and delete actions
