import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import MediaGallery from '../components/MediaGallery';
import { ArrowLeft, Calendar, Loader2, User } from 'lucide-react';

export default function PostView() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await api.getPostById(id);
                setPost(data);
            } catch (err) {
                setError("Failed to load post data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-wrap">
                <Loader2 className="animate-spin" size={52} />
            </div>
        );
    }

    if (error) return <div className="container animate-in"><div className="alert">{error}</div></div>;
    if (!post) return <div className="container animate-in"><div className="empty-state"><strong>Document not found</strong>No matching post exists.</div></div>;

    return (
        <div className="article-shell animate-in">
            <Link to="/" className="btn btn-secondary" style={{ marginBottom: 22 }}>
                <ArrowLeft size={16} /> Back to feed
            </Link>

            <article className="article">
                <p className="eyebrow">Published article</p>
                <h1>{post.title}</h1>
                <div className="meta-row" style={{ marginBottom: 34 }}>
                    <span><User size={15} /> {post.authorName}</span>
                    <span><Calendar size={15} /> {new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>

                <div className="article-content">{post.content}</div>

                {post.mediaUrls && post.mediaUrls.length > 0 && (
                    <section style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--line)' }}>
                        <h2 className="display-font" style={{ fontSize: '2rem', margin: '0 0 16px' }}>Attachments</h2>
                        <MediaGallery urls={post.mediaUrls} />
                    </section>
                )}
            </article>
        </div>
    );
}
