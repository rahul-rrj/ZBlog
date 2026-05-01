package com.example.blog_service.service;

import com.example.blog_service.dto.PostResponse;
import com.example.blog_service.dto.UpdatePostRequest;
import com.example.blog_service.entity.Post;
import com.example.blog_service.entity.PostStatus;
import com.example.blog_service.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostServiceTests {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    @Test
    void createPostStoresEmptyMediaUrlsWhenRequestOmitsThem() {
        when(postRepository.save(any(Post.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PostResponse response = postService.createPost("Title", "Content", "Author", null);

        ArgumentCaptor<Post> postCaptor = ArgumentCaptor.forClass(Post.class);
        verify(postRepository).save(postCaptor.capture());

        assertThat(postCaptor.getValue().getMediaUrls()).isEmpty();
        assertThat(response.getMediaUrls()).isEmpty();
    }

    @Test
    void updatePostStoresEmptyMediaUrlsWhenRequestOmitsThem() {
        Post existingPost = new Post();
        existingPost.setTitle("Old title");
        existingPost.setContent("Old content");
        existingPost.setAuthorName("Author");
        existingPost.setStatus(PostStatus.DRAFT);

        UpdatePostRequest request = new UpdatePostRequest();
        request.setTitle("New title");
        request.setContent("New content");

        when(postRepository.findById(7L)).thenReturn(Optional.of(existingPost));
        when(postRepository.save(any(Post.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PostResponse response = postService.updatePost(7L, request);

        ArgumentCaptor<Post> postCaptor = ArgumentCaptor.forClass(Post.class);
        verify(postRepository).save(postCaptor.capture());

        assertThat(postCaptor.getValue().getMediaUrls()).isEmpty();
        assertThat(response.getMediaUrls()).isEmpty();
    }
}
