import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import PostCard from '../components/PostCard';
import { Loader2, PenSquare, Radio } from 'lucide-react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await api.getPosts();
                setPosts(data);
            } catch (err) {
                console.error("Failed to load posts", err);
                setError("Failed to load posts. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="loading-wrap">
                <Loader2 className="animate-spin" size={52} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container animate-in">
                <div className="alert">{error}</div>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="page-header animate-in">
                <div>
                    <p className="eyebrow">Published feed</p>
                    <h1 className="page-title">Ideas worth shipping.</h1>
                    <p className="page-kicker" style={{ maxWidth: 620, marginTop: 18 }}>
                        A clean publishing desk for posts, drafts, and media-backed stories.
                    </p>
                </div>
                <Link to="/create" className="btn btn-primary">
                    <PenSquare size={18} /> Compose
                </Link>
            </header>

            {posts.length > 0 ? (
                <div className="post-grid">
                    {posts.map((post) => <PostCard key={post.id} post={post} />)}
                </div>
            ) : (
                <div className="empty-state animate-in">
                    <Radio size={28} style={{ marginBottom: 14, color: 'var(--accent)' }} />
                    <strong>No published posts yet</strong>
                    Draft something new, then publish it from the board.
                </div>
            )}
        </div>
    );
}
