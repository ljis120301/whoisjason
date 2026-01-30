'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRealtimeData } from '../hooks/use-realtime-data.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Clock, Code, GitBranch, Github, Music, MessageSquare, Monitor, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const InfoItem = ({ icon: Icon, label, value, subValue, isLoading }) => (
  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {isLoading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        <>
          <p className="text-sm font-semibold text-foreground">{value || "N/A"}</p>
          {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
        </>
      )}
    </div>
  </div>
);

export function NeofetchCard({ githubUsername }) {
  const username = githubUsername || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ljis120301";
  const realtimeData = useRealtimeData();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => realtimeData.data || {}, [realtimeData.data]);
  const isLoading = !stats.github;

  const topRepos = stats.github?.repos?.topRepos?.slice(0, 3) || [];
  const languages = [...new Set(topRepos.map(repo => repo.language).filter(Boolean))].slice(0, 5);

  const getMusicStatus = () => {
    if (!stats.spotify) return { value: "Not Connected", sub: null };
    if (stats.spotify.currentTrack?.is_playing) {
      return {
        value: stats.spotify.currentTrack.name,
        sub: stats.spotify.currentTrack.artist
      };
    }
    if (stats.spotify.currentTrack) {
      return {
        value: stats.spotify.currentTrack.name,
        sub: `Last played: ${stats.spotify.currentTrack.artist}`
      };
    }
    return { value: "Not Playing", sub: null };
  };

  const getSteamStatus = () => {
    if (!stats.steam?.playerInfo) return { value: "Offline", sub: null };
    const { personastate, gameextrainfo } = stats.steam.playerInfo;
    if (gameextrainfo) return { value: "In-Game", sub: gameextrainfo };
    const states = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to Trade", "Looking to Play"];
    return { value: states[personastate] || "Offline", sub: null };
  };

  const musicInfo = getMusicStatus();
  const steamInfo = getSteamStatus();

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              System Status
            </CardTitle>
            <CardDescription>Live telemetry & development metrics</CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            v2.0.0
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Development
          </h3>
          <div className="space-y-1">
            <InfoItem
              icon={GitBranch}
              label="Commits (Year)"
              value={stats.github?.user?.commitsThisYear}
              isLoading={isLoading}
            />
            <InfoItem
              icon={Code}
              label="Top Languages"
              value={languages.join(", ")}
              isLoading={isLoading}
            />
            <InfoItem
              icon={Github}
              label="Latest Repo"
              value={topRepos[0]?.name}
              subValue={topRepos[0]?.description}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Activity
          </h3>
          <div className="space-y-1">
            <InfoItem
              icon={Music}
              label="Spotify"
              value={musicInfo.value}
              subValue={musicInfo.sub}
              isLoading={isLoading}
            />
            <InfoItem
              icon={Monitor}
              label="Steam Status"
              value={steamInfo.value}
              subValue={steamInfo.sub}
              isLoading={isLoading}
            />
            <InfoItem
              icon={Clock}
              label="Local Time"
              value={mounted && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}
              subValue={mounted && currentTime ? currentTime.toLocaleDateString() : "--/--/--"}
              isLoading={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
