/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*'
            },
            {
                hostname: "encrypted-tbn1.gstatic.com"
            },
            {
                hostname: "images-americanas.b2w.io"
            }
        ]
    }
}

module.exports = nextConfig
