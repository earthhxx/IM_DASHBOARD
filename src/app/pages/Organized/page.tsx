"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ParamListener from '../../components/UseParams';

type TeamData = {
  room: string;
  team: string;
  department: string;
  location: string;
  base64Pdf: string;
};



const Production1_Organized = () => {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [param, setParam] = useState<string | null>(''); // ไม่อนุญาตให้เป็น null

  useEffect(() => {

    const fetchTeamData = async () => {
      if (!param) return; // ✅ รอจนกว่า param จะมีค่า
      if (!selectedTeam) return; // ✅ รอจนกว่า selectedTeam จะมีค่า

      try {
        const response = await fetch(`/api/Organized?O_team=${selectedTeam}&O_room=${param}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const result = await response.json();
        setTeamData(result.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [selectedTeam, param, ParamListener]);


  const handleLoadPdf = async (room: string, team: string, location: string,department:string) => {
    try {
      const res = await fetch(
        `/api/OrganizedPdf?O_team=${team}&O_room=${room}&O_location=${location}&O_department=${department}`
      );

      if (!res.ok) throw new Error("Failed to load PDF");

      const result = await res.json();
      setPdfUrl(result.base64Pdf);
    } catch (err) {
      console.error("Error loading PDF:", err);
    }
  };
  const renderDepartmentSection = () => (
    <>
      {departments.map((department) => (
        <div key={department}>
          <div className="flex w-full ps-5 pe-5 flex-between mt-5">
            <h1 className="flex-none w-70 text-[25px] text-black top-65 start-3 font-roboto font-Thin">
              {department} Department
            </h1>
            <div className="flex w-full ps-8 pe-8">
              <div className="flex-1 border-t border-gray-300 mt-[22px]"></div>
            </div>
          </div>

          {loading && <p className="text-center text-xl text-blue-700">Loading data...</p>}

          {!loading && teamData.length > 0 && (
            <div dir="ltr" className="ps-7 pe-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {teamData
                .filter(data => data.department === department)
                .map((data) => (
                  <div
                    key={`${data.room}_${data.department}_${data.location}`}
                    onClick={() => { handleLoadPdf(data.room, data.team, data.location,data.department); }}
                    className="group flex w-65 h-25 rounded-l-lg items-center border border-solid border-blue-100 justify-center bg-white shadow-lg hover:bg-white transition-all cursor-pointer"
                  >
                    <div className="flex w-[35%] h-full text-blue-900 bg-blue-100 rounded-l-lg justify-center items-center group-hover:text-white group-hover:bg-blue-800 text-wrap">
                      {data.location}
                    </div>
                    <div className="flex w-[65%] justify-center items-center pe-2 ps-2 group-hover:bg-white">
                      <Image
                        src="/images/sm1.jpg"
                        alt="Logo"
                        width={140}
                        height={25}
                        priority
                        className="w-90 h-20"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </>
  );

  const departments = [...new Set(teamData.map(data => data.department))];

  return (
    <div className="flex-1 min-h-screen bg-white overflow-y-auto flex flex-col items-center font justify-start h-full w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <ParamListener onGetParam={setParam} />
      </Suspense>
      {/* Header */}
      <div className="flex h-[92px] mt-22 bg-gradient-to-r from-blue-800 to-blue-900 w-full drop-shadow-2xl">
        <div className="flex flex-1 justify-end">
          <div className="flex flex-col justify-end">
            <div className="flex justify-end">
              <h1 className="absolute bottom-[20px] text-[55px] text-white font-extrabold drop-shadow-2xl pe-10 ps-10">
                ORGANIZED
              </h1>
            </div>
            <div className="flex justify-end">
              <h2 className="absolute bottom-[6px] text-[25px] text-white font-bold drop-shadow-2xl pe-10 ps-10">
                {param}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex-col items-center justify-end w-full bg-white shadow-lg rounded-xl">
        {/* Team Selection */}
        <div className="flex w-full h-15 justify-between">
          <div className="flex-none w-1/2"></div>
          <div className="flex w-80 gap-4 mt-2 justify-center pe-10">
            <button
              className={`flex-1 ${selectedTeam === "A" ? "bg-blue-100" : "bg-gray-50 hover:bg-gray-100"} text-blue-900 py-2 px-2 drop-shadow-2xl rounded-lg transition-all text-lg`}
              onClick={() => setSelectedTeam("A")}
            >
              TEAM : A
            </button>
            <button
              className={`flex-1 ${selectedTeam === "B" ? "bg-blue-100" : "bg-gray-50 hover:bg-gray-100"} text-blue-900 py-2 px-2 drop-shadow-2xl rounded-lg transition-all text-lg`}
              onClick={() => setSelectedTeam("B")}
            >
              TEAM : B
            </button>
          </div>
        </div>

        {/* Department Sections */}
        {renderDepartmentSection()}

      </div>

      {/* PDF Viewer */}
      {pdfUrl && (
        <div className="fixed h-full w-full bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => {
                setPdfUrl(null);
              }}
            >
              ❌ ปิด PDF
            </button>
            <Worker workerUrl="/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                defaultScale={SpecialZoomLevel.PageFit}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
};

export default Production1_Organized;
