"use client";

import React, { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import ShelfWithWheels from "../../components/ShelfWithWheels";



// Common styles
const shelfBase =
    "w-10 sm:w-[50px] lg:w-[60px] bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 border-2 border-gray-400 rounded-md relative shadow-md font-semibold text-gray-700 font-sans tracking-wide hover:scale-125 hover:z-50 transition-transform duration-200 flex items-center justify-center select-none cursor-pointer";

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
};

const Shelf: React.FC<ShelfProps> = ({ label, height, onClick, lines = [] }) => {
    return (
        <div
            className={`${shelfBase} ${shelfHeights[height]} relative`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && onClick()}
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
};

const DoubleShelf: React.FC<DoubleShelfProps> = ({ labels, height, onClicks, lines = [] }) => (
    <div className="flex gap-2">
        <Shelf label={labels[0]} height={height} onClick={onClicks[0]} lines={lines} />
        <Shelf label={labels[1]} height={height} onClick={onClicks[1]} lines={lines} />
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
    const [showShelf, setShowShelf] = React.useState(true);


    // ใช้ useEffect รอ 3 วินาทีแล้วซ่อน Toast อัตโนมัติ
    useEffect(() => {
        if (toastVisible) {
            const timer = setTimeout(() => {
                setToastVisible(false);
            }, 3000);

            return () => clearTimeout(timer); // ล้าง timer เวลาคอมโพเนนต์ unmount หรือ toastVisible เปลี่ยน
        }
    }, [toastVisible]);

    // ตัวอย่าง onClick ที่แยกกันสำหรับแต่ละ shelf
    const onShelfClick = (label: string) => {
        setToastVisible(true);

        console.log(`Shelf ${label} clicked!`);
    };



    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-8 h-fit items-center justify-center w-full max-w-screen-xl">
                <h2 className="text-xl text-blue-900 font-semibold text-center mb-4">
                    Tooling Finder Function (MAINTENANCE ROOM)
                </h2>

                <div className="relative flex flex-col w-full border border-dashed border-blue-800 rounded-md pt-4 mt-4 bg-gray-50">
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
                    <div className="flex w-full justify-between mt-6 flex-wrap gap-4">
                        <Shelf label="A" height="large" onClick={() => { onShelfClick("A"); setShowShelf((prev) => !prev) }} lines={[50]} />
                        <Shelf label="B" height="large" onClick={() => onShelfClick("B")} lines={[50]} />
                        <Shelf label="C" height="large" onClick={() => onShelfClick("C")} lines={[50]} />
                        <DoubleShelf
                            labels={["D", "E"]}
                            height="large"
                            onClicks={[() => onShelfClick("D"), () => onShelfClick("E")]}
                            lines={[33, 66]}
                        />
                        <DoubleShelf
                            labels={["F", "G"]}
                            height="large"
                            onClicks={[() => onShelfClick("F"), () => onShelfClick("G")]}
                            lines={[33, 66]}
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
                            <Shelf label="I" height="small" onClick={() => onShelfClick("I")} />
                            <Shelf label="H" height="small" onClick={() => onShelfClick("H")} />
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

                    {/* Toast */}
                    {toastVisible && (
                        <Toast message="บันทึกข้อมูลสำเร็จ!" onClose={() => setToastVisible(false)} />
                    )}


                </div>
               

            </div>
             {showShelf && (
                    <div className=" z-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-2xl">
                            <ShelfWithWheels visible={true} label="Shelf A" />
                            <div className=" bg-black/50 w-full h-20 mt-2 rounded-xl">

                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}
