'use client';

import React, { useState, useEffect } from 'react';
// import { useGitHubStats } from '../hooks/use-github-stats.js';

// Move hook directly into this file to test
function useGitHubStats(username) {
  console.log('Inline useGitHubStats called with username:', username);
  const [stats, setStats] = useState({
    commitsThisYear: 0,
    topRepos: [],
    totalRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    languages: [],
    lastCommitDate: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!username) return;

    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        const userResponse = await fetch(`/api/github/user/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        const reposResponse = await fetch(`/api/github/repos/${username}`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos data');
        const reposData = await reposResponse.json();

        const commitsResponse = await fetch(`/api/github/commits/${username}`);
        if (!commitsResponse.ok) throw new Error('Failed to fetch commits data');
        const commitsData = await commitsResponse.json();

        setStats({
          commitsThisYear: commitsData.commitsThisYear,
          topRepos: reposData.topRepos,
          totalRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars: reposData.totalStars,
          languages: reposData.languages,
          lastCommitDate: commitsData.lastCommitDate,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
}

const GentooAscii = () => (
  <pre className="text-sm font-mono text-frappe-mauve leading-tight whitespace-pre">
{`            -/oyddmdhs+:.                
      -odNMMMMMMMMNNmhy+-\`             
    -yNMMMMMMMMMMMNNNmmdhy+-           
  \`omMMMMMMMMMMMMNmdmmmmddhhy/\`        
  omMMMMMMMMMMMNhhyyyohmdddhhhdo\`      
 .ydMMMMMMMMMMdhs++so/smdddhhhhdm+\`    
  oyhdmNMMMMMMMNdyooydmddddhhhhyhNd.   
   :oyhhdNNMMMMMMMNNNmmdddhhhhhyymMh   
     .:+sydNMMMMMNNNmmmdddhhhhhhmMmy   
        /mMMMMMMNNNmmmdddhhhhhmMNhs:   
     \`oNMMMMMMMNNNmmmddddhhdmMNhs+\`    
   \`sNMMMMMMMMNNNmmmdddddmNMmhs/.      
  /NMMMMMMMMNNNNmmmdddmNMNdso:\`        
 +MMMMMMMNNNNNmmmmdmNMNdso/-           
 yMMNNNNNNNmmmmmNNMmhs+/-\`             
 /hMMNNNNNNNNMNdhs++/-\`                
 \`/ohdmmddhys+++/:.                   
   \`-//////:--.                       `}
  </pre>
);

const PowerLevel10K = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="mt-6 space-y-2 font-mono text-sm">
      {/* First line of prompt */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* OS segment with Gentoo logo - natural size */}
          <div className="flex items-center">
            <span className="bg-frappe-overlay2 text-frappe-base px-2 py-0.5 rounded-l-full rounded-r-sm flex items-center h-5">
              <svg className="w-4 h-4" viewBox="0 0 400 400" fill="currentColor">
                <path d="M13.83,315.949c0.043,-16.447 14.024,-39.408 33.889,-60.268c13.276,-13.941 26.759,-26.178 56.15,-51.238c-20.33,-11.156 -51.95,-24.615 -67.815,-42.242c-5.87,-6.522 -16.511,-21.298 -14.447,-41.039c4.206,-40.236 53.869,-101.298 124.46,-114.207c23.488,-4.296 50.455,-1.195 72.65,8.783c69.629,31.304 154.782,109.073 165.259,147.046c3.688,13.366 2.979,34.671 -3.379,46.545c-7.879,14.716 -35.156,44.606 -72.475,75.449c-58.556,48.394 -140.612,100.359 -201.881,109.103c-19.798,2.826 -40.024,-0.121 -54.218,-8.13c-22.209,-12.532 -29.581,-29.262 -32.172,-34.277c-6.891,-13.334 -6.036,-30.228 -6.021,-35.525ZM178.63,131.173c0.756,-9.325 37.321,-0.042 35.011,7.343c-2.437,7.791 -35.879,3.354 -35.011,-7.343Z"/>
              </svg>
            </span>
            <span className="text-frappe-overlay2"></span>
          </div>
          
          {/* Directory segment */}
          <div className="flex items-center -ml-1">
            <span className="bg-frappe-blue text-white px-2 py-0.5 rounded-l-sm rounded-r-sm flex items-center h-5">
              <span className="mr-1"></span>
              <span>~/whoisjason</span>
            </span>
            <span className="text-frappe-blue"></span>
          </div>
          
          {/* Git branch segment */}
          <div className="flex items-center -ml-1">
            <span className="bg-frappe-green text-frappe-base px-2 py-0.5 rounded-l-sm rounded-r-full flex items-center h-5">
              <span className="mr-1"></span>
              <span>main</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Status segment */}
          <div className="flex items-center">
            <span className="bg-frappe-green text-frappe-base px-2 py-0.5 rounded-l-full rounded-r-sm flex items-center h-5">
              <span className="mr-1">✓</span>
              <span></span>
            </span>
            <span className="text-frappe-green"></span>
          </div>
          
          {/* Execution time segment */}
          <div className="flex items-center -ml-1">
            <span className="bg-frappe-yellow text-frappe-base px-2 py-0.5 rounded-l-sm rounded-r-sm flex items-center h-5">
              <span className="mr-1">⏱</span>
              <span>2s</span>
            </span>
            <span className="text-frappe-yellow"></span>
          </div>
          
          {/* Time segment */}
          <div className="flex items-center -ml-1">
            <span className="bg-frappe-overlay2 text-white px-2 py-0.5 rounded-l-sm rounded-r-full flex items-center h-5">
              <span className="mr-1">⏰</span>
              <span>{timeString}</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Second line of prompt */}
      <div className="flex items-center">
        <span className="text-frappe-green text-lg">❯</span>
        <span className="ml-1 animate-pulse">_</span>
      </div>
    </div>
  );
};

const ColorBlocks = () => (
  <div className="flex gap-1 mt-4 justify-center">
    <div className="w-6 h-6 bg-frappe-red rounded"></div>
    <div className="w-6 h-6 bg-frappe-peach rounded"></div>
    <div className="w-6 h-6 bg-frappe-yellow rounded"></div>
    <div className="w-6 h-6 bg-frappe-green rounded"></div>
    <div className="w-6 h-6 bg-frappe-blue rounded"></div>
    <div className="w-6 h-6 bg-frappe-mauve rounded"></div>
    <div className="w-6 h-6 bg-frappe-pink rounded"></div>
    <div className="w-6 h-6 bg-frappe-subtext0 rounded"></div>
  </div>
);

const TopRepos = ({ stats }) => {
  if (stats.loading) {
    return (
      <div className="space-y-0.5 px-[135px]">
        <div className="text-frappe-subtext0">Loading top repositories...</div>
        <div className="text-frappe-subtext0">Fetching commit data...</div>
        <div className="text-frappe-subtext0">Analyzing projects...</div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="space-y-0.5 px-[135px]">
        <div className="text-frappe-text whitespace-nowrap">whoisjason - Portfolio website</div>
        <div className="text-frappe-text whitespace-nowrap">MOTD - Creepy MOTD generator</div>
        <div className="text-frappe-text whitespace-nowrap">SVB-Wiki - Knowledge base</div>
        <div className="text-frappe-text whitespace-nowrap">bee-blog - Blog platform</div>
        <div className="text-frappe-text whitespace-nowrap">old-portfolio - Previous site</div>
      </div>
    );
  }

  const topRepos = stats.topRepos?.slice(0, 5) || [];

  return (
    <div className="space-y-0.5 px-[135px]">
      {topRepos.map((repo, index) => (
        <div key={repo.name} className="text-frappe-text whitespace-nowrap">
          {repo.name} - {repo.description || 'No description'}
        </div>
      ))}
      {topRepos.length === 0 && (
        <div className="text-frappe-subtext0">No repositories found</div>
      )}
    </div>
  );
};

const DeveloperStats = ({ stats }) => {

  if (stats.loading) {
    return (
      <div className="space-y-0.5 px-[135px]">
        <div className="text-frappe-subtext0">Loading GitHub stats...</div>
        <div className="text-frappe-subtext0">Fetching live data</div>
        <div className="text-frappe-subtext0">Calculating metrics</div>
        <div className="text-frappe-subtext0">Almost there...</div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="space-y-0.5 px-[135px]">
        <div className="text-frappe-text">Commits {new Date().getFullYear()}: 500+ contributions</div>
        <div className="text-frappe-text">Languages: JavaScript, TypeScript, HTML, CSS, Python</div>
        <div className="text-frappe-subtext0 text-xs">Live stats unavailable</div>
      </div>
    );
  }

  // Get all language names (not truncated)
  const allLanguages = stats.languages?.map(lang => lang.language).join(', ') || 'Loading languages...';

  return (
    <div className="space-y-0.5 px-[135px]">
      <div className="text-frappe-text">Commits this year ({new Date().getFullYear()}): {stats.commitsThisYear.toLocaleString()} contributions</div>
      <div className="text-frappe-text">Languages: {allLanguages}</div>
    </div>
  );
};

export function NeofetchCard({ githubUsername }) {
  // Use environment variable as fallback if no username is passed
  const username = githubUsername || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ljis120301";
  const githubStats = useGitHubStats(username);

  // Add state for real-time tracking
  const [startTime] = useState(() => new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Calculate uptime (time spent on site)
  const getUptime = () => {
    const timeDiff = currentTime - startTime;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="bg-frappe-mantle text-frappe-text p-6 rounded-lg w-full font-mono text-sm">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-frappe-red"></div>
          <div className="w-3 h-3 rounded-full bg-frappe-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-frappe-green"></div>
        </div>
        <p className="text-xs text-frappe-subtext0">zsh</p>
      </div>
      
      <div className="mb-4">
        <p className="text-frappe-green">
          <span className="text-frappe-mauve">~</span>
          <span className="text-frappe-overlay2">❯</span> 
          &nbsp;neofetch --whoami
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center lg:justify-start">
          <GentooAscii />
        </div>
        
        <div className="space-y-4 font-mono text-xs">
          {/* Developer Stats Section - Previously Hardware */}
          <div>
            <div className="text-center text-frappe-blue mb-1">
              ┌─────────────────────Developer Stats─────────────────────┐
            </div>
            <DeveloperStats stats={githubStats} />
            <div className="text-center text-frappe-blue mt-1">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          {/* Software Section */}
          <div>
            <div className="text-center text-frappe-blue mb-1">
              ┌──────────────────────Software──────────────────────┐
            </div>
            <div className="space-y-0.5 px-[135px]">
              <div className="text-frappe-text">OS: Gentoo Linux x86_64</div>
              <div className="text-frappe-text">Kernel: Linux 6.12.34-gentoo-dist</div>
              <div className="text-frappe-text">BIOS: 83ET57WW (1.27 ) (1.27)</div>
              <div className="text-frappe-text">Packages: 995 (emerge), 36 (flatpak)</div>
              <div className="text-frappe-text">Shell: zsh 5.9</div>
            </div>
            <div className="text-center text-frappe-blue mt-1">
              └────────────────────────────────────────────────────┘
            </div>
          </div>

          {/* Top Repos Section */}
          <div>
            <div className="text-center text-frappe-blue mb-1">
              ┌─────────────────────Top Repos─────────────────────┐
            </div>
            <TopRepos stats={githubStats} />
            <div className="text-center text-frappe-blue mt-1">
              └────────────────────────────────────────────────────┘
            </div>
          </div>

          {/* Uptime Section */}
          <div>
            <div className="text-center text-frappe-blue mb-1">
              ┌───────────────────────────────────Uptime / Age / DT─┐
            </div>
            <div className="space-y-0.5 px-4 text-center">
              <div className="text-frappe-text">Age: 23 Years</div>
              <div className="text-frappe-text">Uptime: {getUptime()}</div>
              <div className="text-frappe-text">DateTime: {currentTime.toLocaleString()}</div>
            </div>
            <div className="text-center text-frappe-blue mt-1">
              └─────────────────────────────────────────────────────┘
            </div>
          </div>

          <ColorBlocks />
        </div>
      </div>
      
      <PowerLevel10K />
    </div>
  );
} 