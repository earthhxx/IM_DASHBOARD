// TempChart.tsx
'use client';
import React, { useState, Suspense, useEffect } from 'react';
import ParamListener from '../../components/UseParams';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CiTempHigh } from "react-icons/ci"; // commented out originally



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

    const Riple_effect = () => (
        <>
            <div className='absolute size-5 md:size-5 lg:size-8 xl:size-12'>
                {/* Ripple Effect */}
                <span
                    className="absolute top-0 left-0 w-full h-full rounded-full bg-sky-300/90 pointer-events-none"
                    style={{
                        animation: 'ripple 2.5s ease-out infinite',
                    }}
                ></span>
                {/* Button */}
                <button
                    className="absolute w-full h-full  bg-gradient-to-br from-sky-300/70 to-sky-500/80 hover:bg-purple-700 hover:to-purple-900 text-white font-bold rounded-full shadow-xl
                    ring-1 ring-black/10 flex items-center justify-center
                    transition-all duration-300 hover:scale-110 hover:shadow-pink-300/50 z-20"
                >
                    <CiTempHigh className="size-9" />
                </button>
            </div>
        </>
    );





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
            <div className="relative w-full max-w-7xl h-full mx-auto">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production1.png"
                    alt="Production1"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => setState('location')} className="absolute top-[6%] right-[41%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div onClick={() => setState('location')} className="absolute bottom-[4%] right-[43.5%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>

            </div>
        </div>
    );

    const renderMapProduction2 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-full max-w-7xl h-full mx-auto">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production2.png"
                    alt="Production2"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => setState('location')} className="absolute top-[7%] right-[43%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div onClick={() => setState('location')} className="absolute bottom-[5%] right-[43%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>

            </div>
        </div>
    );

    const renderMapProduction3 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-full max-w-7xl h-full mx-auto">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production3.png"
                    alt="Production3"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => setState('location')} className="absolute top-[6%] right-[60%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div onClick={() => setState('location')} className="absolute bottom-[4%] left-[30%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
            </div>
        </div>
    );

    const renderMapProduction4 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-full max-w-7xl h-full mx-auto">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production4.png"
                    alt="Production4"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />


                <div onClick={() => setState('location')} className="absolute top-[5.5%] right-[28%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>

                <div onClick={() => setState('location')} className="absolute bottom-[4.5%] right-[30%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>

            </div>
        </div>
    );

    const renderMapProduction5 = () => (
        <div className='flex items-center justify-center w-full mt-[20px]'>
            <div className="relative w-full max-w-7xl h-full mx-auto">
                {/* ภาพพื้นหลัง */}
                <img
                    src="/images/Production5.png"
                    alt="Production5"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />


                <div onClick={() => setState('location')} className="absolute bottom-[4.5%] left-[35%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
            </div>
        </div>
    );





    const renderMapWarehouse = () => (

        <div className="relative w-full max-w-7xl h-full mx-auto">
            {/* ภาพพื้นหลัง */}
            <img
                src="/images/Warehouse.png"
                alt="Warehouse"
                className="w-full h-auto lg:h-[670px] p-8 mt-2"
            />

            {/* POINT 1*/}
            <div onClick={() => setState('location')} className="absolute bottom-[5%] right-[10%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* POINT 2*/}
            <div onClick={() => setState('location')} className="absolute bottom-[32%] right-[61%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* POINT 3*/}
            <div onClick={() => setState('location')} className="absolute top-[52%] right-[49%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* Super Dry 1-2 */}
            <div onClick={() => { setrenderSuperDry1_2(true) }} className="absolute top-[19%] right-[3%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* Super Dry 3-4 */}
            <div onClick={() => { setrenderSuperDry3_4(true) }} className="absolute top-[57%] left-[3%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* F 4-5-6-7-8 */}
            <div onClick={() => { setrendertemperatureCheckerCard(true) }} className="absolute bottom-[5%] left-[6%] w-12 h-12 z-10 ">
                {Riple_effect()}
            </div>

            {/* F 1-2-3 */}
            <div onClick={() => { setrendertemperatureCheckerCard(true) }} className="absolute top-[4%] right-[5%] w-12 h-12 z-10 ">
                {Riple_effect()}
            </div>


        </div>
    );

    const partmsl = () => (
        <>
            <div className="absolute left-10 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-18 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-28 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-14 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-22 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-6 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-32 top-[20%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>

            <div className="absolute left-10 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-18 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-28 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-14 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-22 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-6 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>
            <div className="absolute left-32 top-[62%] w-[12px] h-[38px] rounded-[2px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 shadow-sm"></div>


        </>

    );

    const SUPERDRYR = () => (
        <>

            <div className="w-44 h-96 bg-gray-800 rounded-xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}

                </div>


                <div className="absolute top-1/3 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}

                </div>


                <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}


                </div>
            </div>

        </>

    );
    const SUPERDRYL = () => (
        <>
            <div className="w-44 h-96 bg-gray-800 rounded-xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute left-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}
                </div>


                <div className="absolute top-1/3 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute left-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}                </div>


                <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute left-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}
                </div>
            </div>

        </>

    );

    const greencup = () => (
        <>
            <div className="absolute right-8 top-2/6 w-[28px] h-5 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
            <div className="absolute center top-2/6 w-[28px] h-5 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
            <div className="absolute left-8 top-2/6 w-[28px] h-5 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
            <div className="absolute center top-[75%] w-[28px] h-5 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
            <div className="absolute right-8 top-[78%] w-[28px] h-4 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
            <div className="absolute left-8 top-[75%] w-[28px] h-5 bg-green-600 rounded-b-[4px] border-t-4 border-green-950 "></div>
        </>
    );

    const FEEZNORMAL = () => (
        <>

            <div className="w-44 h-96 bg-gray-600 rounded-xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {greencup()}
                </div>


                <div className="absolute top-1/3 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {greencup()}
                </div>


                <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {greencup()}
                </div>
            </div>

        </>

    );

    const rendertemCheckerCard = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10'>
            <div ref={cardtemCheckRef} className="bg-black/50 rounded-2xl w-[40%] h-[50%] ">
                <div className='font-bold text-2xl  grid grid-cols-3 place-items-center m-5 w-auto h-[90%]'>
                    <div className='flex items-center justify-end w-full p-[20px] bg-blue-800 rounded-l-xl'>
                        F 3
                    </div>
                    <div className='flex items-center justify-center w-full p-[20px]  bg-blue-800 '>
                        F 2
                    </div>
                    <div className='flex items-center justify-start w-full p-[20px]  bg-blue-800 rounded-r-xl'>
                        F 1
                    </div>

                    <div className='flex items-center justify-end w-full mt-[20px]'>
                        {FEEZNORMAL()}
                    </div>
                    <div className='flex items-center justify-center w-full mt-[20px]'>
                        {FEEZNORMAL()}
                    </div>
                    <div className='flex items-end justify-start w-full mt-[20px]'>
                        {FEEZNORMAL()}
                    </div>
                </div>
            </div>
        </div>
    );


    const renderSuperDry1_2 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10'>
            <div ref={cardSuper1_2Ref} className="bg-black/50 rounded-2xl w-[40%] h-[50%] ">
                <div className='font-bold text-2xl  grid grid-cols-2 place-items-center m-5 w-auto h-[90%]'>

                    <div className='flex items-center justify-center w-full p-[20px]  bg-blue-800 rounded-l-xl'>
                        SUPER DRY 1
                    </div>
                    <div className='flex items-center justify-center w-full p-[20px]  bg-blue-800 rounded-r-xl'>
                        SUPER DRY 2
                    </div>

                    <div className='flex items-center justify-end w-full mt-[20px]'>
                        {SUPERDRYR()}
                        {SUPERDRYL()}
                    </div>
                    <div className='flex items-center justify-start w-full mt-[20px]'>
                        {SUPERDRYR()}
                        {SUPERDRYL()}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSuperDry3_4 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10'>
            <div ref={cardSuper3_4Ref} className="bg-black/50 rounded-2xl w-[40%] h-[50%] ">

                <div className='font-bold text-2xl  grid grid-cols-2 place-items-center m-5 w-auto h-[90%]'>

                    <div className='flex items-center justify-center w-full p-[20px]  bg-blue-800 rounded-l-xl'>
                        SUPER DRY 3
                    </div>
                    <div className='flex items-center justify-center w-full p-[20px]  bg-blue-800 rounded-r-xl'>
                        SUPER DRY 4
                    </div>

                    <div className='flex items-center justify-end w-full mt-[20px]'>
                        {SUPERDRYR()}
                        {SUPERDRYL()}
                    </div>
                    <div className='flex items-center justify-start w-full mt-[20px]'>
                        {SUPERDRYR()}
                        {SUPERDRYL()}
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className='flex flex-col bg-white w-full h-screen'>
            {/* Header ใหม่ */}
            <header className="fixed w-full bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl px-10 mt-22 py-4">
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
            <div className="flex-1">
                <div className='h-[25%]'></div>
                <div className=''>
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
            {/* renderALLCard */}
            {rendertemperatureCheckerCard && rendertemCheckerCard()}
            {renderSuperDry1_2Card && renderSuperDry1_2()}
            {renderSuperDry3_4Card && renderSuperDry3_4()}
        </div>

    );
}

