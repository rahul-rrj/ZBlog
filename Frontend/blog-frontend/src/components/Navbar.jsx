import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookMarked, Home, LayoutDashboard, PenSquare } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar">
            <Link to="/" className="brand">
                <span className="brand-mark">
                    <BookMarked size={23} />
                </span>
                <span>
                    <span className="brand-name">ZBlog Desk</span>
                    <span className="brand-note">Editorial console</span>
                </span>
            </Link>

            <nav className="nav-list" aria-label="Primary navigation">
                <NavLink to="/" icon={<Home size={18} />} label="Feed" active={isActive('/')} />
                <NavLink to="/create" icon={<PenSquare size={18} />} label="Compose" active={isActive('/create')} />
                <NavLink to="/manage" icon={<LayoutDashboard size={18} />} label="Board" active={isActive('/manage')} />
            </nav>

            <div className="sidebar-card">
                <strong>Publishing room</strong>
                Draft, review, and ship posts from one tidy workspace.
            </div>
        </aside>
    );
}

function NavLink({ to, icon, label, active }) {
    return (
        <Link to={to} className={`nav-link${active ? ' active' : ''}`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}
