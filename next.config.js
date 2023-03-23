/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "user-post.s3.ap-south-1.amazonaws.com",
      "communityuserprofile.s3.ap-south-1.amazonaws.com",
      "communityuserprofile.s3.amazonaws.com",
      "event-profiles.s3.ap-south-1.amazonaws.com",
      "admin-management.s3.ap-south-1.amazonaws.com",
      "user-post-management.s3.amazonaws.com",
      "group-management-services.s3.amazonaws.com",
      "group-management-service.s3.ap-south-1.amazonaws.com",
      "group-management-service.s3.amazonaws.com",
      "user-post.s3.amazonaws.com",
    ],
  },
  // distDir: "build",
};

module.exports = nextConfig;
