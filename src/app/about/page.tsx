import React from "react";
import AuditOverlay from "@/components/AuditOverlay";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out w-full">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-forest">
          About <span className="text-sage">Eco Cart</span>
        </h1>
        <p className="text-lg sm:text-xl text-ink/80 leading-relaxed text-left">
          Eco Cart was founded on a simple principle: consumers cannot make sustainable choices if they cannot explicitly see the environmental cost of their decisions. The modern consumer landscape specifically hides the actual "check-out" cost of carbon emissions, plastic waste, and water usage behind polished marketing parameters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
           <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-clay/30 text-left">
              <h3 className="text-2xl font-bold text-clay mb-2">Our Foundation</h3>
              <p className="text-ink/70">Founded by innovators who were tired of "green-washing", we built a real-time data visualizer strictly mapping conventional commodities against their optimized, highly-sustainable marketplace functional equivalents.</p>
           </div>
           <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-sage/30 text-left">
              <h3 className="text-2xl font-bold text-forest mb-2">The Technology</h3>
              <p className="text-ink/70">Eco Cart tracks your standard purchases by utilizing proprietary mappings—leveraging React-driven real-time states dynamically graphing your footprint versus exactly what you would save the planet by choosing an alternative checkout.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
