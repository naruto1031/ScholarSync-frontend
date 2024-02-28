// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
