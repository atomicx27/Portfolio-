'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Users, FolderDot, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

interface GitHubUserData {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string;
}

interface RepoData {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function GitHubStatsSection() {
  const [userData, setUserData] = useState<GitHubUserData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const userRes = await fetch('https://api.github.com/users/atomicx27');
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userJson = await userRes.json();
        setUserData(userJson);

        // Fetch user repos (up to 100)
        const reposRes = await fetch('https://api.github.com/users/atomicx27/repos?per_page=100&sort=updated');
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposJson = await reposRes.json();
        setRepos(reposJson);
        setError(false);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Calculate statistics
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  // Calculate top languages
  const languagesMap: { [key: string]: number } = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
    }
  });

  const totalLangRepos = Object.values(languagesMap).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(languagesMap)
    .map(([lang, count]) => ({
      name: lang,
      percentage: Math.round((count / totalLangRepos) * 100),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5 languages

  // Top repositories by star count
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
    .slice(0, 4);

  if (loading) {
    return (
      <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 theme-accent-text animate-spin mb-4" />
          <p className="theme-text-secondary text-sm">Fetching live GitHub activity...</p>
        </div>
      </section>
    );
  }

  // Fallback to static display if API fails (rate limits)
  if (error || !userData) {
    return (
      <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text mb-8">GitHub Activity</h2>
          <div className="theme-card-bg rounded-2xl p-8 border theme-border max-w-lg mx-auto">
            <Github className="w-12 h-12 theme-accent-text mx-auto mb-4" />
            <h3 className="text-lg font-semibold theme-text mb-2">Explore My Work directly on GitHub</h3>
            <p className="theme-text-secondary text-sm mb-6">
              You can view all my repositories, contributions, and active projects directly on my profile.
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white theme-accent-bg font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Github className="w-5 h-5" /> Visit atomicx27 on GitHub
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Card */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="theme-card-bg rounded-2xl p-6 border theme-border flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={userData.avatar_url}
                  alt={userData.login}
                  className="w-16 h-16 rounded-full border-2 border-[var(--accent-primary)]"
                />
                <div>
                  <h3 className="text-lg font-bold theme-text leading-tight">{userData.name || userData.login}</h3>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm theme-accent-text hover:underline flex items-center gap-1 mt-1"
                  >
                    @{userData.login}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b theme-border">
                  <div className="flex items-center gap-2 theme-text-secondary text-sm">
                    <FolderDot className="w-4 h-4" />
                    <span>Public Repositories</span>
                  </div>
                  <span className="font-bold theme-text">{userData.public_repos}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b theme-border">
                  <div className="flex items-center gap-2 theme-text-secondary text-sm">
                    <Users className="w-4 h-4" />
                    <span>Followers</span>
                  </div>
                  <span className="font-bold theme-text">{userData.followers}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b theme-border">
                  <div className="flex items-center gap-2 theme-text-secondary text-sm">
                    <Users className="w-4 h-4" />
                    <span>Following</span>
                  </div>
                  <span className="font-bold theme-text">{userData.following}</span>
                </div>
              </div>
            </div>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl border theme-border theme-text-secondary hover:theme-accent-text hover:border-[var(--accent-primary)] transition-all duration-300 font-medium text-sm"
            >
              <Github className="w-4 h-4" /> View GitHub Profile
            </a>
          </motion.div>

          {/* Stats Metrics Card */}
          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="theme-card-bg rounded-2xl p-6 border theme-border flex flex-col justify-between"
          >
            <div>
              <h4 className="text-md font-bold theme-text mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 theme-accent-text" /> Repository Stats
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl theme-bg-secondary border theme-border text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <span className="text-2xl font-bold theme-text block">{totalStars}</span>
                  <span className="text-xs theme-text-muted">Total Stars</span>
                </div>
                <div className="p-4 rounded-xl theme-bg-secondary border theme-border text-center">
                  <GitFork className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <span className="text-2xl font-bold theme-text block">{totalForks}</span>
                  <span className="text-xs theme-text-muted">Total Forks</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl theme-bg-secondary border theme-border flex justify-between items-center">
                <span className="text-sm theme-text-secondary">Average Stars/Repo</span>
                <span className="font-bold theme-text">
                  {repos.length > 0 ? (totalStars / repos.length).toFixed(1) : 0}
                </span>
              </div>
            </div>

            <div className="text-center text-xs theme-text-muted italic mt-6">
              * Statistics calculated from live public repositories
            </div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="theme-card-bg rounded-2xl p-6 border theme-border"
          >
            <h4 className="text-md font-bold theme-text mb-6 flex items-center gap-2">
              <span className="text-lg">📊</span> Top Languages
            </h4>

            {topLanguages.length === 0 ? (
              <p className="text-sm theme-text-muted italic text-center py-10">No languages found</p>
            ) : (
              <div className="space-y-4">
                {topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span className="theme-text">{lang.name}</span>
                      <span className="theme-accent-text">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full theme-bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' as const }}
                        className="h-full rounded-full theme-accent-bg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Popular Repos Panel */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="theme-card-bg rounded-2xl p-6 border theme-border"
        >
          <h4 className="text-md font-bold theme-text mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" /> Popular Repositories
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl theme-bg-secondary border theme-border hover:border-[var(--accent-primary)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold theme-text group-hover:theme-accent-text transition-colors duration-200 truncate">
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 theme-text-secondary border theme-border">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <p className="text-xs theme-text-secondary line-clamp-2 mb-4">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                <div className="flex gap-4 text-xs theme-text-muted">
                  <span className="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                    <Star className="w-3.5 h-3.5 fill-current" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
