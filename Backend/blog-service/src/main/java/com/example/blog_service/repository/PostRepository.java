package com.example.blog_service.repository;

import com.example.blog_service.entity.Post;
import com.example.blog_service.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByStatus(PostStatus status);
}

