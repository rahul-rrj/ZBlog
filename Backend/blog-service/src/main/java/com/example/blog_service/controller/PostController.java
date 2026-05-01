package com.example.blog_service.controller;

import com.example.blog_service.dto.CreatePostRequest;
import com.example.blog_service.dto.PostResponse;
import com.example.blog_service.dto.UpdatePostRequest;
import com.example.blog_service.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/posts")
@CrossOrigin(origins="*", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService=postService;
    }

    //createPost
    @PostMapping
    public PostResponse createPost(@Valid @RequestBody CreatePostRequest request){
        return postService.createPost(request.getTitle(), request.getContent(), request.getAuthorName(),request.getMediaUrls());

    }

    //Get Post By Id
    @GetMapping("/{id:\\d+}")
    public PostResponse getPost(@PathVariable("id") Long id){
        return postService.getPostById(id);
    }
    //Get all Published Post
    @GetMapping
    public List<PostResponse> getPublishedPosts(){
        return postService.getPublishedPosts();
    }

    @GetMapping("/all")
    public List<PostResponse> getAllPosts(){return postService.getAllPosts();}

    @PostMapping("/{id:\\d+}/publish")
    public PostResponse publishPost(@PathVariable("id") Long id){
        return postService.publishPost(id);
    }

    @GetMapping("/draft")
    public List<PostResponse> getDraftedPosts(){
        return postService.getDraftedPosts();
    }
    @PutMapping("/{id}")
    public PostResponse updatePost(@PathVariable("id") Long id,  @Valid @RequestBody UpdatePostRequest req){
        return postService.updatePost(id,req);
    }

    @DeleteMapping("/{id:\\d+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable("id") Long id){
        postService.deletePost(id);
    }
}
