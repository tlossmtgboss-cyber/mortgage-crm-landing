'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-8">We encountered an unexpected error. Please try again.</p>
        <button onClick={reset} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors font-semibold">
          Try Again
        </button>
      </div>
    </div>
  );
}
