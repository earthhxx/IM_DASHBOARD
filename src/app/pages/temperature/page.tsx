// TempChart.tsx
'use client';
import React, { useState, Suspense ,useEffect } from 'react';
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
    const [state, setState] = useState<'mapProduction2' | 'mapProduction1' | 'location' | 'mapnone'>('mapnone');
    useEffect(() => {
        if (param) {
          console.log("ProductOrderNo updated:", param);
          if(param === 'PRODUCTION1') {
            setState('mapProduction1')
          }
          else if (param === 'PRODUCTION2'){
            setState('mapProduction2')
          }
          // You can add additional logic here, such as fetching data based on ProductOrderNo
        }
      }, [param]);

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
                {state === 'location' && renderGraph()}
            </div>
        </div>
    );
}

