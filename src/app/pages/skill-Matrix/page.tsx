"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from 'next/image';
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FaProjectDiagram, FaCheckCircle, FaCalendarAlt, FaClock } from 'react-icons/fa';
import ParamListener from '../../components/UseParams';

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
  ProcessChange: string;
};


const Production1_skill_Matrix = () => {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [Data4M, setData4M] = useState<Data4M[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [show4MCard, setShow4MCard] = useState(false);
  const [No4mData, setNo4mData] = useState(false);


  const [param, setParam] = useState<string | null>(''); // ไม่อนุญาตให้เป็น null
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  type ErrorMapType = { [key: string]: boolean };
  const [errorMap, setErrorMap] = useState<ErrorMapType>({});
  const [locationto4m, setlocationto4m] = useState("")

  const isMock = false;
  const sampleBase64Pdf = "data:application/pdf;base64,JVBERi0xLjUKJeLjz9MKMSAwIG9iago8PAovVGl0bGUgKP7/AEMAbwBuAHQAZQBuAHQAKQovQ3JlYXRvciAoUHl0aG9uIFBERiBHZW5lcmF0b3IpCi9Qcm9kdWNlciAoUHl0aG9uIFBERiBMaWJyYXJ5IDMuMy4xKQovQ3JlYXRpb25EYXRlIChEOjIwMjUwNTE5MDkyNzI4KzAwJzAwJykKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0xlbmd0aCAzNwo+PgpcbHN0cmVhbQpCBiAwIDAgMCAwIDAgMCBzCkJUCi9GMQAxMiBUZgovVGQKKDEwMCA3MDApIFRkCihIZWxsbywgUERGISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL0NvbnRlbnRzIDIgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovTmFtZSAvRjEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDExNiAwMDAwMCBuIAowMDAwMDAwMjgxIDAwMDAwIG4gCjAwMDAwMDAzNzkgMDAwMDAgbiAKMDAwMDAwMDUzMiAwMDAwMCBuIAowMDAwMDAwNjMyIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNzM2CiUlRU9G";

  useEffect(() => {
    if (param) {
      console.log("ProductOrderNo updated:", param);
      // You can add additional logic here, such as fetching data based on ProductOrderNo
    }
  }, [param]);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!param) return; // ✅ รอจนกว่า param จะมีค่า
      if (isMock) {
        const mockData = [
          {
            room: 'PRODUCTION1',
            team: 'A',
            department: 'Production',
            location: 'SMT-1',
            base64Pdf: sampleBase64Pdf
          },
          {
            room: 'PRODUCTION2',
            team: 'A',
            department: 'Production',
            location: 'SMT-2',
            base64Pdf: sampleBase64Pdf
          }
        ];
        setTeamData(mockData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/SKILL_MATRIX?S_team=${selectedTeam}&S_room=${param}`);
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
    if (!locationto4m) {

      console.error("Location to 4M is not set.");
      return;
    }
    else if (locationto4m === "PCBA Camera") {
      setlocationto4m("Kyocera");
    }
    else if (locationto4m === "FPCA Camera") {
      setlocationto4m("NPCT");
    }
    else if (locationto4m === "Motor Sensor") {
      setlocationto4m("NPCT");
    }
    else if (locationto4m === "ICT Heater Sensor") {
      setlocationto4m("PANA PMFTH");
    }

    try {
      const response = await fetch(`/api/4M?S_team=${selectedTeam}&locationto4m=${locationto4m}`);
      if (!response.ok) {
        setNo4mData(true);
        console.log(`Failed to fetch data. Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setData4M(result.data);
      setShow4MCard(true);
    } catch (err) {
      setNo4mData(true);
      console.error("Error fetching 4M data:", err);
    }
  };

  const departments = [...new Set(teamData.map(data => data.department))];

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
                    onClick={() => {
                      loadPdf(data.base64Pdf);
                      setlocationto4m(data.location);
                      console.log(locationto4m);
                    }}
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
    })).filter(item => item.process && (
        (item.am && item.am !== '-' && item.am !== 'null') ||
        (item.pm && item.pm !== '-' && item.pm !== 'null')
      )); // กรอง process ที่ไม่ใช่ null/undefined
    console.log(groupallprocess);

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
                <span className={`px-2 py-1 rounded-full text-white ${data.Checked
                  ? 'bg-green-500'
                  : 'bg-yellow-300'
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
              <div className={`bg-gradient-to-r rounded-t-2xl  text-white font-bold text-center py-3 text-md ${data.ProcessChange === d.process
                ? 'from-yellow-300/70 to-yellow-400'
                : 'from-blue-600 to-blue-800'
                }`}>
                {d.process}
              </div>

              <div className="flex justify-around py-6 px-2 text-sm items-center gap-4">
                {/* AM Section */}
                <div className="text-center space-y-3 flex-1">
                  <div className="mx-auto relative w-16 h-16">
                    {d.am && d.am !== "-" && !errorMap[d.am] ? (
                      <Image
                        src={`/api/get-image?filename=${d.am}`}
                        alt="AM Image"
                        fill
                        priority
                        className="object-cover border-1 border-gray-500 rounded-2xl"
                        onError={() =>
                          setErrorMap((prev) => ({ ...prev, [d.am]: true }))
                        }
                      />
                    ) : (
                      <Image
                        src="/images/placeholder.png"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-50 border-1 border-gray-500 rounded-2xl"
                      />
                    )}
                  </div>
                  <div className="text-gray-500 font-medium tracking-wide text-xs uppercase">
                    AM Shift
                  </div>
                  <div
                    className={`text-lg font-semibold ${d.am ? "text-blue-700" : "text-gray-400"
                      }`}
                  >
                    {d.am || "-"}
                  </div>
                </div>

                {/* PM Section */}
                <div className="text-center space-y-3 flex-1">
                  <div className="mx-auto relative w-16 h-16">
                    {d.pm && d.pm !== "-" && !errorMap[d.pm] ? (
                      <Image
                        src={`/api/get-image?filename=${d.pm}`}
                        alt="PM Image"
                        fill
                        priority
                        className="object-cover border-1 border-gray-500 rounded-2xl"
                        onError={() =>
                          setErrorMap((prev) => ({ ...prev, [d.pm]: true }))
                        }
                      />
                    ) : (
                      <Image
                        src="/images/placeholder.png"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-50 border-1 border-gray-500 rounded-2xl"
                      />
                    )}
                  </div>
                  <div className="text-gray-500 font-medium tracking-wide text-xs uppercase">
                    PM Shift
                  </div>
                  <div
                    className={`text-lg font-semibold ${d.pm ? "text-blue-700" : "text-gray-400"
                      }`}
                  >
                    {d.pm || "-"}
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
      <Suspense fallback={<div>Loading...</div>}>
        <ParamListener onGetParam={setParam} />
      </Suspense>
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
              4M MONITOR
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
      {show4MCard && Data4M && Data4M.length > 0 && (
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

      {No4mData && (
        <div className="fixed inset-0 bg-linear-to-r/hsl from-indigo-300/40 backdrop-blur-[5px] to-sky-200/40 z-50 flex flex-col items-center justify-center">
          <div className="w-full h-full relative bg- shadow-lg overflow-auto">
            <button
              className="absolute top-90 right-150 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-50"
              onClick={() => setNo4mData(false)}
            >
              ❌ Close
            </button>
            <div className="flex flex-col h-full w-full justify-center items-center">
              <div className="flex justify-center items-center h-100 w-200 rounded-4xl text-5xl font-kanit text-white bg-red-400/70">
                รอผลบันทึก 4M ประจำวัน
              </div>

            </div>

          </div>
        </div>
      )}

    </div >
  );
};

export default Production1_skill_Matrix;