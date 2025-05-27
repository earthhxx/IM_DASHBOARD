// TempChart.tsx
'use client';
import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = Array.from({ length: 34 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const min = Math.floor(Math.random() * 10 + 15);  // 15°C to 25°C
    const max = min + Math.floor(Math.random() * 10); // Max ≥ Min
    return {
        date: date.toISOString().slice(5, 10), // MM-DD
        min,
        max,
    };
});

export default function TempChart() {
    const [state, setState] = useState<'map' | 'location'>('map');

    const renderGraph = () => (
        <>
            <div className='flex flex-col justify-start items-center mt-10 w-full'>
                <div className='flex flex-row justify-center items-center w-full px-10'>
                    <div className='flex text-center text-2xl text-black w-[15%]'>Temperature Control</div>
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

    const renderMap = () => (
        <>
        <image>
            <img src="/images/temperature_map.png" alt="Temperature Map" className="w-full h-[500px] object-cover mt-10" />
        </image>
        </>
    );

    return ( 
        <div className='flex bg-white w-full h-screen justify-start items-center flex-col'>
            {/* Header */}
            <div className="flex h-[92px] mt-22 bg-gradient-to-r from-blue-800 to-blue-900 w-full drop-shadow-2xl">
                <div className="flex flex-1 justify-end">
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-end">
                            <h1 className="absolute bottom-[20px] text-[55px] text-white font-extrabold drop-shadow-2xl pe-10 ps-10">
                                PRODUCTION1
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="absolute bottom-[6px] text-[25px] text-white font-bold drop-shadow-2xl pe-10 ps-10 uppercase">
                                temperature
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            {state === 'map' && renderMap()}
            {state === 'map' && renderGraph()}
        </div>
    );
}

