/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                hostname: 'm.media-amazon.com'
            },
            {
                hostname: "encrypted-tbn1.gstatic.com"
            }
        ]
    }
}

module.exports = nextConfig
