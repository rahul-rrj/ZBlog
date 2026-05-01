import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { Edit2, FileStack, Loader2, Plus, Send, Trash2 } from 'lucide-react';

export default function ManagePosts() {
    const [allPosts, setAllPosts] = useState([]);
    const [draftPosts, setDraftPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setError(null);
            const [allData, draftsData] = await Promise.all([
                api.getAllPostsRaw(),
                api.getDraftPosts()
            ]);

            setAllPosts(Array.isArray(allData) ? allData : []);
            setDraftPosts(Array.isArray(draftsData) ? draftsData : []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePublish = async (id) => {
        if (!window.confirm("Publish this draft now?")) return;
        try {
            await api.publishPost(id);
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert("Failed to publish post");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this entry permanently?")) return;
        try {
            await api.deletePost(id);
            setAllPosts(prev => prev.filter(p => p.id !== id));
            setDraftPosts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete post");
            fetchPosts();
        }
    };

    if (loading) {
        return (
            <div className="loading-wrap">
                <Loader2 className="animate-spin" size={52} />
            </div>
        );
    }

    const publishedPosts = allPosts.filter(p => p.status === 'PUBLISHED');

    return (
        <div className="container animate-in">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Publishing board</p>
                    <h1 className="page-title">Command the queue.</h1>
                    <p className="page-kicker" style={{ maxWidth: 620, marginTop: 18 }}>
                        Scan every entry, move drafts live, and clean up old records without digging through pages.
                    </p>
                </div>
                <Link to="/create" className="btn btn-primary">
                    <Plus size={18} /> New Entry
                </Link>
            </header>

            {error && <div className="alert" style={{ marginBottom: 22 }}>Error: {error}</div>}

            <div className="management-grid">
                <section className="panel">
                    <div className="section-title">
                        <h2>All Entries</h2>
                        <span className="count-pill">{allPosts.length}</span>
                    </div>
                    <div className="stack">
                        {allPosts.length > 0 ? (
                            allPosts.map((post) => (
                                <EntryItem key={post.id} post={post} onPublish={handlePublish} onDelete={handleDelete} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <strong>No records found</strong>
                                Create a post and it will appear here immediately.
                            </div>
                        )}
                    </div>
                </section>

                <div className="status-column">
                    <StatusPanel title="Published" count={publishedPosts.length} posts={publishedPosts} empty="No public stories are live." />
                    <StatusPanel title="Drafts" count={draftPosts.length} posts={draftPosts} empty="No waiting drafts." />
                </div>
            </div>
        </div>
    );
}

function EntryItem({ post, onPublish, onDelete }) {
    const isDraft = post.status === 'DRAFT';

    return (
        <article className={`entry-item status-${post.status.toLowerCase()}`}>
            <div className="entry-strip" />
            <div className="entry-content">
                <div className="meta-row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                    <span>{post.authorName}</span>
                    <span className={`badge ${isDraft ? 'badge-draft' : 'badge-published'}`}>{post.status}</span>
                </div>
                <h3>{post.title}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: 0 }}>
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                </p>
                <div className="entry-actions">
                    {isDraft && (
                        <button onClick={() => onPublish(post.id)} className="btn btn-primary">
                            <Send size={16} /> Publish
                        </button>
                    )}
                    <Link to={`/edit/${post.id}`} className="btn btn-secondary btn-icon" title="Edit">
                        <Edit2 size={16} />
                    </Link>
                    <button onClick={() => onDelete(post.id)} className="btn btn-danger btn-icon" title="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </article>
    );
}

function StatusPanel({ title, count, posts, empty }) {
    return (
        <section className="panel">
            <div className="section-title">
                <h2>{title}</h2>
                <span className="count-pill">{count}</span>
            </div>
            <div className="stack">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <FileStack size={18} style={{ marginTop: 5, color: 'var(--brand)' }} />
                            <div>
                                <strong>{post.title}</strong>
                                <p style={{ margin: '4px 0 0', color: 'var(--ink-muted)', fontSize: '0.88rem' }}>{post.authorName}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <strong>{empty}</strong>
                        The board is clear.
                    </div>
                )}
            </div>
        </section>
    );
}
