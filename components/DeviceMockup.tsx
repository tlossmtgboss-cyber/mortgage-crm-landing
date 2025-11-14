'use client';

interface DeviceMockupProps {
  type: 'laptop' | 'phone';
  imageUrl: string;
  alt: string;
}

export default function DeviceMockup({ type, imageUrl, alt }: DeviceMockupProps) {
  if (type === 'laptop') {
    return (
      <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
        {/* Laptop frame */}
        <div className="relative rounded-t-2xl bg-gray-900 p-2 shadow-2xl">
          {/* Screen bezel */}
          <div className="relative rounded-lg bg-gray-800 p-3">
            {/* Actual screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white">
              <img
                src={imageUrl}
                alt={alt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          {/* Camera notch */}
          <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-gray-700"></div>
        </div>
        {/* Laptop base */}
        <div className="relative h-4 rounded-b-2xl bg-gray-800 shadow-lg">
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
        </div>
        {/* Shadow underneath */}
        <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/20 blur-2xl"></div>
      </div>
    );
  }

  // iPhone mockup
  return (
    <div className="relative mx-auto" style={{ maxWidth: '300px' }}>
      {/* Phone frame */}
      <div className="relative rounded-[3rem] bg-gray-900 p-3 shadow-2xl">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-10 h-7 w-40 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>
          {/* Image */}
          <div className="relative aspect-[9/19.5]">
            <img
              src={imageUrl}
              alt={alt}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        {/* Side buttons */}
        <div className="absolute -right-1 top-32 h-16 w-1 rounded-r-lg bg-gray-800"></div>
        <div className="absolute -left-1 top-24 h-8 w-1 rounded-l-lg bg-gray-800"></div>
        <div className="absolute -left-1 top-36 h-12 w-1 rounded-l-lg bg-gray-800"></div>
      </div>
      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 h-12 w-2/3 -translate-x-1/2 rounded-full bg-black/30 blur-2xl"></div>
    </div>
  );
}
