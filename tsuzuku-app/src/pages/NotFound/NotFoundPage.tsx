import { Link } from 'react-router-dom';
import { House, ArrowLeft } from '@phosphor-icons/react';

export default function NotFoundPage() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center p-6 text-center"
      style={{ background: 'var(--color-base-900)' }}
    >
      <div className="font-jp-serif font-bold text-jp-hero text-dim mb-2 select-none">
        無
      </div>
      <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>
        404 · Page Not Found
      </h1>
      <p className="text-base text-muted max-w-md mb-8">
        The path you are looking for does not exist or has moved. Return to the dashboard to continue your Japanese journey.
      </p>

      <Link to="/dashboard" className="btn btn-primary btn-xl gap-2">
        <House size={20} weight="fill" /> Return to Dashboard
      </Link>
    </div>
  );
}
