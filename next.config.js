/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	experimental: {
		appDir: true,
		serverActions: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}

module.exports = nextConfig
