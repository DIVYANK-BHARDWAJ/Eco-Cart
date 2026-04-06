import React from "react";

export default function MissionPage() {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out w-full">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-forest">
          Our <span className="text-clay">Mission</span>
        </h1>
        <p className="text-lg sm:text-xl text-ink/80 leading-relaxed">
          We believe the global supply chain can be fully rehabilitated by educating just 1% of the consumer base. 
        </p>

        <div className="w-full mt-10 p-10 rounded-3xl bg-clay/10 border-2 border-clay/20 shadow-inner">
           <div className="flex flex-col md:flex-row justify-around items-center gap-8">
              <div className="text-center">
                 <h4 className="text-5xl font-black text-clay mb-2">0</h4>
                 <p className="text-ink font-semibold uppercase tracking-wider">Plastic in Landfills</p>
              </div>
              <div className="text-center">
                 <h4 className="text-5xl font-black text-forest mb-2">50%</h4>
                 <p className="text-ink font-semibold uppercase tracking-wider">Drop in Carbon Output</p>
              </div>
              <div className="text-center">
                 <h4 className="text-5xl font-black text-sage mb-2">1B</h4>
                 <p className="text-ink font-semibold uppercase tracking-wider">Gallons of Water</p>
              </div>
           </div>
           
           <p className="mt-8 text-ink/70 max-w-2xl mx-auto italic">
              "By 2030, our goal is to assist millions of users in automatically routing their purchasing power into ecological alternatives through zero-friction checkouts."
           </p>
        </div>
      </div>
    </div>
  );
}
