import {
  ArrowRight,
  BrainCircuit,
  MapPinned,
  Sparkles,
} from "lucide-react";

export default function SihHero() {

  return (

    <section className="mb-10 overflow-hidden rounded-[32px] border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 p-7 md:p-10">

      <div className="flex flex-wrap items-center gap-3">

        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
          SIH 2026
        </span>

        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          SIH26074
        </span>

        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          Prototype Pilot — Sanwer, Indore
        </span>

      </div>


      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">

        <div>

          <div className="flex items-center gap-3 text-emerald-400">

            <Sparkles size={20} />

            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              Explainable Weather Intelligence
            </p>

          </div>


          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            GramCast AI
          </h1>


          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Transforming coarse block-level weather forecasts
            into localized Panchayat-level weather intelligence,
            risk assessment and actionable agricultural advisory.
          </p>


          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">

            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">

              <MapPinned
                size={18}
                className="text-emerald-400"
              />

              Sanwer, Indore

            </div>


            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">

              <BrainCircuit
                size={18}
                className="text-blue-400"
              />

              AI Downscaling Engine

            </div>

          </div>

        </div>


        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Core Transformation
          </p>


          <div className="mt-5 space-y-4">

            <FlowItem
              number="01"
              text="Block Forecast"
            />

            <div className="flex justify-center text-slate-600">
              ↓
            </div>

            <FlowItem
              number="02"
              text="GramCast AI"
              active
            />

            <div className="flex justify-center text-slate-600">
              ↓
            </div>

            <FlowItem
              number="03"
              text="Panchayat Intelligence"
            />

            <div className="flex justify-center text-slate-600">
              ↓
            </div>

            <FlowItem
              number="04"
              text="Farmer Action"
            />

          </div>

        </div>

      </div>


      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

        <ArrowRight
          size={20}
          className="mt-0.5 shrink-0 text-emerald-400"
        />

        <p className="text-sm leading-6 text-slate-400">
          <span className="font-semibold text-white">
            Problem Statement:
          </span>
          {" "}
          Downscaling weather forecasts from Block level to
          Panchayat level for agro-meteorological advisory services.
        </p>

      </div>

    </section>

  );
}


function FlowItem({
  number,
  text,
  active = false,
}: {
  number: string;
  text: string;
  active?: boolean;
}) {

  return (

    <div
      className={
        active
          ? "flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3"
          : "flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3"
      }
    >

      <span className="text-xs font-bold text-emerald-400">
        {number}
      </span>

      <span className="text-sm font-semibold">
        {text}
      </span>

    </div>

  );
}
