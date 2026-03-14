import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'taipeimetrohouse-2';

const nextConfig: NextConfig = {
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  basePath: isGithubPages ? `/${repoName}` : undefined,
  output: 'export',
  reactStrictMode: true,
};

export default nextConfig;
