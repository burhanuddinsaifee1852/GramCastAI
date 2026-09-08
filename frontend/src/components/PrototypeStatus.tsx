import {
  Activity,
  BrainCircuit,
  Database,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";


interface HealthResponse {
  service: string;
  status: string;
  modelVersion: string;
  mode: string;
}


export default function PrototypeStatus() {

  const [
    health,
    setHealth,
  ] = useState<HealthResponse | null>(
    null
  );


  const [
    online,
    setOnline,
  ] = useState(false);


  useEffect(() => {

    fetch(
      "http://localhost:8002/health"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error();
        }

        return response.json();

      })
      .then((data: HealthResponse) => {

        setHealth(data);
        setOnline(true);

      })
      .catch(() => {

        setOnline(false);

      });

  }, []);


  return (

    <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

        <div>

          <div className="flex items-center gap-3">

            <Activity className="text-emerald-400" />

            <h2 className="text-xl font-semibold">
              Prototype System Status
            </h2>

          </div>

          <p className="mt-2 text-sm text-slate-400">
            Current working vertical slice for the Sanwer pilot.
          </p>

        </div>


        <span
          className={
            online
              ? "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400"
              : "rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400"
          }
        >
          {online ? "● AI SERVICE LIVE" : "● AI SERVICE OFFLINE"}
        </span>

      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatusCard
          icon={<BrainCircuit size={20} />}
          title="ML Engine"
          value={
            health?.modelVersion ??
            "gramcast-rain-v1"
          }
        />

        <StatusCard
          icon={<Database size={20} />}
          title="Spatial Database"
          value="PostgreSQL + PostGIS"
        />

        <StatusCard
          icon={<MapPinned size={20} />}
          title="Pilot Region"
          value="Sanwer, Indore"
        />

        <StatusCard
          icon={<ShieldCheck size={20} />}
          title="Prototype Scope"
          value="5 Demo Panchayats"
        />

      </div>


      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

        <p className="text-sm font-semibold text-amber-300">
          Prototype Data Transparency
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Current Panchayat locations, training samples and
          evaluation results are prototype data used to demonstrate
          the complete technical pipeline. Final GramCast AI will
          train and validate on verified historical weather
          observations and authoritative geographic datasets.
        </p>

        <p className="mt-3 text-xs text-slate-500">
          Model mode: {health?.mode ?? "PROTOTYPE"}
        </p>

      </div>

    </section>

  );

}


function StatusCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <div className="text-emerald-400">
        {icon}
      </div>

      <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-semibold text-slate-200">
        {value}
      </p>

    </div>

  );

}
