// TempChart.tsx
'use client';
import React, { useState, Suspense, useEffect } from 'react';
import ParamListener from '../../components/UseParams';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = Array.from({ length: 31 }, (_, i) => {
    // สร้างวันที่เองโดยไม่ใช้ไลบรารี
    const date = (i + 1).toString(); // วันที่ 1 ถึง 31 เป็น string
    // Fixed min and max values for demonstration
    const min = ((i + 1) % 11);
    const max = min + 5;      // Always 5 degrees higher than min
    return {
        date,
        min,
        max,
    };
});

const cleanedData = data.map((item) => ({
    ...item,
    min: item.min === 0 || item.min === 0 ? null : item.min,
    max: item.max === 0 || item.max === 0 ? null : item.max,
}));


export default function TempChart() {
    const [param, setParam] = useState<string | null>(''); // ไม่อนุญาตให้เป็น null
    const [rendertemperatureCheckerCard, setrendertemperatureCheckerCard] = useState(false);
    const [renderSuperDry1_2Card, setrenderSuperDry1_2] = useState(false);
    const [renderSuperDry3_4Card, setrenderSuperDry3_4] = useState(false);
    const [state, setState] = useState<'location' | 'mapnone' | 'mapProduction1' | 'mapProduction2' | 'mapProduction3' | 'mapProduction4' | 'mapProduction5' | 'mapWarehouse'>('mapnone');

    // Define refs for the cards
    const cardtemCheckRef = React.useRef<HTMLDivElement>(null);
    const cardSuper1_2Ref = React.useRef<HTMLDivElement>(null);
    const cardSuper3_4Ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (param) {
            console.log("ProductOrderNo updated:", param);
            if (param === 'PRODUCTION1') {
                setState('mapProduction1')
            }
            else if (param === 'PRODUCTION2') {
                setState('mapProduction2')
            }
            else if (param === 'PRODUCTION3') {
                setState('mapProduction3')
            }
            else if (param === 'PRODUCTION4') {
                setState('mapProduction4')
            }
            else if (param === 'PRODUCTION5') {
                setState('mapProduction5')
            }
            else if (param === 'WAREHOUSE') {
                setState('mapWarehouse')
            }
            else {
                setState('mapnone')
            }
        }
    }
        , [param]);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const clickedTarget = event.target as Node;

        const isClickOutsideTem = cardtemCheckRef.current && !cardtemCheckRef.current.contains(clickedTarget);
        const isClickOutsideSuper1_2 = cardSuper1_2Ref.current && !cardSuper1_2Ref.current.contains(clickedTarget);
        const isClickOutsideSuper3_4 = cardSuper3_4Ref.current && !cardSuper3_4Ref.current.contains(clickedTarget);

        if (rendertemperatureCheckerCard && isClickOutsideTem) {
            setrendertemperatureCheckerCard(false);
        }
        if (renderSuperDry1_2Card && isClickOutsideSuper1_2) {
            setrenderSuperDry1_2(false);
        }
        if (renderSuperDry3_4Card && isClickOutsideSuper3_4) {
            setrenderSuperDry3_4(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [rendertemperatureCheckerCard, renderSuperDry1_2Card, renderSuperDry3_4Card]);


    const renderGraph = () => (
        <>
            <div className='flex flex-col justify-start items-center mt-10 w-full'>
                <div className='flex flex-row justify-end items-center w-full h-[10%] px-10'>
                    <button
                        className="flex bg-blue-800 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded shadow-lg
                ring-2 ring-blue-100 ring-opacity-80 scale-105"
                        onClick={() => setState('mapProduction1')}
                    >
                        กลับไปดูแผนที่
                    </button>

                </div>

                <div className='flex flex-row justify-center items-center w-full px-10 mt-5'>

                    <div className='flex text-center text-2xl text-black w-[15%]'>Temperature Control</div>
                    <div className="w-[100%] h-[300px] p-4 backdrop-blur-xl">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={cleanedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis
                                    label={{ value: '°C', angle: -90, position: 'insideLeft' }}
                                    domain={[0, 15]} // กำหนด min/max ของแกน Y
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="min" stroke="#8884d8" name="Min Temp" />
                                <Line type="monotone" dataKey="max" stroke="#82ca9d" name="Max Temp" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                <div className='flex flex-row justify-center items-center w-full px-10'>
                    <div className='flex text-center text-2xl  text-black w-[15%]'>Humidity Control</div>
                    <div className="w-[100%] h-[300px] p-4 backdrop-blur-xl">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="min" stroke="#8884d8" name="Min Temp" />
                                <Line type="monotone" dataKey="max" stroke="#82ca9d" name="Max Temp" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        </>
    );

    const renderMapnone = () => (
        <>

        </>
    );

    const renderMapProduction1 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production1.png"
                    alt="Production1"
                    className="w-full h-auto mt-2"
                />

                {/* ปุ่ม Overlay - ดูอุณหภูมิ */}
                <button
                    className="absolute top-4 right-149 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute top-4 right-149 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* ปุ่ม Overlay - ดูความชื้น */}
                <button
                    className="absolute -bottom-3 right-157 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute -bottom-3 right-157 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

            </div>
        </div>
    );

    const renderMapProduction2 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production2.png"
                    alt="Production2"
                    className="w-full h-auto mt-2"
                />

                {/* ปุ่ม Overlay - ดูอุณหภูมิ */}
                <button
                    className="absolute top-4 right-155 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute top-4 right-155 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* ปุ่ม Overlay - ดูความชื้น */}
                <button
                    className="absolute -bottom-3 right-155 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute -bottom-3 right-155 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

            </div>
        </div>
    );

    const renderMapProduction3 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production3.png"
                    alt="Production3"
                    className="w-full h-auto mt-2"
                />

                {/* ปุ่ม Overlay - ดูอุณหภูมิ */}
                <button
                    className="absolute top-4 left-151 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute top-4 left-151 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* ปุ่ม Overlay - ดูความชื้น */}
                <button
                    className="absolute bottom-1 left-110 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-1 left-110 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

            </div>
        </div>
    );

    const renderMapProduction4 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production4.png"
                    alt="Production4"
                    className="w-full h-auto mt-2"
                />

                {/* ปุ่ม Overlay - ดูอุณหภูมิ */}
                <button
                    className="absolute top-4 right-77 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute top-4 right-77 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* ปุ่ม Overlay - ดูความชื้น */}
                <button
                    className="absolute bottom-0 right-115 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-0 right-115 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

            </div>
        </div>
    );

    const renderMapProduction5 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production5.png"
                    alt="Production5"
                    className="w-full h-auto mt-2"
                />



                <button
                    className="absolute bottom-0 left-130 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-0 left-130 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                <button
                    className="absolute bottom-0 left-130 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-0 left-130 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

            </div>
        </div>
    );

    const renderMapWarehouse = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-[75%]">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Warehouse.png"
                    alt="Warehouse"
                    className="w-full h-auto mt-2"
                />


                {/* POINT 1 */}
                <button
                    className="absolute bottom-2 right-40 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-2 right-40 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* POINT 2 */}
                <button
                    className="absolute bottom-80 left-124 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-80 left-124 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* POINT 3 */}
                <button
                    className="absolute bottom-90 left-194 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setState('location')}
                >
                    click
                </button>
                <div className='absolute bottom-90 left-194 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* Super Dry 1-2 */}
                <button
                    className="absolute top-36 right-11 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setrenderSuperDry1_2(true)}
                >
                    click
                </button>
                <div className='absolute top-36 right-11 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* Super Dry 3-4 */}
                <button
                    className="absolute bottom-71 left-13 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setrenderSuperDry3_4(true)}
                >
                    click
                </button>
                <div className='absolute bottom-71 left-13 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>

                {/* TEMPERATURE CHECKER */}
                <button
                    className="absolute top-10 right-19 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-11"
                    onClick={() => setrendertemperatureCheckerCard(true)}
                >
                    click
                </button>
                <div className='absolute top-10 right-19 bg-pink-400 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg
                ring-2 ring-red-500 ring-opacity-80 size-10 z-10 animate-ping'>
                </div>
                {rendertemperatureCheckerCard && rendertemCheckerCard()}
                {renderSuperDry1_2Card && renderSuperDry1_2()}
                {renderSuperDry3_4Card && renderSuperDry3_4()}



            </div>
        </div>
    );

    const rendertemCheckerCard = () => (
        <div className=''>
            <div ref={cardtemCheckRef} className="absolute top-15 -right-45 z-20 w-[40%]">
                <div className='grid grid-cols-3 gap-4'>
                    <button onClick={() => setrendertemperatureCheckerCard(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        Temperature Checker 3
                    </button>
                    <button onClick={() => setrendertemperatureCheckerCard(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        Temperature Checker 2
                    </button>
                    <button onClick={() => setrendertemperatureCheckerCard(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        Temperature Checker 1                    </button>
                </div>
            </div>
        </div>
    );

    const renderSuperDry1_2 = () => (
        <div className='relative'>
            <div ref={cardSuper1_2Ref} className="absolute -top-142 -right-0 z-20 w-[15%]">
                <div   className='grid grid-cols-1 gap-4'>
                    <button onClick={() => setrenderSuperDry1_2(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        SuperDry 1
                    </button>
                    <button onClick={() => setrenderSuperDry1_2(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        SuperDry 2
                    </button>

                </div>
            </div>
        </div>
    );

    const renderSuperDry3_4 = () => (
        <div  className='relative'>
            <div ref={cardSuper3_4Ref} className="absolute -top-60 left-0 z-20 w-[15%]">
                <div  className='grid grid-cols-1 gap-4'>
                    <button onClick={() => setrenderSuperDry3_4(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        SuperDry 3
                    </button>
                    <button onClick={() => setrenderSuperDry3_4(false)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ring-2 ring-blue-300 ring-opacity-80'>
                        SuperDry 4
                    </button>

                </div>
            </div>
        </div>
    );


    return (
        <div className='flex flex-col bg-white w-full h-screen'>
            {/* Header ใหม่ */}
            <header className="w-full bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl px-10 mt-22 py-4">
                <div className="flex flex-col items-end text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg tracking-wide">
                        {param}
                    </h1>
                    <h2 className="text-lg md:text-2xl font-semibold uppercase drop-shadow">
                        Temperature
                    </h2>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <ParamListener onGetParam={setParam} />
                </Suspense>
                {state === 'mapnone' && renderMapnone()}
                {state === 'mapProduction1' && renderMapProduction1()}
                {state === 'mapProduction2' && renderMapProduction2()}
                {state === 'mapProduction3' && renderMapProduction3()}
                {state === 'mapProduction4' && renderMapProduction4()}
                {state === 'mapProduction5' && renderMapProduction5()}
                {state === 'mapWarehouse' && renderMapWarehouse()}
                {state === 'location' && renderGraph()}

            </div>
        </div>
    );
}

