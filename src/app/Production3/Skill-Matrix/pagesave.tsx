"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Image from 'next/image';

type TeamData = {
  room: string;
  team: string;
  department: string;
  location: string;
  pdfUrl: string;
};

const Production1_skill_Matrix = () => {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`/api/show-pdf?S_team=${selectedTeam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Fetched Data:", data); // ✅ Checking data
        setTeamData(data.data); // กำหนดให้รับข้อมูลใน data.data
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTeam]); // ✅ Fetch data every time the team changes

  const loadPdf = async (pdfUrl: string) => {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      setError("Failed to load PDF");
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };
  //
  return (
    <div className="flex-1 min-h-screen bg-white overflow-y-auto flex flex-col items-center justify-start h-full w-full">
      {/* 1 */}
      <div className="flex h-23 mt-22 bg-gradient-to-r from-blue-800 to-blue-900 w-full drop-shadow-2xl ">
        <div className="flex flex-1 justify-end">
          <div className="flex flex-col justify-start items-end">
            <div className="flex justify-end ">
              <h1 className="absolute top-6 text-[55px] text-white font-extrabold drop-shadow-2xl pe-10 ps-10">
                SKILL MATRIX
              </h1>
            </div>

            <div className="flex justify-end ">
              <h2 className="absolute top-12 text-[25px] text-white  font-bold drop-shadow-2xl pe-10 ps-10" >
                PRODUCTION 1
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
          <h1 className="flex-none w-70 text-[25px] text-black top-65 start-3 ">
            Production Department
          </h1>
          <div className="flex w-full ps-8 pe-8">
            <div className="flex-1 border-t border-gray-300 mt-[22px]"></div>
          </div>
        </div>
        {loading && <p className="text-center text-xl text-blue-700">Loading data...</p>}
        {error && <p className="text-center text-xl text-red-500">Error: {error}</p>}

        {!loading && teamData.length > 0 && (
          <div dir="ltr" className="ps-7 pe-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 ">
            {teamData.map((data, index) => (
              <div key={index}
                onClick={() => loadPdf(data.pdfUrl)}
                className="group flex w-65  rounded-l-lg items-center border border-solid border-blue-100 justify-center bg-white shadow-lg hover:bg-white transition-all">
                <div className="flex w-[35%] pt-10 pb-10 text-blue-900 bg-blue-100 rounded-l-lg justify-center items-center group-hover:text-white group-hover:bg-blue-800 ">{data.location}</div>

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

                {/* <h2 className="text-xl text-blue-800 font-semibold">{data.room}</h2> */}
                {/* <p className="text-lg text-gray-700">Team: {data.team}</p> */}
                {/* <p className="text-lg text-gray-700">Department: {data.department}</p>
                <p className="text-lg text-gray-700">Location: {data.location}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {
        pdfUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl h-full bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setPdfUrl(null)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              >
                <MdClose size={24} />
              </button>
              <iframe src={pdfUrl} width="100%" height="100%" frameBorder="0" />
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Production1_skill_Matrix;
