import {
  useEffect,
  useState,
} from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BrainCircuit,
  FlaskConical,
} from "lucide-react";


interface MetricsResponse {
  modelVersion: string;
  mode: string;
  baselineMAE: number;
  baselineRMSE: number;
  gramcastMAE: number;
  gramcastRMSE: number;
}


export default function ModelValidation() {

  const [
    metrics,
    setMetrics,
  ] = useState<MetricsResponse | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState(false);


  useEffect(() => {

    fetch(
      "http://localhost:8002/metrics"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error();
        }

        return response.json();

      })
      .then((data) => {

        setMetrics(data);

      })
      .catch(() => {

        setError(true);

      });

  }, []);


  if (error) {

    return (
      <section className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-7">

        <p className="font-semibold text-red-400">
          AI metrics service unavailable
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Make sure FastAPI is running on port 8002.
        </p>

      </section>
    );
  }


  if (!metrics) {

    return (
      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">

        <p className="text-slate-400">
          Loading GramCast model metrics...
        </p>

      </section>
    );
  }


  const chartData = [

    {
      metric: "MAE",
      baseline: metrics.baselineMAE,
      gramcast: metrics.gramcastMAE,
    },

    {
      metric: "RMSE",
      baseline: metrics.baselineRMSE,
      gramcast: metrics.gramcastRMSE,
    },

  ];


  return (

    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">

      <div className="flex items-start justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <FlaskConical className="text-emerald-400" />

            <h2 className="text-2xl font-semibold">
              Scientific Model Validation
            </h2>

          </div>


          <p className="mt-3 max-w-3xl text-sm text-slate-400">
            GramCast AI is compared against the original
            coarse block-level forecast baseline.
          </p>

        </div>


        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
          {metrics.modelVersion}
        </span>

      </div>


      <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">

        <p className="text-sm font-semibold text-amber-300">
          Prototype Evaluation
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          Current metrics are generated using the prototype
          synthetic training/evaluation dataset. They must not
          be presented as validated IMD field accuracy.
        </p>

      </div>


      <div className="mt-7 grid gap-5 md:grid-cols-4">

        <Metric
          label="Baseline MAE"
          value={metrics.baselineMAE}
        />

        <Metric
          label="GramCast MAE"
          value={metrics.gramcastMAE}
        />

        <Metric
          label="Baseline RMSE"
          value={metrics.baselineRMSE}
        />

        <Metric
          label="GramCast RMSE"
          value={metrics.gramcastRMSE}
        />

      </div>


      <div className="mt-8 h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="metric"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="baseline"
              name="Block Baseline"
              fill="#64748b"
            />

            <Bar
              dataKey="gramcast"
              name="GramCast AI"
              fill="#10b981"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>


      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-950 p-4">

        <BrainCircuit
          className="mt-0.5 text-emerald-400"
          size={20}
        />

        <p className="text-sm leading-6 text-slate-400">
          Lower MAE and RMSE values indicate lower forecast
          error. Final SIH results will be calculated using
          verified historical observations and leakage-safe
          validation.
        </p>

      </div>

    </section>

  );
}


function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value.toFixed(3)}
      </p>

    </div>

  );
}
