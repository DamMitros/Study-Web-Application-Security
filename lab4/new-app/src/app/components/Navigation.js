"use client";

import { useRouter } from 'next/navigation';
import { useKeycloak } from '@react-keycloak/web';

export default function Navigation() {
  const router = useRouter();
  const { keycloak } = useKeycloak();
  
  return (
    <nav className="bg-slate-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-white font-bold text-xl">JustCreativeApp</div>
        <div className="flex space-x-2">
          <button onClick={() => router.push('/')} className="text-white hover:bg-slate-700 px-3 py-2 rounded transition">Home</button>
          {/* <button onClick={() => router.push('/play')}className="text-white hover:bg-slate-700 px-3 py-2 rounded transition">Play</button> */}
          {/* <button onClick={() => router.push('/about')} className="text-white hover:bg-slate-700 px-3 py-2 rounded transition">About</button> */}
          <button onClick={() => router.push('/login')} className="text-white hover:bg-slate-700 px-3 py-2 rounded transition">Login</button>
          {keycloak?.authenticated && keycloak.hasRealmRole("admin") && (
            <button onClick={() => router.push('/admin')} className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded transition">Admin</button>
          )}
        </div>
      </div>
    </nav>
  );
}