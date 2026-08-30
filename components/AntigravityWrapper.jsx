"use client";

import dynamic from 'next/dynamic';

const Antigravity = dynamic(() => import('./Antigravity'), { ssr: false });

export default function AntigravityWrapper(props) {
  return <Antigravity {...props} />;
}
