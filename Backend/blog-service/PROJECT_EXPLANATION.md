# Project Internals & Architecture Explained

This document provides a deep dive into the `blog-service` application, explaining how data flows through the system, how the database is accessed, and the role of each component.

## 🏗 High-Level Architecture

The application follows a classic **Layered Architecture** common in Spring Boot applications. This ensures separation of concerns, making the code maintainable and testable.

**Flow of a Request:**
1.  **Client** (e.g., Postman, Frontend) sends an HTTP request.
2.  **Controller Layer** (`PostController`) receives the request.
3.  **Service Layer** (`PostService`) processes the business logic.
4.  **Repository Layer** (`PostRepository`) interacts with the database.
5.  **Database** (MySQL) stores/retrieves the data.

---

## 🔄 Data Fetching & persistence (How it works)

This project uses **Spring Data JPA** (Java Persistence API) to interact with the MySQL database. You do not need to write raw SQL queries for standard operations.

### 1. The Entity (`Post.java`)
The `Post` class is mapped directly to the `posts` table in the database using JPA annotations.
- `@Entity`: Marks this class as a database object.
- `@Table(name="posts")`: Tells Hibernate to map this to the `posts` table.
- `@Id` & `@GeneratedValue`: Automatically generates a unique Primary Key (`id`) for each post.
- `@PrePersist` & `@PreUpdate`: Lifecycle hooks that automatically set the `createdAt` and `updatedAt` timestamps whenever a post is saved or modified.

**Relationship:**
- `mediaUrls` is a list of strings but is stored in a separate table `post_media` using `@ElementCollection`. This is a one-to-many relationship managed automatically by Hibernate.

### 2. The Repository (`PostRepository.java`)
This interface extends `JpaRepository<Post, Long>`.
- **Magic of Spring Data**: You don't implement this interface! Spring Boot dynamically creates the implementation at runtime.
- **Built-in Methods**: accessing `save()`, `findById()`, `findAll()`, and `delete()` happens out of the box.
- **Custom Logic**: The method `List<Post> findByStatus(PostStatus status);` is a "Derived Query Method". Spring translates this method name into a SQL query like: `SELECT * FROM posts WHERE status = ?`.

---

## 🧩 Component Breakdown

### 1. Controller Layer (`PostController.java`)
**Role:** The Entry Point (Traffic Cop).
- It defines the REST API endpoints (URIs).
- It handles HTTP concerns (Status codes, Request Body parsing).
- It delegates all actual work to the `PostService`.
- **Key Annotations:**
    - `@RestController`: Returns JSON responses.
    - `@RequestMapping("/posts")`: Sets the base URL path.
    - `@Valid`: Triggers validation on the incoming DTOs.

### 2. Service Layer (`PostService.java`)
**Role:** The Brain (Business Logic).
- It converts "DTOs" (Data Transfer Objects) from the controller into "Entities" for the database, and vice versa.
- It contains the rules of the application.
  - *Example:* When creating a post, it explicitly sets the status to `DRAFT` (Line 41).
  - *Example:* When publishing, it checks if the post exists first.
- It handles Exceptions: If `findById` finds nothing, it throws `PostNotFoundException`.

### 3. DTOs (Data Transfer Objects)
**Role:** The Messenger.
We don't expose our internal Database Entity (`Post`) directly to the outside world. Instead, we use DTOs.
- `CreatePostRequest`: Contains only what is needed to make a post (title, content, author).
- `PostResponse`: The sanitized data we send back to the user (includes IDs and timestamps).

---

## 🌊 detailed Request Flow Example: "Publishing a Post"

Let's trace what happens when you send a **POST** request to `/posts/1/publish`.

1.  **Receive**: `PostController.publishPost(1)` is called. It passes the ID `1` to the service.
2.  **Logic**: `PostService.publishPost(1)`:
    - Calls `postRepository.findById(1)`.
    - **Database Check**: Hibernate runs `SELECT * FROM posts WHERE id=1`.
    - **Validation**: If the post isn't found, throw `PostNotFoundException`.
    - **Update**: Sets `post.setStatus(PostStatus.PUBLISHED)`.
    - **Save**: Calls `postRepository.save(post)`.
    - **Persist**: Hibernate detects the change and runs `UPDATE posts SET status='PUBLISHED', updated_at=NOW() WHERE id=1`.
3.  **Response**: The updated Post entity is converted to a `PostResponse` DTO and returned to the controller.
4.  **Reply**: The controller sends a `200 OK` JSON response to the user.
