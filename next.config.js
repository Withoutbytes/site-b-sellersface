// next.config.js
module.exports = {
	async rewrites() {
		return [
			{
				source: "/metalives/:path*",
				destination: "https://site-a-metalives.vercel.app/:path*",
			},
		];
	},
};
