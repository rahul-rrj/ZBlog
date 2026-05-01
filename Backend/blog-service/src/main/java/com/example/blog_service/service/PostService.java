package com.example.blog_service.service;

import com.example.blog_service.dto.PostResponse;
import com.example.blog_service.dto.UpdatePostRequest;
import com.example.blog_service.entity.Post;
import com.example.blog_service.entity.PostStatus;
import com.example.blog_service.exception.PostNotFoundException;
import com.example.blog_service.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository=postRepository;
    }
    private PostResponse toResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getAuthorName(),
                post.getStatus(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                new ArrayList<>(post.getMediaUrls())
        );
    }

    //Post Creation

    public PostResponse createPost(String title,String content,String authorName,List<String> mediaUrls){
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setAuthorName(authorName);
        post.setStatus(PostStatus.DRAFT);
        post.setMediaUrls(mediaUrls);

        postRepository.save(post);
        return toResponse(post) ;

    }


    //Single Post Access

    public PostResponse getPostById(Long id){
        return toResponse(postRepository.findById(id).orElseThrow(()->new PostNotFoundException(id)));
    }


    //Published Post Retrieval
    public List<PostResponse> getPublishedPosts(){
return postRepository.findByStatus(PostStatus.PUBLISHED).stream().map(this::toResponse).toList();
    }


    //Publish a post
    public PostResponse publishPost(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        if(post.getStatus()==PostStatus.PUBLISHED){
            return toResponse(post);
        }
        post.setStatus(PostStatus.PUBLISHED);
        return toResponse(postRepository.save(post));
    }

    public PostResponse updatePost(Long id, UpdatePostRequest request){
        Post post = postRepository.findById(id).orElseThrow(()-> new PostNotFoundException(id));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setMediaUrls(request.getMediaUrls());
        return toResponse(postRepository.save(post));
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
        postRepository.delete(post);
    }

    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<PostResponse> getDraftedPosts() {
        return postRepository.findByStatus(PostStatus.DRAFT).stream().map(this::toResponse).toList();
    }
}
