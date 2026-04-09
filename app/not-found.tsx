import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors font-semibold inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
