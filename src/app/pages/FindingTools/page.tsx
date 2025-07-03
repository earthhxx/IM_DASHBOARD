"use client";

import React, { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import ShelfWithWheels from "../../components/ShelfWithWheels";
import { FaCheckCircle, FaLayerGroup, FaMapMarkerAlt, FaProjectDiagram } from "react-icons/fa";
import ShelfWithJigs from "@/app/components/ShelfWithJigs";
import SupportBox from "@/app/components/SupportBox";
import ShelfSqueegee from "@/app/components/shelfSqueegee";
import FloatingTable from "@/app/components/FloatingTable";



type ToolingData = {
    sheftname: string;
    slot: string;
    toolingname: string;
    side: string;
    status: string;
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

    const lastCharshelf = selectedItem?.sheftname.trim().slice(-1).toUpperCase();

    const numonly = selectedItem?.slot.replace(/\D/g, ""); // แปลง slot เป็นตัวเลขเท่านั้น 



    const handleRowClick = (item: ToolingData) => {
        setSelectedItem(item);
        setShowFloat(false); // ปิดตาราง (ถ้าต้องการ)
    };

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/Toolingfinding/searchbar?parameter=${query}`);
            if (!res.ok) throw new Error("ไม่พบข้อมูลหรือเกิดข้อผิดพลาด");

            const json = await res.json();
            setDatasearch(json.data); // ปรับตาม response จริง
            setShowFloat(true);
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาด");
            setDatasearch([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchshelf = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/Toolingfinding/shelf?parameter=${query}`);
            if (!res.ok) throw new Error("ไม่พบข้อมูลหรือเกิดข้อผิดพลาด");

            const json = await res.json();
            setDatasearch(json.data); // ปรับตาม response จริง
            setShowFloat(true);
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาด");
            setDatasearch([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClickD = () => {
        onShelfClick("D");
        setShowShelfDEF(prev => !prev);
        setShelf("D");
    };

    const handleClickE = () => {
        onShelfClick("E");
        setShowShelfDEF(prev => !prev);
        setShelf("E");
    };

    const handleClickF = () => {
        onShelfClick("D");
        setShowShelfDEF(prev => !prev);
        setShelf("D");
    };

    const handleClickG = () => {
        onShelfClick("E");
        setShowShelfDEF(prev => !prev);
        setShelf("E");
    };



    const [shelf, setShelf] = React.useState<string | null>(null);


    // ใช้ useEffect รอ 3 วินาทีแล้วซ่อน Toast อัตโนมัติ
    useEffect(() => {
        if (toastVisible) {
            const timer = setTimeout(() => {
                setToastVisible(false);
            }, 5000);

            return () => clearTimeout(timer); // ล้าง timer เวลาคอมโพเนนต์ unmount หรือ toastVisible เปลี่ยน
        }
    }, [toastVisible]);

    // ตัวอย่าง onClick ที่แยกกันสำหรับแต่ละ shelf
    const onShelfClick = (label: string) => {
        setToastVisible(true);

        console.log(`Shelf ${label} clicked!`);
    };

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
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl m-4 p-6 h-210">
                <div className="flex flex-col justify-center items-end w-full">
                    {/* ปุ่มปิด (X) ขวาบน */}
                    <button
                        onClick={() => {setShowShelfGH(false); setSelectedItem(null);}}
                        className="flex justify-center items-center text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-blue-900 w-[10%] "
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
                    <button
                        onClick={() => {setShowShelfGH(false); setSelectedItem(null);}}
                        className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                    >
                        <div>Withdraw </div>
                        <div>เบิกออก </div>
                    </button>

                </div>
            </div>
        </>
    )



    const shelfJIG = (shelf: string) => (
        <>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl m-4 p-6 h-210 ">
                <div className="flex flex-col justify-center items-end w-full">
                    {/* ปุ่มปิด (X) ขวาบน */}
                    <button
                        onClick={() => {setShowShelfDEF(false); setSelectedItem(null);}}
                        className="flex justify-center items-center text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-blue-900 w-[10%] "
                    >
                        &times;
                    </button>

                </div>
                <div className="flex flex-col justify-center items-center mb-4">
                    {/* ชื่อ Shelf */}
                    <div className="text-sm font-semibold text-gray-700 mb-2">{shelf}</div>
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

                    <button
                        onClick={() => {setShowShelfDEF(false); setSelectedItem(null);}}
                        className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                    >
                        <div>Withdraw </div>
                        <div>เบิกออก </div>
                    </button>

                </div>
            </div>
        </>
    )

    const shelfStencil = (shelf: string) => (
        <>
            <div className=" z-50 flex items-center justify-center ">

                <div className=" bg-white p-4 rounded-lg shadow-2xl h-210">
                    <div className="flex flex-col justify-center items-end">
                        {/* ปุ่มปิด (X) ขวาบน */}
                        <button
                            onClick={() => {setShowShelfABC(false); setSelectedItem(null);}}
                            className="flex justify-center items-start text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-blue-900 w-[5%] "
                        >
                            &times;
                        </button>
                    </div>

                    <ShelfWithWheels
                        label={`Shelf ${shelf}`}
                        highlightedNumbers={numonly ? [Number(numonly)] : []} // ตัวที่ 4, 10, 78 จะกระพริบเป็นสีแดง
                    />

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
                        <button
                            onClick={() => {setShowShelfABC(false); setSelectedItem(null);}}
                            className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                        >
                            <div>Withdraw </div>
                            <div>เบิกออก </div>
                        </button>

                    </div>


                </div>
            </div>
        </>
    )


    const shelfSqueegee = (shelf: string) => (
        <>
            <div className=" z-50 flex items-center justify-center h-210 bg-white rounded-2xl">

                <div className=" p-4 rounded-lg ">
                    <div className="flex flex-col justify-center items-end">
                        {/* ปุ่มปิด (X) ขวาบน */}
                        <button
                            onClick={() => {setShowShelfI(false); setSelectedItem(null);}}
                            className="flex justify-center items-start text-white hover:text-red-500 text-[20px] rounded text-center font-bold bg-blue-900 w-[5%] "
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
                        <button
                            onClick={() => {setShowShelfI(false); setSelectedItem(null);}}
                            className="flex flex-col justify-center items-center text-white hover:text-red-500 text-[14px] rounded-xl text-center font-bold bg-green-600 shadow-inner border-2 border-green-300 w-fit uppercase ps-6 pe-6"
                        >
                            <div>Withdraw </div>
                            <div>เบิกออก </div>
                        </button>

                    </div>


                </div>
            </div>
        </>
    );




    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-5 h-210 items-center justify-center w-full max-w-[90%] m-4">
                <h2 className="text-xl text-blue-900 font-semibold text-center mb-4">
                    Tooling Finder Function (MAINTENANCE ROOM)
                </h2>
                <div className="flex items-center justify-center w-full my-4 gap-4">
                    <div className="w-full lg:w-[40%]">
                        <input
                            type="text"
                            placeholder="Tooling Name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full p-4 text-lg text-gray-800 rounded-xl bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Search
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
                                onShelfClick("A");
                                setShowShelfABC((prev) => !prev);
                                setShelf('A');
                            }}
                            lines={[50]}
                            highlighted={lastCharshelf === "A"}
                        />

                        <Shelf label="B" height="large" onClick={() => { onShelfClick("B"); setShowShelfABC((prev) => !prev); setShelf('B') }} lines={[50]} highlighted={lastCharshelf === "B"} />

                        <Shelf label="C" height="large" onClick={() => { onShelfClick("C"); setShowShelfABC((prev) => !prev); setShelf('C') }} lines={[50]} highlighted={lastCharshelf === "C"} />

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
                            <Shelf label="I" height="small" onClick={() => { onShelfClick("I"); setShowShelfI((prev) => !prev); setShelf('I') }} lines={[50]} highlighted={lastCharshelf === "I"} />
                            <Shelf label="H" height="small" onClick={() => { onShelfClick("H"); setShowShelfGH((prev) => !prev); setShelf('H') }} lines={[50]} highlighted={lastCharshelf === "H"} />
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
                {showFloat && (
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



            </div>
        </div>
    );
}
