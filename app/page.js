'use client';

import Hero from "@/components/Hero";
import ExploreSection from "@/components/ExploreSection";
import LabLoader from "@/components/LabLoader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div>
      {loading && <LabLoader />}
      {!loading && (
        <>
          <Hero/>
          <ExploreSection/>
        </>
      )}
    </div>
  );
}