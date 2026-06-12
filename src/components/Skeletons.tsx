import React from 'react';

const HeroSkeleton = () => (
  <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 md:py-48 flex flex-col md:flex-row items-center gap-12 md:gap-24 animate-pulse">
    <div className="flex-1 w-full space-y-6">
      <div className="h-4 bg-gray-300/50 rounded w-1/3"></div>
      <div className="space-y-3">
        <div className="h-16 md:h-24 bg-gray-300/50 rounded w-full"></div>
        <div className="h-16 md:h-24 bg-gray-300/50 rounded w-4/5"></div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-6 bg-gray-300/50 rounded w-full"></div>
        <div className="h-6 bg-gray-300/50 rounded w-5/6"></div>
        <div className="h-6 bg-gray-300/50 rounded w-4/6"></div>
      </div>
    </div>
    <div className="flex-1 w-full max-w-md">
      <div className="aspect-[4/5] bg-gray-300/50 rounded-lg w-full"></div>
    </div>
  </div>
);

const QuoteSkeleton = () => (
  <div className="max-w-4xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center animate-pulse">
    <div className="w-full space-y-4 flex flex-col items-center">
      <div className="h-8 bg-gray-700/50 rounded w-full max-w-2xl"></div>
      <div className="h-8 bg-gray-700/50 rounded w-full max-w-xl"></div>
      <div className="h-6 bg-gray-700/50 rounded w-48 mt-8"></div>
    </div>
  </div>
);

const FrameworksSkeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-32 md:py-48 animate-pulse">
    <div className="max-w-3xl">
      <div className="space-y-4 mb-16">
        <div className="h-16 md:h-24 bg-red-400/50 rounded w-3/4"></div>
        <div className="h-16 md:h-24 bg-red-400/50 rounded w-5/6"></div>
      </div>
      <div className="space-y-8">
        <div className="h-8 bg-red-400/50 rounded w-full max-w-md"></div>
        <div className="h-8 bg-red-400/50 rounded w-full max-w-sm"></div>
        <div className="h-8 bg-red-400/50 rounded w-full max-w-lg"></div>
      </div>
    </div>
  </div>
);

const ProjectsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 animate-pulse">
    <div className="mb-16 md:mb-24 space-y-4">
      <div className="h-4 bg-gray-700/50 rounded w-32"></div>
      <div className="h-12 md:h-16 bg-gray-700/50 rounded w-64 mt-4"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {[1,2,3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[4/3] bg-gray-700/50 rounded-lg w-full"></div>
          <div className="h-8 bg-gray-700/50 rounded w-3/4"></div>
          <div className="h-12 bg-gray-700/50 rounded w-full"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-700/50 rounded w-16"></div>
            <div className="h-6 bg-gray-700/50 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const WidgetSkeletonRenderer: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Simulating the structure: Hero -> Quote -> Frameworks */}
      <section className="w-full bg-[#fde460]/40">
         <HeroSkeleton />
      </section>
      <section className="w-full bg-[#1a1a1a]">
         <QuoteSkeleton />
      </section>
      <section className="w-full bg-[#ff6b6c]/40">
         <FrameworksSkeleton />
      </section>
      <section className="w-full bg-[#1a1a1a]">
         <ProjectsSkeleton />
      </section>
    </div>
  );
};
