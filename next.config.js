/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "public.blob.vercel-storage.com",
          "res.cloudinary.com",
          "abs.twimg.com",
          "pbs.twimg.com",
          "avatar.vercel.sh",
          "avatars.githubusercontent.com",
          "www.google.com",
          "flag.vercel.app",
          "illustrations.popsy.co",
          "app.vercel.pub",
          "lh3.googleusercontent.com"
        ],
      },
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    }
}

module.exports = nextConfig
