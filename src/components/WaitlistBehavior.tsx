'use client';

import { useEffect } from 'react';
import { bindWaitlistForm } from '@/lib/waitlist';

// Replaces the old `<script src="/js/app.js">` tag. A raw <script> in a React tree only
// runs on a full page load, so after a next/link navigation (hub ↔ /air) the form had no
// submit handler and signups were silently lost. An effect runs after every mount.
export default function WaitlistBehavior() {
  useEffect(() => bindWaitlistForm(), []);
  return null;
}
