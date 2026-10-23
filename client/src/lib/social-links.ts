"use client";

import { useEffect, useState } from "react";

export interface SocialLinkType {
  id: number;
  platform: Record<string, string>;
  url: string;
  icon: string | null;
}

const API_URL = "/api";

// Module-level cache: header + footer share one request per page load
let cache: SocialLinkType[] | null = null;
let inflight: Promise<SocialLinkType[]> | null = null;

function fetchSocialLinks(): Promise<SocialLinkType[]> {
  // Only short-circuit on a non-empty cache — a transient empty/failed
  // response must not get stuck for the rest of the tab's session.
  if (cache && cache.length > 0) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch(`${API_URL}/social-links`)
      .then((res) => res.json())
      .then((data) => {
        const links = Array.isArray(data) ? data : [];
        if (links.length > 0) cache = links;
        inflight = null;
        return links;
      })
      .catch((err) => {
        console.error("Failed to fetch social links:", err);
        inflight = null;
        return [];
      });
  }
  return inflight;
}

export function useSocialLinks(): { links: SocialLinkType[]; loading: boolean } {
  const [links, setLinks] = useState<SocialLinkType[]>(cache ?? []);
  // Shared hosting can take a couple seconds to respond — track loading
  // so callers don't flash a misleading "no links" message meanwhile.
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    let active = true;
    fetchSocialLinks().then((data) => {
      if (active) {
        setLinks(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { links, loading };
}
