'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { NodeKey } from '@/lib/verticals';

// Shared between §01's enumeration row and §02's atom so hovering a word or a
// node highlights both in sync, and so the hero's ambient word cycle can pause
// while either is hovered/focused.
interface HoverSyncValue {
  hovered: NodeKey | null;
  setHovered: (key: NodeKey | null) => void;
}

const HoverSyncContext = createContext<HoverSyncValue | null>(null);

export function HoverSyncProvider({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState<NodeKey | null>(null);
  const value = useMemo(() => ({ hovered, setHovered }), [hovered]);
  return <HoverSyncContext.Provider value={value}>{children}</HoverSyncContext.Provider>;
}

export function useHoverSync(): HoverSyncValue {
  const ctx = useContext(HoverSyncContext);
  if (!ctx) throw new Error('useHoverSync must be used within a HoverSyncProvider');
  return ctx;
}
