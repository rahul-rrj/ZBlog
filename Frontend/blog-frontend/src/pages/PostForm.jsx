import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { Loader2, Plus, Save, X } from 'lucide-react';

export default function PostForm({ mode = 'create' }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(mode === 'edit');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        authorName: "",
        mediaUrls: []
    });
    const [newUrl, setNewUrl] = useState("");

    useEffect(() => {
        if (mode === 'edit') {
            const loadPost = async () => {
                try {
                    const data = await api.getPostById(id);
                    setForm({
                        title: data.title,
                        content: data.content,
                        authorName: data.authorName,
                        mediaUrls: data.mediaUrls || []
                    });
                } catch (err) {
                    console.error(err);
                    setError("Failed to load post for editing.");
                } finally {
                    setLoading(false);
                }
            };
            loadPost();
        }
    }, [mode, id]);

    const handleAddUrl = (e) => {
        e.preventDefault();
        if (newUrl.trim()) {
            setForm(prev => ({ ...prev, mediaUrls: [...prev.mediaUrls, newUrl.trim()] }));
            setNewUrl("");
        }
    };

    const handleRemoveUrl = (index) => {
        setForm(prev => ({ ...prev, mediaUrls: prev.mediaUrls.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (mode === 'create') {
                await api.createPost(form);
            } else {
                await api.updatePost(id, {
                    title: form.title,
                    content: form.content,
                    mediaUrls: form.mediaUrls,
                });
            }
            navigate('/manage');
        } catch (err) {
            console.error(err);
            const validationDetails = err.errors
                ? Object.entries(err.errors).map(([field, message]) => `${field}: ${message}`).join('\n')
                : null;
            setError(validationDetails || err.message || "Failed to save post.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-wrap">
                <Loader2 className="animate-spin" size={52} />
            </div>
        );
    }

    return (
        <div className="container animate-in">
            <div className="form-card">
                <aside className="form-aside">
                    <div>
                        <p className="eyebrow" style={{ color: 'var(--accent-soft)' }}>{mode === 'create' ? 'New draft' : 'Edit record'}</p>
                        <h1 className="display-font" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.9, margin: '12px 0 18px' }}>
                            {mode === 'create' ? 'Shape the story.' : 'Tune the piece.'}
                        </h1>
                        <p style={{ color: 'rgba(255, 250, 240, 0.7)', margin: 0 }}>
                            Keep the writing focused, add useful media, then return to the board when it is ready.
                        </p>
                    </div>
                    <div style={{ color: 'rgba(255, 250, 240, 0.58)', fontWeight: 700 }}>
                        {form.content.length} characters drafted
                    </div>
                </aside>

                <section className="form-body">
                    {error && <div className="alert" style={{ marginBottom: 20, whiteSpace: 'pre-line' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 22 }}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                                placeholder="A headline with a point of view"
                            />
                        </div>

                        <div>
                            <label htmlFor="content">Body</label>
                            <textarea
                                id="content"
                                value={form.content}
                                onChange={e => setForm({ ...form, content: e.target.value })}
                                required
                                rows={13}
                                placeholder="Start with the argument, then make it worth reading."
                            />
                        </div>

                        <div className="field-grid">
                            <div>
                                <label htmlFor="author">Author</label>
                                <input
                                    id="author"
                                    type="text"
                                    value={form.authorName}
                                    onChange={e => setForm({ ...form, authorName: e.target.value })}
                                    required
                                    disabled={mode === 'edit'}
                                    style={{ opacity: mode === 'edit' ? 0.62 : 1 }}
                                />
                                {mode === 'edit' && (
                                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', margin: '8px 0 0' }}>
                                        Author cannot be changed after creation.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mediaUrl">Media URL</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 46px', gap: 8 }}>
                                    <input
                                        id="mediaUrl"
                                        type="url"
                                        value={newUrl}
                                        onChange={e => setNewUrl(e.target.value)}
                                        placeholder="https://example.com/image.png"
                                    />
                                    <button type="button" onClick={handleAddUrl} className="btn btn-secondary btn-icon" title="Add media URL">
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {form.mediaUrls.length > 0 && (
                                    <ul className="media-list">
                                        {form.mediaUrls.map((url, i) => (
                                            <li key={i}>
                                                <span>{url}</span>
                                                <button type="button" onClick={() => handleRemoveUrl(i)} className="btn btn-danger btn-icon" title="Remove media URL">
                                                    <X size={15} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap', paddingTop: 8 }}>
                            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {mode === 'create' ? 'Save Draft' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
