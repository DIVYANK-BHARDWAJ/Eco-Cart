"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ImpactDashboard() {
  const { cartItems } = useCart();

  // Compute metrics reflecting 'Before' and 'After' states dynamically
  const impactData = useMemo(() => {
    let beforeCarbon = 0;
    let beforePlastic = 0;
    let beforeWater = 0;
    let afterCarbon = 0;
    let afterPlastic = 0;
    let afterWater = 0;

    cartItems.forEach((item) => {
      // 'After' is simply the current impact of whatever is presently inside the cart
      afterCarbon += item.impact.carbon;
      afterPlastic += item.impact.plastic;
      afterWater += (item.impact.water || 0);

      // 'Before' implies representing the traditional item footprint regardless of swap status
      if (item.isEco) {
        // Reverse lookup traditional item by its pointer
        const traditionalEquivalent = products.find((p) => p.alternativeId === item.id);
        if (traditionalEquivalent) {
          beforeCarbon += traditionalEquivalent.impact.carbon;
          beforePlastic += traditionalEquivalent.impact.plastic;
          beforeWater += (traditionalEquivalent.impact.water || 0);
        } else {
          beforeCarbon += item.impact.carbon;
          beforePlastic += item.impact.plastic;
          beforeWater += (item.impact.water || 0);
        }
      } else {
        beforeCarbon += item.impact.carbon;
        beforePlastic += item.impact.plastic;
        beforeWater += (item.impact.water || 0);
      }
    });

    return {
      before: [beforeCarbon, beforePlastic, beforeWater],
      after: [afterCarbon, afterPlastic, afterWater],
    };
  }, [cartItems]);

  const data = {
    labels: ["Carbon Footprint (kg)", "Plastic Waste (g)", "Water Usage (gal)"],
    datasets: [
      {
        label: "Traditional (Before)",
        data: impactData.before,
        backgroundColor: "#D97757", // clay
        borderRadius: 6,
        minBarLength: 5, // Forces a baseline render so 0 values are explicitly visible!
      },
      {
        label: "Optimized (After)",
        data: impactData.after,
        backgroundColor: "#1E392A", // forest
        borderRadius: 6,
        minBarLength: 5, // Shows an explicit marker even when Plastic = 0
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#1A1A1A", // ink
          font: {
            family: "'Inter', sans-serif",
            weight: 600,
          },
        },
      },
      title: {
        display: true,
        text: "Real-time Environmental Impact",
        color: "#1A1A1A",
        font: {
          family: "'Inter', sans-serif",
          size: 18,
          weight: "bold" as const,
        },
      },
      tooltip: {
        backgroundColor: "#1E392A", // forest
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const val = context.raw || 0;
            return ` ${label}: ${Number(val).toFixed(2)} units`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Normalized Impact Units",
          font: {
            family: "'Inter', sans-serif",
            weight: "bold" as const,
          }
        },
        beginAtZero: true,
        grid: {
          color: "rgba(168, 187, 161, 0.2)", // sage transparency
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            weight: 600,
          }
        }
      },
    },
    animation: {
      duration: 800, 
      easing: "easeOutQuart" as const,
    },
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-sage/50 rounded-2xl bg-white/50 h-[300px] w-full max-w-4xl mx-auto">
        <div className="text-4xl mb-4 text-sage opacity-50">📊</div>
        <p className="text-ink/70 font-medium">Add items to your cart to visualize your impact!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-sage/30 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="h-[400px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
