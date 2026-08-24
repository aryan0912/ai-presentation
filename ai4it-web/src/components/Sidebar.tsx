'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Welcome & Overview' },
    { href: '/day1/linear-regression', label: '1. Linear Regression' },
    { href: '/day1/neural-network', label: '2. Neural Networks' },
    { href: '/day2/rnn', label: '3. RNN & Memory' },
    { href: '/day2/lstm', label: '4. LSTM Gates' },
    { href: '/day2/transformer', label: '5. Transformers' },
    { href: '/day2/embeddings', label: '6. Embeddings' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2>AI4IT Workshop</h2>
        <p className="subtitle">Weekend 1: Patterns</p>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>The Copilot Thread</p>
      </div>
    </aside>
  );
}
