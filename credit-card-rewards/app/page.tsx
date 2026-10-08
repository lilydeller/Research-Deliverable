"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Card = {
  name: string;
  issuer: string;
  rewards: {
    dining: number;
    groceries: number;
    travel: number;
    gas: number;
    other: number;
  };
};

const categories = [
  { value: "dining", label: "Dining" },
  { value: "groceries", label: "Groceries" },
  { value: "travel", label: "Travel" },
  { value: "gas", label: "Gas" },
  { value: "other", label: "Everything Else" },
] as const;

type Category = (typeof categories)[number]["value"];

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("dining");
  const [results, setResults] = useState<
    {
      card: Card;
      points: number;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    async function loadCards() {
      const { data, error } = await supabase
        .from("cards")
        .select("id, name, issuer, dining, groceries, travel, gas, other")
        .order("id");

      if (error) {
        console.error("Error loading cards:", error);
        return;
      }

      const formattedCards: Card[] = (data ?? []).map((card) => ({
        name: card.name,
        issuer: card.issuer,
        rewards: {
          dining: Number(card.dining),
          groceries: Number(card.groceries),
          travel: Number(card.travel),
          gas: Number(card.gas),
          other: Number(card.other),
        },
      }));

      setCards(formattedCards);
    }

    loadCards();
  }, []);

  function calculateRewards() {
    const purchaseAmount = Number(amount);

    if (!purchaseAmount || purchaseAmount <= 0) {
      setResults([]);
      return;
    }

    const calculated = cards
      .map((card) => {
        const multiplier = card.rewards[category];
        const points = purchaseAmount * multiplier;

        // For this prototype, assume 1 point = $0.01.
        const value = points * 0.01;

        return {
          card,
          points,
          value,
        };
      })
      .sort((a, b) => b.value - a.value);

    setResults(calculated);
  }

  const bestCard = results.length > 0 ? results[0] : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Research Milestone
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Credit Card Rewards Optimizer
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Enter a purchase and category to see which credit card would
            provide the most rewards.
          </p>
        </div>

        {/* Calculator */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="text-xl font-semibold">Calculate Rewards</h2>

          <p className="mt-1 text-sm text-slate-400">
            Try different purchases to compare your available cards.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Purchase Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500">
                  $
                </span>

                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="100.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-8 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Purchase Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Category)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={calculateRewards}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
          >
            Compare Cards
          </button>
        </section>

        {/* Results */}
        {results.length > 0 && (
          <section className="mt-8">
            {/* Recommendation */}
            {bestCard && (
              <div className="mb-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-400">
                  Recommended Card
                </p>

                <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {bestCard.card.name}
                    </h2>

                    <p className="mt-1 text-slate-400">
                      {bestCard.card.rewards[category]}x rewards on this
                      purchase
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-3xl font-bold text-blue-400">
                      ${bestCard.value.toFixed(2)}
                    </p>

                    <p className="text-sm text-slate-400">
                      estimated value
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison */}
            <h2 className="mb-4 text-xl font-semibold">
              Card Comparison
            </h2>

            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.card.name}
                  className={`rounded-xl border p-5 ${
                    index === 0
                      ? "border-blue-500/40 bg-slate-900"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-bold text-slate-300">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {result.card.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {result.card.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-sm text-slate-500">
                          Rewards
                        </p>

                        <p className="font-semibold">
                          {result.card.rewards[category]}x
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Points
                        </p>

                        <p className="font-semibold">
                          {result.points.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Value
                        </p>

                        <p className="font-semibold text-blue-400">
                          ${result.value.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {results.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-slate-800 p-10 text-center">
            <p className="text-slate-400">
              Enter a purchase amount and click{" "}
              <span className="font-semibold text-white">
                Compare Cards
              </span>{" "}
              to see your results.
            </p>
          </div>
        )}

        {/* Technology Section */}
        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-xl font-semibold">Technologies Used</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Supabase",
              "Vercel",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}