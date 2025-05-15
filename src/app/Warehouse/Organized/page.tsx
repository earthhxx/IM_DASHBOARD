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

const WareHouse: string = 'WareHouse';

const WAREHOUSE_Organized = () => {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const O_room: string = 'WAREHOUSE';
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`/api/Organized?O_team=${selectedTeam}&O_room=${O_room}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setTeamData(data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTeam]);

  const loadPdf = (base64: string) => {
    // แปลง base64 เป็น Blob
    const byteCharacters = atob(base64.split(',')[1]); // แยกส่วน base64 ออกจาก prefix 'data:application/pdf;base64,'
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
    const pdfUrl = URL.createObjectURL(blob);  // สร้าง URL จาก Blob
    setPdfUrl(pdfUrl);  // ตั้งค่า pdfUrl ให้เป็น URL ที่สร้างจาก Blob
  };



  const handleLoadPdf = (base64: string) => {
    console.log("pdfUrl clicked:", base64);
    loadPdf(base64);
  };


  return (
    <div className="flex-1 min-h-screen bg-white overflow-y-auto flex flex-col items-center justify-start h-full w-full">
      {/* 1 */}
      <div className="flex h-[92px] mt-22 bg-gradient-to-r from-blue-800 to-blue-900 w-full drop-shadow-2xl ">
        <div className="flex flex-1 justify-end">
          <div className="flex flex-col justify-end">
            <div className="flex justify-end">
              <h1 className="absolute bottom-[20px] text-[55px] text-white font-extrabold drop-shadow-2xl pe-10 ps-10">
                ORGANIZED
              </h1>
            </div>
            <div className="flex justify-end ">
              <h2 className="absolute bottom-[6px] text-[25px] text-white font-bold drop-shadow-2xl pe-10 ps-10" >
                WAREHOUSE
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex-1 flex-col  items-center justify-end w-full bg-white shadow-lg rounded-xl">
        <div className="flex w-full h-15 justify-between">
          <div className="flex-none w-1/2"></div>
          <div className="flex w-80  gap-4 mt-2 justify-center pe-10">
            <button
              className={`flex-1 ${selectedTeam === "A" ? "bg-blue-100" : "bg-gray-50 hover:g-gray-50"} text-blue-900 py-2 px-2 drop-shadow-2xl rounded-lg transition-all text-lg`}
              onClick={() => setSelectedTeam("A")}
            >
              TEAM : A
            </button>
            <button
              className={`flex-1 ${selectedTeam === "B" ? "bg-blue-100" : "bg-gray-50 hover:g-gray-50"} text-blue-900 py-2 px-2 drop-shadow-2xl rounded-lg transition-all text-lg`}
              onClick={() => setSelectedTeam("B")}
            >
              TEAM : B
            </button>
          </div>
        </div>
        <div className="flex w-full ps-5 pe-5 flex-between">
          <h1 className="flex-none w-70 text-[25px] text-black top-65 start-3 font-roboto font-Thin ">
            Warehouse Department
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
              .filter(data => data.department === WareHouse)
              .map((data) => (
                <div
                  key={`${data.team}_${data.room}_${data.department}_${data.location}`}

                  onClick={() => handleLoadPdf(data.base64Pdf)}
                  className="group flex w-65 h-25 rounded-l-lg items-center border border-solid border-blue-100 justify-center bg-white shadow-lg hover:bg-white transition-all"
                >
                  <div className="flex w-[35%] h-full text-blue-900 bg-blue-100 rounded-l-lg justify-center items-center group-hover:text-white group-hover:bg-blue-800 text-wrap">
                    {data.location}
                  </div>

                  <div className="flex w-[65%] justify-center items-center pe-2 ps-2 group-hover:bg-white">
                    <Image
                      src="/images/Organized.png"
                      alt="Logo"
                      width={140}
                      height={25}
                      priority
                      className="w-90 h-20"
                    />
                  </div>

                  {/* <h2 className="text-xl text-blue-800 font-semibold">{data.room}</h2> */}
                  {/* <p className="text-lg text-gray-700">Team: {data.team}</p> */}
                  {/* <p className="text-lg text-gray-700">Department: {data.department}</p>
                  <p className="text-lg text-gray-700">Location: {data.location}</p> */}
                </div>
              ))}
          </div>
        )}



      </div>

      {/* PDF Viewer */}
      {pdfUrl && (
        <div className="fixed h-full w-full bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => setPdfUrl(null)}
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
    </div >
  );
};

export default WAREHOUSE_Organized;
