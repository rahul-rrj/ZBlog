package com.example.blog_service.dto;

import com.example.blog_service.entity.PostStatus;

import java.time.LocalDateTime;
import java.util.List;

public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String authorName;
    private PostStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> mediaUrls;

    public PostResponse(
            Long id,
            String title,
            String content,
            String authorName,
            PostStatus status,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            List<String> mediaUrls

    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorName = authorName;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.mediaUrls=mediaUrls;
    }
    public Long getId(){
        return id;
    }
    public String getTitle(){
        return title;
    }
    public String getContent(){
        return content;
    }
    public String getAuthorName(){
        return authorName;
    }
    public PostStatus getStatus(){
        return status;
    }
    public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public LocalDateTime getUpdatedAt(){
        return updatedAt;
    }
    public List<String> getMediaUrls() {
        return mediaUrls;
    }


}
