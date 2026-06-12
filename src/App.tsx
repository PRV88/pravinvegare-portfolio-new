/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WidgetRenderer } from './components/Widgets';
import { WidgetSkeletonRenderer } from './components/Skeletons';
import { BackToTop } from './components/BackToTop';
import { CursorFollower } from './components/CursorFollower';
import { appConfig } from './data';
import { AppConfig } from './types';
import { soundSynth } from './utils/audio';

export default function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the configuration from an API or processing a JSON file
    const fetchConfig = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s artificial delay
        setConfig(appConfig);
      } catch (error) {
        console.error("Error loading config", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <div className="min-h-screen w-full font-sans bg-white selection:bg-[#3B4BE8] selection:text-white select-none">
      <CursorFollower />
      {config && <Header />}
      <main className="w-full">
        {loading || !config ? (
          <WidgetSkeletonRenderer />
        ) : (
          <WidgetRenderer widgets={config.widgets} />
        )}
      </main>
      <BackToTop />
    </div>
  );
}


