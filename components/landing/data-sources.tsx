// components/landing/data-sources.tsx

import {
  FaGoogle,
  FaFacebook,
  FaTiktok,
  FaHubspot,
  FaFilePdf,
  FaDatabase,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiSnowflake,
  SiGoogleanalytics,
  SiAirtable,
  SiMongodb,
  SiGooglesheets,
  SiGooglecloud,
} from "react-icons/si";

export default function DataSources() {
  const icons = [
    { icon: <FaGoogle />, label: "Google Ads" },
    { icon: <FaFacebook />, label: "Meta Ads" },
    { icon: <FaTiktok />, label: "TikTok Ads" },
    { icon: <SiGoogleanalytics />, label: "Google Analytics" },
    { icon: <FaHubspot />, label: "Hubspot" },
    { icon: <SiPostgresql />, label: "PostgreSQL" },
    { icon: <SiSnowflake />, label: "Snowflake" },
    { icon: <SiGooglecloud />, label: "BigQuery" },
    { icon: <SiAirtable />, label: "Airtable" },
    { icon: <SiMongodb />, label: "MongoDB" },
    { icon: <FaFilePdf />, label: "PDF" },
    { icon: <SiGooglesheets />, label: "Google Sheets" },
    { icon: <FaDatabase />, label: "CSV" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-rose-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bring in data from any data source
          </h2>
          <p className="text-gray-600 mb-6">
            Easily connect to tools like PostgreSQL, Snowflake, BigQuery,
            Redshift, Airtable, Google Sheets, MongoDB, PDFs, CSVs, Google Ads,
            Meta Ads, TikTok Ads, Hubspot and more.
          </p>
          <p className="font-medium text-sm bg-white inline-block px-3 py-1 rounded-full border text-gray-700 shadow">
            🔌 Connect via <strong>APIs</strong> or upload your{" "}
            <strong>files</strong>
          </p>
        </div>

        {/* Logos */}
        <div className="md:w-1/2 grid grid-cols-4 sm:grid-cols-5 gap-4 justify-center items-center">
          {icons.map(({ icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow-md p-3 flex items-center justify-center text-xl text-indigo-600 hover:scale-105 transition"
              title={label}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
