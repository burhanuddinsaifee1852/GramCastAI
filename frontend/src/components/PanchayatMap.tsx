import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";

import {
  BrainCircuit,
  CloudRain,
  LoaderCircle,
  MapPin,
  Play,
  Sprout,
} from "lucide-react";

import {
  useState,
} from "react";


type RiskLevel =
  | "LOW"
  | "MODERATE"
  | "HIGH";


interface Panchayat {

  id: number;

  name: string;

  latitude: number;

  longitude: number;

  elevation: number;

  humidity: number;

}


interface Prediction {

  blockRainfall: number;

  predictedRainfall: number;

  lowerBound: number;

  upperBound: number;

  risk: RiskLevel;

  modelVersion: string;

  modelMode: string;

}


interface PanchayatResult
  extends Panchayat {

  prediction?: Prediction;

  error?: boolean;

}


const BLOCK_RAINFALL = 20;


const pilotPanchayats: Panchayat[] = [

  {
    id: 1,
    name: "Prototype Panchayat A",
    latitude: 22.986,
    longitude: 75.816,
    elevation: 470,
    humidity: 58,
  },

  {
    id: 2,
    name: "Prototype Panchayat B",
    latitude: 22.968,
    longitude: 75.808,
    elevation: 510,
    humidity: 68,
  },

  {
    id: 3,
    name: "Prototype Panchayat C",
    latitude: 22.956,
    longitude: 75.833,
    elevation: 590,
    humidity: 88,
  },

  {
    id: 4,
    name: "Prototype Panchayat D",
    latitude: 22.978,
    longitude: 75.848,
    elevation: 490,
    humidity: 63,
  },

  {
    id: 5,
    name: "Prototype Panchayat E",
    latitude: 22.993,
    longitude: 75.842,
    elevation: 620,
    humidity: 92,
  },

];


function getRiskColor(
  risk?: RiskLevel
) {

  if (risk === "HIGH") {
    return "#ef4444";
  }

  if (risk === "MODERATE") {
    return "#f59e0b";
  }

  if (risk === "LOW") {
    return "#10b981";
  }

  return "#64748b";
}


function getAdvisory(
  risk?: RiskLevel
) {

  if (risk === "HIGH") {

    return [
      "Avoid unnecessary irrigation.",
      "Delay pesticide spraying during rainfall risk.",
      "Ensure proper field drainage.",
      "Monitor waterlogging in soybean fields.",
    ];

  }


  if (risk === "MODERATE") {

    return [
      "Monitor rainfall before irrigation.",
      "Review spraying schedule.",
      "Check soil moisture before field operations.",
    ];

  }


  return [
    "Continue regular crop monitoring.",
    "Check soil moisture before irrigation.",
  ];
}


export default function PanchayatMap() {

  const [
    results,
    setResults,
  ] = useState<PanchayatResult[]>(
    pilotPanchayats
  );


  const [
    selected,
    setSelected,
  ] = useState<PanchayatResult | null>(
    null
  );


  const [
    running,
    setRunning,
  ] = useState(false);


  const [
    completed,
    setCompleted,
  ] = useState(false);


  const [
    serviceError,
    setServiceError,
  ] = useState(false);


  async function runDownscaling() {

    setRunning(true);

    setCompleted(false);

    setServiceError(false);

    setSelected(null);


    try {

      const predictions =
        await Promise.all(

          pilotPanchayats.map(
            async (
              panchayat
            ) => {

              const response =
                await fetch(
                  "http://localhost:8002/predict/downscale",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body:
                      JSON.stringify({
                        blockRainfall:
                          BLOCK_RAINFALL,

                        latitude:
                          panchayat.latitude,

                        longitude:
                          panchayat.longitude,

                        elevation:
                          panchayat.elevation,

                        humidity:
                          panchayat.humidity,
                      }),
                  }
                );


              if (!response.ok) {

                throw new Error(
                  "Prediction request failed"
                );

              }


              const prediction:
                Prediction =
                  await response.json();


              return {
                ...panchayat,
                prediction,
              };

            }
          )

        );


      setResults(
        predictions
      );


      const highRisk =
        predictions.find(
          (
            item
          ) =>
            item.prediction?.risk ===
            "HIGH"
        );


      setSelected(
        highRisk ??
        predictions[0]
      );


      setCompleted(true);

    }
    catch (
      error
    ) {

      console.error(
        error
      );

      setServiceError(true);

    }
    finally {

      setRunning(false);

    }

  }


  return (

    <div>

      <section
        className="
          mb-5
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/70
          p-6
        "
      >

        <div
          className="
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-center
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <BrainCircuit
                className="
                  text-emerald-400
                "
              />

              <h3
                className="
                  text-xl
                  font-semibold
                "
              >
                GramCast AI Downscaling Engine
              </h3>

            </div>


            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >
              Block rainfall input:
              {" "}
              <strong
                className="
                  text-white
                "
              >
                {BLOCK_RAINFALL} mm
              </strong>
            </p>

          </div>


          <button
            onClick={
              runDownscaling
            }
            disabled={
              running
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-500
              px-5
              py-3
              font-semibold
              text-slate-950
              transition
              hover:bg-emerald-400
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {
              running
                ? (
                  <>
                    <LoaderCircle
                      className="
                        animate-spin
                      "
                      size={19}
                    />

                    AI Processing...
                  </>
                )
                : (
                  <>
                    <Play
                      size={19}
                    />

                    Run AI Downscaling
                  </>
                )
            }

          </button>

        </div>


        {
          completed && (

            <div
              className="
                mt-5
                rounded-xl
                border
                border-emerald-500/20
                bg-emerald-500/5
                px-4
                py-3
                text-sm
                text-emerald-300
              "
            >
              ✓ GramCast AI generated
              Panchayat-level predictions
              successfully.
            </div>

          )
        }


        {
          serviceError && (

            <div
              className="
                mt-5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-3
                text-sm
                text-red-300
              "
            >

              AI service unavailable.

              Make sure FastAPI is running
              on port 8002.

            </div>

          )
        }

      </section>


      <div
        className="
          grid
          gap-5
          xl:grid-cols-[1.55fr_0.8fr]
        "
      >

        <div
          className="
            h-[560px]
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
          "
        >

          <MapContainer
            center={[
              22.974154,
              75.827099,
            ]}
            zoom={12}
            scrollWheelZoom
            className="
              h-full
              w-full
            "
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {
              results.map(
                (
                  panchayat
                ) => {

                  const prediction =
                    panchayat.prediction;


                  const color =
                    getRiskColor(
                      prediction?.risk
                    );


                  return (

                    <CircleMarker
                      key={
                        panchayat.id
                      }
                      center={[
                        panchayat.latitude,
                        panchayat.longitude,
                      ]}
                      radius={
                        prediction
                          ? 15
                          : 11
                      }
                      pathOptions={{
                        color,
                        fillColor:
                          color,
                        fillOpacity:
                          prediction
                            ? 0.82
                            : 0.45,
                        weight:
                          3,
                      }}
                      eventHandlers={{
                        click: () => {

                          setSelected(
                            panchayat
                          );

                        },
                      }}
                    >

                      <Popup>

                        <div
                          style={{
                            minWidth:
                              "220px",
                            color:
                              "#0f172a",
                          }}
                        >

                          <strong>
                            {
                              panchayat.name
                            }
                          </strong>


                          {
                            prediction
                              ? (
                                <>
                                  <p>
                                    GramCast:
                                    {" "}
                                    {
                                      prediction.predictedRainfall
                                    }
                                    {" mm"}
                                  </p>

                                  <p>
                                    Risk:
                                    {" "}
                                    <strong>
                                      {
                                        prediction.risk
                                      }
                                    </strong>
                                  </p>
                                </>
                              )
                              : (
                                <p>
                                  Run AI Downscaling
                                  to generate prediction.
                                </p>
                              )
                          }

                        </div>

                      </Popup>

                    </CircleMarker>

                  );

                }
              )
            }

          </MapContainer>

        </div>


        <aside
          className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/70
            p-6
          "
        >

          {
            selected?.prediction
              ? (

                <PredictionPanel
                  panchayat={
                    selected
                  }
                />

              )
              : (

                <div
                  className="
                    flex
                    h-full
                    min-h-[400px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <MapPin
                    size={42}
                    className="
                      text-slate-700
                    "
                  />


                  <h3
                    className="
                      mt-5
                      font-semibold
                    "
                  >
                    Panchayat Intelligence
                  </h3>


                  <p
                    className="
                      mt-2
                      max-w-xs
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Run GramCast AI and
                    select a Panchayat
                    marker to inspect its
                    localized prediction.
                  </p>

                </div>

              )
          }

        </aside>

      </div>

    </div>

  );

}


function PredictionPanel(
  {
    panchayat,
  }: {
    panchayat:
      PanchayatResult;
  }
) {

  const prediction =
    panchayat.prediction!;


  const advisories =
    getAdvisory(
      prediction.risk
    );


  return (

    <div>

      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.2em]
          text-emerald-400
        "
      >
        Panchayat Intelligence
      </p>


      <h3
        className="
          mt-2
          text-xl
          font-bold
        "
      >
        {panchayat.name}
      </h3>


      <div
        className="
          mt-6
          space-y-3
        "
      >

        <Detail
          label="Block Forecast"
          value={
            `${prediction.blockRainfall} mm`
          }
        />


        <Detail
          label="GramCast Prediction"
          value={
            `${prediction.predictedRainfall} mm`
          }
          highlight
        />


        <Detail
          label="Prediction Range"
          value={
            `${prediction.lowerBound} – ${prediction.upperBound} mm`
          }
        />


        <Detail
          label="Risk Level"
          value={
            prediction.risk
          }
        />


        <Detail
          label="Model"
          value={
            prediction.modelVersion
          }
        />

      </div>


      <div
        className="
          mt-6
          rounded-2xl
          border
          border-slate-800
          bg-slate-950
          p-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Sprout
            size={19}
            className="
              text-emerald-400
            "
          />

          <p
            className="
              font-semibold
            "
          >
            Soybean Advisory
          </p>

        </div>


        <ul
          className="
            mt-4
            space-y-3
          "
        >

          {
            advisories.map(
              (
                item
              ) => (

                <li
                  key={
                    item
                  }
                  className="
                    text-sm
                    leading-5
                    text-slate-300
                  "
                >
                  ✓ {item}
                </li>

              )
            )
          }

        </ul>

      </div>


      <div
        className="
          mt-5
          flex
          items-start
          gap-2
          rounded-xl
          bg-blue-500/5
          p-4
        "
      >

        <CloudRain
          size={18}
          className="
            mt-0.5
            shrink-0
            text-blue-400
          "
        />


        <p
          className="
            text-xs
            leading-5
            text-slate-500
          "
        >
          Current model is a prototype
          downscaling pipeline.
          Final scientific validation
          will use verified historical
          observations.
        </p>

      </div>

    </div>

  );

}


function Detail(
  {
    label,
    value,
    highlight = false,
  }: {
    label: string;
    value: string;
    highlight?: boolean;
  }
) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        rounded-xl
        bg-slate-950
        px-4
        py-3
      "
    >

      <span
        className="
          text-xs
          text-slate-500
        "
      >
        {label}
      </span>


      <span
        className={
          highlight
            ? "font-bold text-emerald-400"
            : "font-semibold text-slate-200"
        }
      >
        {value}
      </span>

    </div>

  );

}
