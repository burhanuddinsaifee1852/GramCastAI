import PrototypeStatus from "./components/PrototypeStatus";
import SihHero from "./components/SihHero";
import BeforeAfter from "./components/BeforeAfter";
import ModelValidation from "./components/ModelValidation";
import PanchayatMap from "./components/PanchayatMap";
import {
  Activity,
  BrainCircuit,
  CloudRain,
  Database,
  MapPinned,
  Sprout,
  TriangleAlert,
} from "lucide-react";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="mx-auto max-w-7xl px-6 py-10">

        <SihHero />

        <PrototypeStatus />

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Smart India Hackathon 2026
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            GramCast AI
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            Explainable Panchayat-level weather intelligence
            for climate-smart agriculture.
          </p>

        </div>


        <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-amber-400" />

            <div>
              <p className="font-semibold text-amber-300">
                Prototype Data Mode
              </p>

              <p className="text-sm text-slate-400">
                Current Panchayat values are temporary demo data.
                Real AI model outputs will replace them.
              </p>
            </div>

          </div>

        </div>


        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <Card
            icon={<MapPinned />}
            title="Pilot Region"
            value="Sanwer"
            subtitle="Indore, Madhya Pradesh"
          />

          <Card
            icon={<CloudRain />}
            title="Panchayats"
            value="5"
            subtitle="Prototype monitoring"
          />

          <Card
            icon={<BrainCircuit />}
            title="AI Engine"
            value="V1"
            subtitle="Downscaling model"
          />

          <Card
            icon={<Database />}
            title="Spatial DB"
            value="PostGIS"
            subtitle="GIS foundation"
          />

        </div>


        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">

          <div className="flex items-center gap-3">

            <Activity className="text-emerald-400" />

            <h2 className="text-2xl font-semibold">
              GramCast Intelligence Pipeline
            </h2>

          </div>


          <div className="mt-7 grid gap-4 md:grid-cols-5">

            {[
              "Block Forecast",
              "Local Features",
              "AI Downscaling",
              "Weather Risk",
              "Farmer Action",
            ].map((step, index) => (

              <div
                key={step}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >

                <p className="text-xs font-bold text-emerald-400">
                  STEP {index + 1}
                </p>

                <p className="mt-3 font-semibold">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">

            <div className="flex items-center gap-3">

              <CloudRain className="text-blue-400" />

              <h2 className="text-xl font-semibold">
                Weather Overview
              </h2>

            </div>


            <div className="mt-6 space-y-4">

              <WeatherRow
                label="Block Rainfall"
                value="20 mm"
              />

              <WeatherRow
                label="Temperature"
                value="29°C"
              />

              <WeatherRow
                label="Humidity"
                value="74%"
              />

              <WeatherRow
                label="Wind Speed"
                value="11 km/h"
              />

            </div>

          </div>


          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">

            <div className="flex items-center gap-3">

              <Sprout className="text-emerald-400" />

              <h2 className="text-xl font-semibold">
                Farmer Advisory Preview
              </h2>

            </div>


            <div className="mt-6 rounded-2xl bg-slate-950 p-5">

              <p className="text-sm text-slate-500">
                Crop
              </p>

              <p className="mt-1 text-lg font-bold">
                Soybean
              </p>


              <p className="mt-5 text-sm text-slate-500">
                Weather Risk
              </p>

              <p className="mt-1 font-bold text-red-400">
                HIGH
              </p>


              <ul className="mt-5 space-y-3 text-sm text-slate-300">

                <li>✓ Avoid unnecessary irrigation</li>

                <li>✓ Delay spraying during heavy rainfall risk</li>

                <li>✓ Ensure proper field drainage</li>

                <li>✓ Monitor waterlogging</li>

              </ul>

            </div>

          </div>

        </section>

        <section className="mt-8">

          <div className="mb-5">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Geospatial Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Sanwer Panchayat Weather Risk Map
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Click any Panchayat marker to view the
              localized GramCast weather estimate,
              risk level and soybean advisory.
            </p>

          </div>


          <div className="mb-4 flex flex-wrap gap-4 text-sm">

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              Low Risk
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-400"></span>
              Moderate Risk
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              High Risk
            </span>

          </div>


          <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">

            Prototype Panchayat locations are currently
            used for UI development. They are not being
            represented as official Panchayat boundaries.

          </div>


          <PanchayatMap />

        </section>

        <BeforeAfter />

        <ModelValidation />

      </section>

    </main>
  );
}


function Card({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="mb-5 text-emerald-400">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}


function WeatherRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

export default App;
