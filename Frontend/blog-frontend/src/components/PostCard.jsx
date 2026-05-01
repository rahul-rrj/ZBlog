import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Image, User } from 'lucide-react';

export default function PostCard({ post }) {
    const excerpt = post.content.length > 120
        ? `${post.content.substring(0, 120)}...`
        : post.content;

    const thumbnail = post.mediaUrls && post.mediaUrls.find(url => url.match(/\.(jpeg|jpg|png|gif)$/i));

    return (
        <article className="post-card animate-in">
            <div className="post-thumb">
                {thumbnail ? (
                    <img src={thumbnail} alt={post.title} />
                ) : (
                    <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--ink-muted)' }}>
                        <Image size={34} />
                    </div>
                )}
            </div>

            <div className="post-card-body">
                <div className="meta-row" style={{ marginBottom: 12 }}>
                    <span><User size={14} /> {post.authorName}</span>
                    <span><Calendar size={14} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'New'}</span>
                </div>

                <h2>{post.title}</h2>
                <p style={{ color: 'var(--ink-soft)', margin: '0 0 22px' }}>{excerpt}</p>

                <Link to={`/posts/${post.id}`} className="btn btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                    Read <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}
