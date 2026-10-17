'use client';

import { useEffect } from 'react';
import { bindInvestorForm } from '@/lib/investor';

// Binds the investor deck form after every mount (see WaitlistBehavior for why an effect).
export default function InvestorBehavior() {
  useEffect(() => bindInvestorForm(), []);
  return null;
}
