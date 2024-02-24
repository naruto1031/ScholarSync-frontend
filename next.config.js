const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
