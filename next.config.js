/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		const isProd = process.env.NODE_ENV === "production";

		return [
			{
				source: "/api/:path*",
				destination: isProd
					? "https://your-deployed-backend-url.com/:path*" // 🌍 production backend
					: "http://localhost:4000/:path*", // 💻 local backend
			},
		];
	},
};

export default nextConfig;
