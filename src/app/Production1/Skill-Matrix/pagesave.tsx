"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Image from 'next/image';
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

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

  const processList = Array.from({ length: 14 }, (_, i) => ({
    process: `Process${i + 1}`,
    am: `AM${i + 1}`,
    pm: `PM${i + 1}`,
  }));
  console.log(processList);

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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg-white shadow-lg overflow-auto">
            <button
              className="absolute top-10 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => setShow4MCard(false)}
            >
              ❌ Close
            </button>
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
            <div className="m-4 overflow-hidden rounded-b-md">
              <table className="table-auto border border-separate w-full text-center text-sm text-black rounded-2xl ">
                <thead className="">
                  {/* <tr>
                    <th colSpan={34} className="border px-4 py-2 font-semibold">{Data4M[0].Line}</th>
                  </tr> */}
                  {/* แถวที่ 1 */}
                  <tr>
                    {/* <th rowSpan={3} colSpan={2} className="border px-4 py-2 font-semibold">Date / Item</th>
                    <th rowSpan={3} colSpan={4} className="border px-4 py-2 font-semibold">SHIFT</th> */}
                    <th colSpan={34} className="bg-amber-100/40 px-4 py-2 text-4xl font-semibold">PROCESS</th>
                  </tr>

                  {/* แถวที่ 2: หัวข้อกระบวนการ */}
                  <tr>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process1}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process2}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process3}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process4}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process5}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process6}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process7}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process8}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process9}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process10}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process11}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process12}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process13}</th>
                    <th colSpan={2} className=" px-4 py-2">{Data4M[0].Process14}</th>
                  </tr>

                  {/* แถวที่ 3: AM / PM */}
                  <tr className="bg-blue-50">
                    {[...Array(28)].map((_, index) => (
                      <th key={`shift-${index}`} className="px-4 py-2">
                        {index % 2 === 0 ? 'AM' : 'PM'}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-white rounded-4xl border-black hover:bg-gray-50">
                    <td colSpan={2} className=" px-4 py-2"></td>
                    <td colSpan={2} className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" px-4 py-2"></td>
                    <td className=" bg-gray px-4 py-2"></td>
                  </tr>
                </tbody>

              </table>
            </div>
          </div>

        </div>
      )
      }

    </div >
  );
};

export default Production1_skill_Matrix;