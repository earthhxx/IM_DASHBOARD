"use client";

import React, { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import ShelfWithWheels from "./toolscomponents/ShelfWithWheels";
import { FaBullseye, FaCheckCircle, FaLayerGroup, FaMapMarkerAlt, FaProjectDiagram, FaRulerCombined } from "react-icons/fa";
import ShelfWithJigs from "@/app/pages/FindingTools/toolscomponents/ShelfWithJigs";
import SupportBox from "@/app/pages/FindingTools/toolscomponents/SupportBox";
import ShelfSqueegee from "@/app/pages/FindingTools/toolscomponents/shelfSqueegee";
import FloatingTable from "@/app/pages/FindingTools/toolscomponents/FloatingTable";




type ToolingData = {
    sheftname: string;
    slot: string;
    toolingname: string;
    side: string;
    status: string;
};

type Demo1 = {
    MS_ID: string;
    Loc1: number;
    loc2: number;
    loc3: number;
    loc4: number;
    loc5: number;
    status: string;
    spac: number;
    Datetime: string; // ✅ ใช้ string สำหรับ ISO Date
};



// Common styles
const shelfBase =
    "w-10 sm:w-[50px] lg:w-[60px] border-2 border-gray-400 rounded-md relative shadow-md font-semibold text-gray-700 font-sans tracking-wide hover:scale-125 hover:z-50 transition-transform duration-200 flex items-center justify-center select-none cursor-pointer";

// ความสูงต่างกันของ shelf
const shelfHeights = {
    large: "h-70 text-[10px] sm:text-xl lg:text-2xl",
    small: "h-35 text-[10px] sm:text-xl lg:text-2xl",
};

const cornerPostStyle =
    "w-2 h-2 bg-gradient-to-t z-0 from-gray-300 via-gray-200 to-gray-100 border-gray-400 border-2 rounded-full absolute";

const CornerPosts = () => (
    <>
        <div className={`${cornerPostStyle} -top-1 -left-1`} />
        <div className={`${cornerPostStyle} -top-1 -right-1`} />
        <div className={`${cornerPostStyle} -bottom-1 -left-1`} />
        <div className={`${cornerPostStyle} -bottom-1 -right-1`} />
    </>
);

// Shelf component - แบบเดี่ยว
type ShelfProps = {
    label: string;
    height: keyof typeof shelfHeights;
    onClick: () => void;
    lines?: number[]; // ตำแหน่งเส้นแบ่ง (เป็นเปอร์เซ็นต์) เช่น [50] หรือ [33,66]
    shelf?: string; // สำหรับการระบุ shelf ที่เลือก
    highlighted?: boolean; // เพิ่ม property highlighted
};

const Shelf: React.FC<ShelfProps> = ({ label, height, onClick, lines = [], highlighted }) => {
    const shelfClass = `
        ${shelfBase}
        ${shelfHeights[height]}
        
        relative
        ${highlighted ? "bg-yellow-300/70 border-yellow-800/30 animate-pulse" : "bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100"}
    `;

    return (
        <div
            className={shelfClass}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            aria-label={`Shelf ${label}`}
        >
            {/* เส้นแบ่งตามตำแหน่งใน lines */}
            {lines.map((pos, i) => (
                <div
                    key={i}
                    className="absolute w-full bg-gray-400"
                    style={{ height: "3px", top: `${pos}%` }}
                />
            ))}

            {/* ชื่อชั้น */}
            <div className="absolute bottom-4 w-full text-center">{label}</div>
            <CornerPosts />
        </div>
    );
};


// Shelf component แบบคู่ (สำหรับ D+E, F+G)
type DoubleShelfProps = {
    labels: [string, string];
    height: keyof typeof shelfHeights;
    onClicks: [() => void, () => void];
    lines?: number[];
    highlighted?: [boolean, boolean]; // แยกเป็น 2 ช่อง
};

const DoubleShelf: React.FC<DoubleShelfProps> = ({
    labels,
    height,
    onClicks,
    lines = [],
    highlighted = [false, false], // ค่าเริ่มต้น
}) => (
    <div className="flex gap-2">
        <Shelf
            label={labels[0]}
            height={height}
            onClick={onClicks[0]}
            lines={lines}
            highlighted={highlighted[0]}
        />
        <Shelf
            label={labels[1]}
            height={height}
            onClick={onClicks[1]}
            lines={lines}
            highlighted={highlighted[1]}
        />
    </div>
);



// Components ที่มี text ด้านในแบบ custom
const BoxWithText = ({ lines }: { lines: React.ReactNode }) => (
    <div className="relative h-[45px] bg-emerald-100 border-2 rounded-md shadow-inner flex items-center justify-center">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-black flex flex-col items-center justify-center text-center font-kanit leading-tight text-[10px]">
            {lines}
        </div>
    </div>
);



const CornerWashing = () => <BoxWithText lines={<><span>Handwashing</span><span>station</span></>} />;
const VisualCheckStencil = () => <BoxWithText lines={<><span>Visual Check</span><span>Stencil</span></>} />;
const StencilCleaning1 = () => <BoxWithText lines={<><span>Stencil Cleaning</span><span>station 1</span></>} />;
const StencilCleaning2 = () => <BoxWithText lines={<><span>Stencil Cleaning</span><span>station 2</span></>} />;
const SAWAClean1 = () => <BoxWithText lines={<><span>SAWA</span><span>Clean 1</span></>} />;
const SAWAClean2 = () => <BoxWithText lines={<><span>SAWA</span><span>Clean 2</span></>} />;
const Desklab = () => (<BoxWithText lines={<span>Nozzle Cleaning</span>} />);




const Desktop = () => (
    <>
        {[...Array(2)].map((_, i) => (
            <div
                key={i}
                className="relative w-[180px] h-[40px] bg-cyan-100 border-2 border-blue-900 rounded-md shadow-inner mb-4 last:mb-0"
            >
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-sky-700 rounded-md shadow-md text-white text-[10px] flex items-center justify-center">
                    Monitor
                </div>
                <div className="absolute top-[25%] left-[145px] w-[16px] h-[24px] bg-blue-900 rounded-full shadow text-white text-[8px] flex items-center justify-center">
                    🖱
                </div>
            </div>
        ))}
    </>
);


export default function StorageRoomLayout() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastError, setToastError] = useState<string | null>(null);

    const [showShelfABC, setShowShelfABC] = useState(false);
    const [showShelfDEF, setShowShelfDEF] = useState(false);
    const [showShelfGH, setShowShelfGH] = useState(false);
    const [showShelfI, setShowShelfI] = useState(false);

    const [showFloat, setShowFloat] = useState(false);

    const [query, setQuery] = useState(""); // สำหรับ input
    const [datasearch, setDatasearch] = useState<ToolingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedItem, setSelectedItem] = useState<ToolingData | null>(null);

    const [demo1, setdemo1] = useState<Demo1 | null>(null);

    const lastCharshelf = selectedItem?.sheftname.trim().slice(-1).toUpperCase();

    const numonly = selectedItem?.slot.replace(/\D/g, ""); // แปลง slot เป็นตัวเลขเท่านั้น 





    const handleshelfClick = async (shelfchoose: string, num1: number, num2: number) => {
        try {
            const res = await fetch(`/api/Toolingfinding/shelf?parameter=${shelfchoose}&num1=${num1}&num2=${num2}`);
            const data = await res.json();

            console.log("Fetched:", data);
            setDatasearch(data.data || []); // ปรับตาม response จริง
            setShowFloat(true); // แสดงตารางเมื่อได้ข้อมูล
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    const handleRowClick = (item: ToolingData) => {
        setSelectedItem(item);
        setShowFloat(false); // ปิดตาราง (ถ้าต้องการ)
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        setToastError(null);
        try {
            const res = await fetch(`/api/Toolingfinding/searchbar?parameter=${query}`);
            if (!res.ok) {
                if (res.status === 404) {
                    setToastError("ไม่พบข้อมูล");
                } else {
                    throw new Error("ไม่พบข้อมูลหรือเกิดข้อผิดพลาด");
                }
                setDatasearch([]);
                return;
            }

            const json = await res.json();
            setDatasearch(json.data);
            setShowFloat(true);
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาด");
            setToastError(err.message || "เกิดข้อผิดพลาด");
            setDatasearch([]);
        } finally {
            setLoading(false);
            setQuery("");
        }
    };

    //ng
    // const mockDemo1: Demo1 = {
    //     MS_ID: "B02",
    //     Loc1: 40,
    //     loc2: 42,
    //     loc3: 40,
    //     loc4: 37,
    //     loc5: 34,
    //     status: "NG",
    //     spac: 35,
    //     Datetime: "2025-07-29T13:25:00.000Z" // ISO 8601 format
    // };

    //close
    // const mockDemo1: Demo1 = {
    //     MS_ID: "B02",
    //     Loc1: 40,
    //     loc2: 40,
    //     loc3: 40,
    //     loc4: 40,
    //     loc5: 37,
    //     status: "Warning",
    //     spac: 35,
    //     Datetime: "2025-07-29T13:25:00.000Z" // ISO 8601 format
    // };

    useEffect(() => {
        if (!selectedItem) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/Toolingfinding/info?parameter=${selectedItem?.slot}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        setToastError("ไม่พบข้อมูล");
                    } else {
                        throw new Error("ไม่พบข้อมูลหรือเกิดข้อผิดพลาด");
                    }
                    return;
                }

                const json = await res.json();
                const normalizeDemo1 = (raw: any): Demo1 => ({
                    MS_ID: raw.MS_ID,
                    Loc1: Number(raw.Loc1),
                    loc2: Number(raw.loc2),
                    loc3: Number(raw.loc3),
                    loc4: Number(raw.loc4),
                    loc5: Number(raw.loc5),
                    status: raw.status,
                    spac: Number(raw.spac),
                    Datetime: raw.Datetime
                });

                /* The code appears to be a comment in a TypeScript React file. It is calling a function
                `normalizeDemo1` with an argument `mockDemo1` and then passing the result to a
                function `setdemo1`. The specific functionality of `normalizeDemo1`, `mockDemo1`, and
                `setdemo1` is not provided in the code snippet, so it is unclear what exactly the
                code is doing. */

                // setdemo1(normalizeDemo1(mockDemo1));
                setdemo1(normalizeDemo1(json.data[0]));

            } catch (err: any) {
                setError(err.message || "ไม่มีผลวัด");
                setToastError(err.message || "ไม่มีผลวัด");
            }
        };

        fetchData();
    }, [selectedItem]);

    const handleClickD = () => {
        handleshelfClick("D", 1, 100);
    };

    const handleClickE = () => {
        handleshelfClick("E", 1, 100);
    };

    const handleClickF = () => {
        handleshelfClick("F", 1, 100);
    };

    const handleClickG = () => {
        handleshelfClick("G", 1, 100);
    };



    const [shelf, setShelf] = React.useState<string | null>(null);


    // ใช้ useEffect รอ 3 วินาทีแล้วซ่อน Toast อัตโนมัติ
    useEffect(() => {
        if (toastVisible || toastError) {
            const timer = setTimeout(() => {
                setToastVisible(false);
                setToastError(null); // ล้างข้อความ error เมื่อซ่อน toast
            }, 5000);

            return () => clearTimeout(timer); // ล้าง timer เวลาคอมโพเนนต์ unmount หรือ toastVisible เปลี่ยน
        }
    }, [toastVisible, toastError]);


    const legendItems = [
        { code: "A", label: "Stencil " },
        { code: "B", label: "Stencil " },
        { code: "C", label: "Stencil " },
        { code: "D", label: "Jig ICT " },
        { code: "E", label: "Jig ICT " },
        { code: "F", label: "Jig ICT " },
        { code: "G", label: "Support Block " },
        { code: "H", label: "Support Block " },
        { code: "I", label: "Squeegee " },
    ];



    const shelfSupportBox = (shelf: string) => (
        <>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl m-4 p-6 h-210 mt-8">
                <div className="flex flex-col justify-center items-end w-full">
                    {/* ปุ่มปิด (X) ขวาบน */}
                    <button
                        onClick={() => { setShowShelfGH(false); setSelectedItem(null); }}
                        className="flex justify-center items-center text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-red-500 w-[10%] "
                    >
                        &times;
                    </button>

                </div>
                <div className="flex flex-col justify-center items-center mb-4">
                    {/* ชื่อ Shelf */}
                    <div className="text-sm font-semibold text-gray-700 mb-2">{shelf}</div>
                </div>
                <SupportBox activeNumber={numonly} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 text-sm ">
                    {/* ชื่อชั้น */}
                    <span className="col-span-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaProjectDiagram className="text-blue-400" />
                            ชื่อ
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.toolingname}</div>
                    </span>

                    {/* side */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaLayerGroup className="text-blue-400" />
                            side
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.side}</div>
                    </div>

                    {/* ตำแหน่ง */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaMapMarkerAlt className="text-blue-400" />
                            ตำแหน่ง
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.slot}</div>
                    </div>

                    {/* สถานะ */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaCheckCircle className="text-blue-400" />
                            สถานะ
                        </div>
                        <div className="text-lg font-semibold">
                            <span
                                className={`px-3 py-1 rounded-full text-white text-xs font-medium
          ${datasearch[0].status === 'Stock'
                                        ? 'bg-green-500'
                                        : datasearch[0].status === 'Undifind' || null
                                            ? 'bg-yellow-500'
                                            : 'bg-gray-400'
                                    }`}
                            >
                                {datasearch[0].status}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col justify-center items-center mt-4 ">
                    {/* <button
                        onClick={() => { setShowShelfGH(false); setSelectedItem(null); }}
                        className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                    >
                        <div>Withdraw </div>
                        <div>เบิกออก </div>
                    </button> */}

                </div>
            </div>
        </>
    )



    const shelfJIG = (shelf: string) => (
        <>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl m-4 p-6 h-210 mt-8 ">
                <div className="flex flex-col justify-center items-end w-full">
                    {/* ปุ่มปิด (X) ขวาบน */}
                    <button
                        onClick={() => { setShowShelfDEF(false); setSelectedItem(null); }}
                        className="flex justify-center items-center text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-red-500 w-[10%] "
                    >
                        &times;
                    </button>

                </div>
                <div className="flex flex-col justify-center items-center mb-4">
                    {/* ชื่อ Shelf */}
                    <div className="text-sm font-semibold text-gray-700 mb-2 mt-4">{shelf}</div>
                </div>

                <ShelfWithJigs activeNumber={numonly ? Number(numonly) : undefined} />
                {/* ล้อ (Wheels) แยกออกมาด้านล่างชั้นวาง */}
                <div className="flex justify-between w-full mx-auto mt-2 mb-4 ps-10 pe-10">
                    <div className="w-6 h-6 bg-gray-700 rounded-full shadow-md" />
                    <div className="w-6 h-6 bg-gray-700 rounded-full shadow-md" />
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 text-sm mt-15">
                    {/* ชื่อชั้น */}
                    <span className="col-span-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaProjectDiagram className="text-blue-400" />
                            ชื่อชั้น
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.toolingname}</div>
                    </span>

                    {/* side */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaLayerGroup className="text-blue-400" />
                            side
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.side}</div>
                    </div>

                    {/* ตำแหน่ง */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaMapMarkerAlt className="text-blue-400" />
                            ตำแหน่ง
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{selectedItem?.slot}</div>
                    </div>

                    {/* สถานะ */}
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                            <FaCheckCircle className="text-blue-400" />
                            สถานะ
                        </div>
                        <div className="text-lg font-semibold">
                            <span
                                className={`px-3 py-1 rounded-full text-white text-xs font-medium
          ${datasearch[0].status === 'Stock'
                                        ? 'bg-green-500'
                                        : datasearch[0].status === 'Empty'
                                            ? 'bg-yellow-500'
                                            : 'bg-gray-400'
                                    }`}
                            >
                                {datasearch[0].status}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col justify-center items-center mt-4 ">

                    {/* <button
                        onClick={() => { setShowShelfDEF(false); setSelectedItem(null); }}
                        className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                    >
                        <div>Withdraw </div>
                        <div>เบิกออก </div>
                    </button> */}

                </div>
            </div>
        </>
    )

    const getBgColor = (value: number, spac: number) => {
        if (typeof value !== "number" || typeof spac !== "number" || isNaN(value) || isNaN(spac)) {
            return "bg-gray-400"; // invalid data
        }

        if (value < spac) return "bg-red-400/40";
        if (value >= spac && value <= spac + 2) return "bg-yellow-300/40";
        if (value > spac + 2) return ""; // no color if too high

        return "bg-gray-400"; // fallback (really shouldn't happen now)
    };





    const shelfStencil = (shelf: string) => (
        <>
            <div className=" z-50 flex items-center justify-center ">

                <div className=" bg-white p-4 rounded-lg shadow-2xl h-210 mt-4">
                    <div className="flex flex-col justify-center items-end">
                        {/* ปุ่มปิด (X) ขวาบน */}
                        <button
                            onClick={() => { setShowShelfABC(false); setSelectedItem(null); }}
                            className="flex justify-center items-start text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-red-500 w-[5%] "
                        >
                            &times;
                        </button>
                    </div>

                    <ShelfWithWheels
                        label={`Shelf ${shelf}`}
                        highlightedNumbers={numonly ? [Number(numonly)] : []} // ตัวที่ 4, 10, 78 จะกระพริบเป็นสีแดง
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm mt-2">
                        {/* ชื่อ */}
                        <div className="col-span-2 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaProjectDiagram className="text-blue-400" />
                                ชื่อ
                            </div>
                            <div className="text-base font-semibold text-gray-800">
                                {selectedItem?.toolingname || "-"}
                            </div>
                        </div>

                        {/* Side */}
                        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaLayerGroup className="text-blue-400" />
                                Side
                            </div>
                            <div className="text-base font-semibold text-gray-800">
                                {selectedItem?.side || "-"}
                            </div>
                        </div>

                        {/* ตำแหน่ง */}
                        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaMapMarkerAlt className="text-blue-400" />
                                ตำแหน่ง
                            </div>
                            <div className="text-base font-semibold text-gray-800  ">
                                {selectedItem?.slot || "-"}
                            </div>
                        </div>

                        {/* สถานะ */}
                        <div className={` px-4 py-3 rounded-xl border border-gray-200 shadow-sm   ${demo1?.status === "OK"
                            ? "bg-green-300/30"
                            : demo1?.status === "Warning"
                                ? "bg-yellow-300/30"
                                : demo1?.status === "NG"
                                    ? "bg-red-400/40"
                                    : "bg-gray-400"} `}>
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaCheckCircle className="text-blue-400" />
                                สถานะ
                            </div>
                            <div className="text-base font-semibold">
                                <span
                                    className={`px-3 py-1 rounded-full text-white text-xs font-medium
          ${demo1?.status === "OK"
                                            ? "bg-green-500"
                                            : demo1?.status === "Warning"
                                                ? "bg-yellow-500"
                                                : demo1?.status === "NG"
                                                    ? "bg-red-500"
                                                    : "bg-gray-400"
                                        }`}
                                >
                                    {demo1?.status || "ไม่มีข้อมูล"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {demo1 && (
                        <>
                            <div className="text-[16px] font-bold mt-4 mb-2 text-black uppercase">
                                latest TENSION : [
                                {(() => {
                                    const dateStr = demo1.Datetime;
                                    if (!dateStr) return "-";

                                    const date = new Date(dateStr);
                                    const day = date.getDate();
                                    const month = date.toLocaleString("en-US", { month: "long" });
                                    const year = date.getFullYear();

                                    const hours = date.getHours().toString().padStart(2, "0");
                                    const minutes = date.getMinutes().toString().padStart(2, "0");
                                    const ampm = date.getHours() < 12 ? "AM" : "PM";

                                    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
                                })()}
                                ]
                            </div>



                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-sm">

                                {/* Standard */}
                                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="text-gray-500 font-medium flex items-center gap-1 mb-1">
                                        <FaBullseye className="text-blue-400" />
                                        Standard
                                    </div>
                                    <div className="text-lg font-semibold text-gray-800 flex justify-center items-center">{demo1.spac}</div>
                                </div>

                                {/* LOC1–LOC5 */}
                                {[demo1.Loc1, demo1.loc2, demo1.loc3, demo1.loc4, demo1.loc5].map((loc, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 py-2 rounded-xl border border-gray-200 shadow-sm ${getBgColor(loc, demo1.spac)}`}
                                    >
                                        <div className="text-gray-500 font-medium flex items-center justify-center gap-2 mb-1">
                                            <FaRulerCombined className="text-blue-400" />
                                            Point {index + 1}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800 flex justify-center items-center">{loc}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )


    const shelfSqueegee = (shelf: string) => (
        <>
            <div className=" z-50 flex items-center justify-center h-210 bg-white rounded-2xl mt-4">

                <div className=" p-4 rounded-lg ">
                    <div className="flex flex-col justify-center items-end">
                        {/* ปุ่มปิด (X) ขวาบน */}
                        <button
                            onClick={() => { setShowShelfI(false); setSelectedItem(null); }}
                            className="flex justify-center items-start text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-red-500 w-[5%] "
                        >
                            &times;
                        </button>

                    </div>
                    <div className="flex flex-col justify-center items-center mb-4 uppercase">
                        {/* ชื่อ Shelf */}
                        <div className="text-sm font-semibold text-gray-700 mb-2">{shelf}</div>
                    </div>

                    <ShelfSqueegee activeNumber={numonly ? Number(numonly) : undefined} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 text-sm mt-15">
                        {/* ชื่อชั้น */}
                        <span className="col-span-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaProjectDiagram className="text-blue-400" />
                                ชื่อ
                            </div>
                            <div className="text-lg font-semibold text-gray-800">{selectedItem?.toolingname}</div>
                        </span>

                        {/* side */}
                        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaLayerGroup className="text-blue-400" />
                                side
                            </div>
                            <div className="text-lg font-semibold text-gray-800">{selectedItem?.side}</div>
                        </div>

                        {/* ตำแหน่ง */}
                        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaMapMarkerAlt className="text-blue-400" />
                                ตำแหน่ง
                            </div>
                            <div className="text-lg font-semibold text-gray-800">{selectedItem?.slot}</div>
                        </div>

                        {/* สถานะ */}
                        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                                <FaCheckCircle className="text-blue-400" />
                                สถานะ
                            </div>
                            <div className="text-lg font-semibold">
                                <span
                                    className={`px-3 py-1 rounded-full text-white text-xs font-medium
          ${datasearch[0].status === 'Stock'
                                            ? 'bg-green-500'
                                            : datasearch[0].status === 'Empty'
                                                ? 'bg-yellow-500'
                                                : 'bg-gray-400'
                                        }`}
                                >
                                    {datasearch[0].status}
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center mt-4 ">
                        {/* ปุ่มปิด (X) ขวาบน */}
                        {/* <button
                            onClick={() => { setShowShelfI(false); setSelectedItem(null); }}
                            className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                        >
                            <div>Withdraw </div>
                            <div>เบิกออก </div>
                        </button> */}

                    </div>


                </div>
            </div>
        </>
    );




    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-5 h-210 items-center justify-center w-full max-w-[90%] m-4 mt-8">
                <h2 className="text-xl text-blue-900 font-semibold text-center mb-4">
                    Tooling Finder Function (MAINTENANCE ROOM)
                </h2>
                <div className="flex items-center justify-center w-full my-4 gap-4">
                    <div className="w-full lg:w-[40%]">
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ.."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full p-4 text-lg text-gray-800 rounded-xl bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        ค้นหา
                    </button>
                </div>


                <div className="relative flex flex-col w-full border border-dashed border-blue-800 rounded-md bg-gray-50">
                    {/* ประตู */}
                    <div className="absolute -top-4 right-14 lg:right-27">
                        <div className="w-24 h-10 bg-blue-900 text-white flex items-center justify-center rounded-md shadow-inner text-sm">
                            ประตูเข้า
                        </div>
                    </div>

                    <div className="flex justify-center ms-40 p-2">
                        <Desktop />
                    </div>

                    {/* ชั้นวาง */}
                    <div className="flex w-full justify-between mt-6 flex-wrap gap-4 ">
                        <Shelf
                            label="A"
                            height="large"
                            onClick={() => {
                                handleshelfClick("A", 1, 100);;
                            }}
                            lines={[50]}
                            highlighted={lastCharshelf === "A"}
                        />

                        <Shelf label="B" height="large" onClick={() => { handleshelfClick("B", 1, 100); }} lines={[50]} highlighted={lastCharshelf === "B"} />

                        <Shelf label="C" height="large" onClick={() => { handleshelfClick("C", 1, 100); }} lines={[50]} highlighted={lastCharshelf === "C"} />

                        <DoubleShelf
                            labels={["D", "E"]}
                            height="large"
                            onClicks={[handleClickD, handleClickE]}
                            lines={[33, 66]}
                            highlighted={[
                                lastCharshelf === "D",
                                lastCharshelf === "E"
                            ]}
                        />


                        <DoubleShelf
                            labels={["F", "G"]}
                            height="large"
                            onClicks={[handleClickF, handleClickG]}
                            lines={[33, 66]}
                            highlighted={[
                                lastCharshelf === "F",
                                lastCharshelf === "G"
                            ]}
                        />


                        {/* ทางเดิน + ลูกศร */}
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-sky-700 text-4xl text-center select-none">↓</div>
                            <div className="w-20 sm:w-[60px] h-40 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md select-none">
                                ทางเดิน
                            </div>
                            <div className="text-sky-700 text-4xl text-center select-none">↓</div>
                        </div>

                        {/* H + I */}
                        <div className="flex flex-col items-center justify-center gap-1">
                            <Shelf label="I" height="small" onClick={() => { handleshelfClick("I", 1, 100); }} lines={[50]} highlighted={lastCharshelf === "I"} />
                            <Shelf label="H" height="small" onClick={() => { handleshelfClick("H", 1, 100); }} lines={[50]} highlighted={lastCharshelf === "H"} />
                        </div>
                    </div>

                    {/* ทางเดินล่าง + ลูกศร */}
                    <div className="flex items-center justify-center text-center mt-6 gap-4 select-none">
                        <div className="text-sky-700 text-4xl">←</div>
                        <div className="w-[50%] h-12 sm:h-16 flex items-center justify-center text-gray-700 font-medium italic border-gray-400 rounded-md">
                            ทางเดิน
                        </div>
                        <div className="text-sky-700 text-4xl">←</div>
                    </div>

                    {/* ส่วน grid ด้านล่าง */}
                    <div className="grid grid-cols-7 gap-4 text-[13px] font-kanit mt-6">
                        <Desklab />
                        <VisualCheckStencil />
                        <SAWAClean2 />
                        <StencilCleaning2 />
                        <SAWAClean1 />
                        <StencilCleaning1 />
                        <CornerWashing />
                    </div>




                </div>


                <div className="w-full bg-gradient-to-t from-gray-200 to-white border-t border-gray-300 py-4 px-6 rounded-sm shadow-inner mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2 text-[13px] font-bold text-gray-700 uppercase">
                        {legendItems.map((item) => (
                            <div key={item.code} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-black shadow-sm" />
                                <span>{item.code} = {item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>




            </div>
            <div>


                {showShelfABC && selectedItem && (
                    shelfStencil(selectedItem.sheftname)
                )}

                {showShelfDEF && selectedItem && (
                    shelfJIG(selectedItem.sheftname)
                )}
                {showShelfGH && selectedItem && (
                    shelfSupportBox(selectedItem.sheftname)
                )}
                {showShelfI && selectedItem && (
                    shelfSqueegee(selectedItem.sheftname)
                )}
                {showFloat && datasearch && (
                    <FloatingTable
                        data={datasearch}
                        onClose={() => setShowFloat(false)}
                        onRowClick={(item) => {
                            handleRowClick(item);
                            setToastVisible(true);
                            console.log(`Selected item: ${item.sheftname} - ${item.slot}`);
                            const lastChar = item.sheftname.trim().slice(-1).toUpperCase();
                            console.log(`Last character of sheftname: ${lastChar}`);
                            if (["A", "B", "C"].includes(lastChar)) {
                                setShowShelfABC(true);
                                setShowShelfDEF(false);
                                setShowShelfGH(false);
                            } else if (["D", "E", "F"].includes(lastChar)) {
                                setShowShelfDEF(true);
                                setShowShelfABC(false);
                                setShowShelfGH(false);
                            } else if (["G", "H"].includes(lastChar)) {
                                setShowShelfGH(true);
                                setShowShelfABC(false);
                                setShowShelfDEF(false);
                            }
                            else if (lastChar === "I") {
                                setShowShelfI(true);
                                setShowShelfABC(false);
                                setShowShelfDEF(false);
                                setShowShelfGH(false);
                            } else {
                                setShowShelfABC(false);
                                setShowShelfDEF(false);
                                setShowShelfGH(false);
                                setShowShelfI(false);
                            }
                        }}
                    />
                )}



                {toastVisible && selectedItem && (
                    <Toast
                        message={`${selectedItem.toolingname} (${selectedItem.sheftname} - ${selectedItem.slot})`}
                        onClose={() => setToastVisible(false)}
                    />
                )}
                {toastError && (
                    <Toast
                        message={toastError}
                        onClose={() => setToastError(null)}
                    />
                )}




            </div>
        </div>
    );
}
