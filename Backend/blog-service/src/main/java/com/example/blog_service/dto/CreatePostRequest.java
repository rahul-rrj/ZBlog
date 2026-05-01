package com.example.blog_service.dto;
import jakarta.validation.constraints.*;

import java.util.List;

public class CreatePostRequest {
    @NotBlank
    @Size(max=150)
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    @Size(max=50)
    private String authorName;

    private List<String> mediaUrls;


    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public List<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(List<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

}
