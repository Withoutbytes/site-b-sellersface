// next.config.js
module.exports = {
	async rewrites() {
		return [
			{
				source: "/metalives/:path*",
				destination: "https://www.reclamajus.com.br/:path*",
			},
		];
	},
};
