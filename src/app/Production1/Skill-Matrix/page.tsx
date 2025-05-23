"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Image from 'next/image';
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FaProjectDiagram, FaCheckCircle, FaCalendarAlt, FaClock } from 'react-icons/fa';


type TeamData = {
  room: string;
  team: string;
  department: string;
  location: string;
  base64Pdf: string;
};

type Data4M = {
  Id: number;
  Date: string;
  Line: string;
  Shift: string;
  Process1: string;
  Process2: string;
  Process3: string;
  Process4: string;
  Process5: string;
  Process6: string;
  Process7: string;
  Process8: string;
  Process9: string;
  Process10: string;
  Process11: string;
  Process12: string;
  Process13: string;
  Process14: string;
  AM1: string;
  PM1: string;
  AM2: string;
  PM2: string;
  AM3: string;
  PM3: string;
  AM4: string;
  PM4: string;
  AM5: string;
  PM5: string;
  AM6: string;
  PM6: string;
  AM7: string;
  PM7: string;
  AM8: string;
  PM8: string;
  AM9: string;
  PM9: string;
  AM10: string;
  PM10: string;
  AM11: string;
  PM11: string;
  AM12: string;
  PM12: string;
  AM13: string;
  PM13: string;
  AM14: string;
  PM14: string;
  Checked: string;
  QA_Confirm: string;
};

const DEPARTMENT = {
  PRODUCTION: 'Production',
  ENGINEER: 'Engineer',
  QA: 'QA'
} as const;




const Production1_skill_Matrix = () => {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [Data4M, setData4M] = useState<Data4M[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [show4MCard, setShow4MCard] = useState(false);
  const S_room = 'PRODUCTION1';
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/SKILL_MATRIX?S_team=${selectedTeam}&S_room=${S_room}`);
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
  }, [selectedTeam]);

  const loadPdf = (base64: string) => {
    try {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error loading PDF:", error);
      setError("Failed to load PDF");
    }
  };

  const fetchData4m = async () => {
    try {
      const response = await fetch(`/api/4M`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setData4M(result.data);
      setShow4MCard(true);
    } catch (err) {
      console.error("Error fetching 4M data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch 4M data");
    }
  };


  const renderDepartmentSection = (department: keyof typeof DEPARTMENT) => (
    <>
      <div className="flex w-full ps-5 pe-5 flex-between mt-5">
        <h1 className="flex-none w-70 text-[25px] text-black top-65 start-3 font-roboto font-Thin">
          {DEPARTMENT[department]} Department
        </h1>
        <div className="flex w-full ps-8 pe-8">
          <div className="flex-1 border-t border-gray-300 mt-[22px]"></div>
        </div>
      </div>

      {loading && <p className="text-center text-xl text-blue-700">Loading data...</p>}
      {error && <p className="text-center text-xl text-red-500">Error: {error}</p>}

      {!loading && teamData.length > 0 && (
        <div dir="ltr" className="ps-7 pe-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {teamData
            .filter(data => data.department === DEPARTMENT[department])
            .map((data) => (
              <div
                key={`${data.room}_${data.department}_${data.location}`}
                onClick={() => loadPdf(data.base64Pdf)}
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
    </>
  );
  const renderProcess4M = () => {
    const data = Data4M[0];
    const formattedDate = new Date(data.Date).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const allprocess = [
      data.Process1, data.Process2, data.Process3, data.Process4,
      data.Process5, data.Process6, data.Process7, data.Process8,
      data.Process9, data.Process10, data.Process11, data.Process12,
      data.Process13, data.Process14,
    ];

    const allam = [
      data.AM1, data.AM2, data.AM3, data.AM4, data.AM5, data.AM6, data.AM7,
      data.AM8, data.AM9, data.AM10, data.AM11, data.AM12, data.AM13, data.AM14,
    ];

    const allpm = [
      data.PM1, data.PM2, data.PM3, data.PM4, data.PM5, data.PM6, data.PM7,
      data.PM8, data.PM9, data.PM10, data.PM11, data.PM12, data.PM13, data.PM14,
    ];

    const groupallprocess = allprocess.map((item, i) => ({
      process: item,
      am: allam[i],
      pm: allpm[i],
    })).filter(item => item.process); // กรอง process ที่ไม่ใช่ null/undefined

    return (
      <div className="p-6 mx-auto">
        {/* Header info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-2xl font-bold font-sans text-blue-800 flex items-center gap-2">
              <Image
                src="/images/LOGO4.png"
                alt="Logo"
                width={400}
                height={400}
                priority
                className="w-10 h-10"
              />
              4M REALTIME MORNITOR
            </h2>
            {/* <div className={`px-3 py-1 rounded-full text-xs font-medium ${data.QA_Confirm === 'Yes'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
              }`}>
              QA Status: {data.QA_Confirm}
            </div> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                <FaProjectDiagram className="text-blue-400" />
                PROCESS
              </div>
              <div className="text-lg font-semibold text-gray-800">{data.Line}</div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                <FaClock className="text-blue-400" />
                SHIFT
              </div>
              <div className="text-lg font-semibold text-gray-800">{data.Shift}</div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-blue-400" />
                DATE
              </div>
              <div className="text-lg font-semibold text-gray-800">{formattedDate}</div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                <FaCheckCircle className="text-blue-400" />
                CHECKED
              </div>
              <div className="text-lg font-semibold">
                <span className={`px-2 py-1 rounded-full text-white ${data.Checked === 'Completed'
                  ? 'bg-green-500'
                  : 'bg-amber-500'
                  }`}>
                  {data.Checked}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {groupallprocess.map((d, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r rounded-t-2xl from-blue-600 to-blue-800 text-white font-bold text-center py-3 text-md">
                {d.process}
              </div>

              <div className="flex justify-around py-6 px-2 text-sm items-center gap-4">
                {/* AM Section */}
                <div className="text-center space-y-3 flex-1">
                  <div className="mx-auto relative w-16 h-16">
                    <Image
                      src="/images/0019.PNG"
                      alt="AM Image"
                      fill
                      priority
                      className="object-cover rounded-xl shadow-md border-1 border-black"
                    />
                  </div>
                  <div className="text-gray-500 font-medium tracking-wide text-xs uppercase">AM Shift</div>
                  <div className={`text-lg font-semibold ${d.am ? 'text-blue-700' : 'text-gray-400'
                    }`}>
                    {d.am || 'N/A'}
                  </div>
                </div>

                {/* PM Section */}
                <div className="text-center space-y-3 flex-1">
                  <div className="mx-auto relative w-16 h-16">
                    <Image
                      src="/images/0022.PNG"
                      alt="PM Image"
                      fill
                      priority
                      className="object-cover rounded-xl shadow-md border-1 border-black"
                    />
                  </div>
                  <div className="text-gray-500 font-medium tracking-wide text-xs uppercase">PM Shift</div>
                  <div className={`text-lg font-semibold ${d.pm ? 'text-blue-700' : 'text-gray-400'
                    }`}>
                    {d.pm || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  };




  return (
    <div className="flex-1 min-h-screen bg-white overflow-y-auto flex flex-col items-center justify-start h-full w-full">
      {/* Header */}
      <div className="flex h-[92px] mt-22 bg-gradient-to-r from-blue-800 to-blue-900 w-full drop-shadow-2xl">
        <div className="flex flex-1 justify-end">
          <div className="flex flex-col justify-end">
            <div className="flex justify-end">
              <h1 className="absolute bottom-[20px] text-[55px] text-white font-extrabold drop-shadow-2xl pe-10 ps-10">
                SKILL MATRIX
              </h1>
            </div>
            <div className="flex justify-end">
              <h2 className="absolute bottom-[6px] text-[25px] text-white font-bold drop-shadow-2xl pe-10 ps-10">
                PRODUCTION 1
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
        {renderDepartmentSection('PRODUCTION')}
        {renderDepartmentSection('ENGINEER')}
        {renderDepartmentSection('QA')}
      </div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => setPdfUrl(null)}
            >
              ❌ Close PDF
            </button>
            <button
              className="absolute top-16 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 z-50"
              onClick={fetchData4m}
            >
              Fetch 4M Data
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

      {/* 4M Data Modal */}
      {show4MCard && Data4M.length > 0 && (
        <div className="fixed inset-0 bg-linear-to-r/hsl from-indigo-300/40 backdrop-blur-[5px] to-sky-200/40 z-50 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg- shadow-lg overflow-auto">
            <button
              className="absolute top-3 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => setShow4MCard(false)}
            >
              ❌ Close
            </button>

            <div className="m-4 overflow-hidden rounded-b-md">
              {renderProcess4M()}
            </div>
          </div>

        </div>
      )
      }

    </div >
  );
};

export default Production1_skill_Matrix;