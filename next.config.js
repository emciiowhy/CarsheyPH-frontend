/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images (existing)
      {
        protocol: "https",
        hostname: "placehold.co",
      },

      // 👉 Add your real image storage domain here
      // Example: Amazon S3
      {
        protocol: "https",
        hostname: "carshey-files.s3.amazonaws.com",
      },

      // Example: Supabase Storage
      // {
      //   protocol: "https",
      //   hostname: "your-project.supabase.co",
      // },

      // Example: Local backend serving images
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "5000",
      // },
    ],
  },

  // Rewrites let the frontend access your backend API without CORS issues
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Backend API route
      },
    ];
  },
};

export default nextConfig;
