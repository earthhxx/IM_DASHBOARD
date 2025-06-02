// TempChart.tsx
'use client';
import React, { useState, Suspense, useEffect, ReactElement } from 'react';
import ParamListener from '../../components/UseParams';
import { LineChart, Line, XAxis, XAxisProps, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { CiTempHigh } from "react-icons/ci"; // commented out originally
import { start } from 'repl';
import { TextBox } from '@react-pdf-viewer/core';


type DataSuperDry = {
    ID: number;
    Date: string;
    Doc_Name: string;
    Area: string;
    Line: string;
    HControl1: string;
    HControl2: string;
    HControl3: string;
    HControl4: string;
    HControl5: string;
    HMax1: string;
    HMax2: string;
    HMax3: string;
    HMax4: string;
    HMax5: string;
    HMax6: string;
    HMax7: string;
    HMax8: string;
    HMax9: string;
    HMax10: string;
    HMax11: string;
    HMax12: string;
    HMax13: string;
    HMax14: string;
    HMax15: string;
    HMax16: string;
    HMax17: string;
    HMax18: string;
    HMax19: string;
    HMax20: string;
    HMax21: string;
    HMax22: string;
    HMax23: string;
    HMax24: string;
    HMax25: string;
    HMax26: string;
    HMax27: string;
    HMax28: string;
    HMax29: string;
    HMax30: string;
    HMax31: string;
};

type DataFridge = {
    ID: number;
    Date: string;
    Doc_Name: string;
    Area: string;
    Line: string;
    TControl1: string;
    TControl2: string;
    TControl3: string;
    TControl4: string;
    TControl5: string;
    TMax1: string;
    TMax2: string;
    TMax3: string;
    TMax4: string;
    TMax5: string;
    TMax6: string;
    TMax7: string;
    TMax8: string;
    TMax9: string;
    TMax10: string;
    TMax11: string;
    TMax12: string;
    TMax13: string;
    TMax14: string;
    TMax15: string;
    TMax16: string;
    TMax17: string;
    TMax18: string;
    TMax19: string;
    TMax20: string;
    TMax21: string;
    TMax22: string;
    TMax23: string;
    TMax24: string;
    TMax25: string;
    TMax26: string;
    TMax27: string;
    TMax28: string;
    TMax29: string;
    TMax30: string;
    TMax31: string;
};

export interface DataRoom {
    ID: number;
    Date: string; // หรือใช้ Date ก็ได้ถ้า parse แล้ว
    Doc_Name: string;
    Area: string;
    Line: string;

    // Temperature Controls
    TControl1: number | null;
    TControl2: number | null;
    TControl3: number | null;
    TControl4: number | null;
    TControl5: number | null;

    // Tmax และ Tmin (1 - 31)
    [key: `TMax${number}`]: number | null;
    [key: `TMin${number}`]: number | null;

    // Humidity Controls
    HControl1: number | null;
    HControl2: number | null;
    HControl3: number | null;
    HControl4: number | null;
    HControl5: number | null;

    // HMax และ HMin (1 - 31)
    [key: `HMax${number}`]: number | null;
    [key: `HMin${number}`]: number | null;
}


type GraphPoint = {
    date: string | null;
    max: number | null;
};

type GraphPointT = {
    date: string | null;
    max: number | null;
    min: number | null;
};

type GraphPointH = {
    date: string | null;
    max: number | null;
    min: number | null;
};

function getFilteredTControls(entry: DataRoom): number[] {
    return [1, 2, 3, 4, 5].map(i => {
        const key = `TControl${i}` as keyof DataSuperDry;
        const raw = entry[key];
        const str = raw !== undefined && raw !== null ? String(raw).trim() : '';
        const num = parseFloat(str);
        return !isNaN(num) ? num : 0;
    });
}

function getFilteredHControls(entry: DataRoom): number[] {
    return [1, 2, 3, 4, 5].map(i => {
        const key = `HControl${i}` as keyof DataSuperDry;
        const raw = entry[key];
        const str = raw !== undefined && raw !== null ? String(raw).trim() : '';
        const num = parseFloat(str);
        return !isNaN(num) ? num : 0;
    });
}


function transformRoomH(entry: DataRoom): GraphPointH[] {
    const points: GraphPointH[] = [];
    const baseDate = new Date(entry.Date);
    const month = baseDate.getMonth() + 1;

    // อ่านค่า HMax1-31 และสร้างจุดกราฟให้ครบทุกวัน
    for (let day = 1; day <= 31; day++) {
        const key = `HMax${day}` as keyof DataRoom;
        const key2 = `HMin${day}` as keyof DataRoom;
        const rawValue = entry[key];
        const rawValue2 = entry[key2];
        const valStr = rawValue !== undefined && rawValue !== null ? String(rawValue).trim() : '';
        const valStr2 = rawValue2 !== undefined && rawValue2 !== null ? String(rawValue2).trim() : '';

        let minValue: number | null = null;
        let maxValue: number | null = null;
        if (valStr !== '') {
            const parsed = parseFloat(valStr);
            if (!isNaN(parsed) && parsed !== 0) {
                maxValue = parsed;
            }
        }
        if (valStr2 !== '') {
            const parsed = parseFloat(valStr2);
            if (!isNaN(parsed) && parsed !== 0) {
                minValue = parsed;
            }
        }

        // const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateStr = String(day).padStart(2, '0'); // เฉพาะวัน
        points.push({
            date: dateStr,
            max: maxValue,
            min: minValue
        });
    }

    return points;
}

function transformRoomT(entry: DataRoom): GraphPointT[] {
    const points: GraphPointT[] = [];
    const baseDate = new Date(entry.Date);
    const month = baseDate.getMonth() + 1;

    // อ่านค่า HMax1-31 และสร้างจุดกราฟให้ครบทุกวัน
    for (let day = 1; day <= 31; day++) {
        const key = `TMax${day}` as keyof DataRoom;
        const key2 = `TMin${day}` as keyof DataRoom;
        const rawValue = entry[key];
        const rawValue2 = entry[key2];
        const valStr = rawValue !== undefined && rawValue !== null ? String(rawValue).trim() : '';
        const valStr2 = rawValue2 !== undefined && rawValue2 !== null ? String(rawValue2).trim() : '';

        let minValue: number | null = null;
        let maxValue: number | null = null;
        if (valStr !== '') {
            const parsed = parseFloat(valStr);
            if (!isNaN(parsed) && parsed !== 0) {
                maxValue = parsed;
            }
        }
        if (valStr2 !== '') {
            const parsed2 = parseFloat(valStr2);
            if (!isNaN(parsed2) && parsed2 !== 0) {
                minValue = parsed2;
            }
        }

        // const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateStr = String(day).padStart(2, '0'); // เฉพาะวัน
        points.push({
            date: dateStr,
            max: maxValue,
            min: minValue
        });
    }

    return points;
}

function transformSuperDryData(entry: DataSuperDry): GraphPoint[] {
    const points: GraphPoint[] = [];
    const baseDate = new Date(entry.Date);
    const month = baseDate.getMonth() + 1;

    // อ่านค่า HMax1-31 และสร้างจุดกราฟให้ครบทุกวัน
    for (let day = 1; day <= 31; day++) {
        const key = `HMax${day}` as keyof DataSuperDry;
        const rawValue = entry[key];
        const valStr = rawValue !== undefined && rawValue !== null ? String(rawValue).trim() : '';

        let maxValue: number | null = null;
        if (valStr !== '') {
            const parsed = parseFloat(valStr);
            if (!isNaN(parsed) && parsed !== 0) {
                maxValue = parsed;
            }
        }

        // const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateStr = String(day).padStart(2, '0'); // เฉพาะวัน
        points.push({
            date: dateStr,
            max: maxValue
        });
    }

    return points;
}

function transformFridgeData(entry: DataFridge): GraphPoint[] {
    const points: GraphPoint[] = [];
    const baseDate = new Date(entry.Date);
    const month = baseDate.getMonth() + 1;

    // อ่านค่า HMax1-31 และสร้างจุดกราฟให้ครบทุกวัน
    for (let day = 1; day <= 31; day++) {
        const key = `TMax${day}` as keyof DataFridge;
        const rawValue = entry[key];
        const valStr = rawValue !== undefined && rawValue !== null ? String(rawValue).trim() : '';

        let maxValue: number | null = null;
        if (valStr !== '') {
            const parsed = parseFloat(valStr);
            if (!isNaN(parsed) && parsed !== 0) {
                maxValue = parsed;
            }
        }

        // const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateStr = String(day).padStart(2, '0'); // เฉพาะวัน
        points.push({
            date: dateStr,
            max: maxValue
        });
    }

    return points;
}



function getFilteredHControlsDry(entry: DataSuperDry): number[] {
    return [1, 2, 3, 4, 5].map(i => {
        const key = `HControl${i}` as keyof DataSuperDry;
        const raw = entry[key];

        const str = raw !== undefined && raw !== null ? String(raw).trim() : '';
        const num = parseFloat(str);

        return !isNaN(num) ? num : 0; // ถ้าไม่ใช่ NaN คืนค่าจริง, ถ้า NaN คืน 0
    });
}


function getFilteredTControlsFridge(entry: DataFridge): number[] {
    return [1, 2, 3, 4, 5].map(i => {
        const key = `TControl${i}` as keyof DataFridge;
        const raw = entry[key];

        const str = raw !== undefined && raw !== null ? String(raw).trim() : '';
        const num = parseFloat(str);

        return !isNaN(num) ? num : 0; // ถ้าไม่ใช่ NaN คืนค่าจริง, ถ้า NaN คืน 0
    });
}






export default function TempChart() {
    const [param, setParam] = useState<string | null>(''); // ไม่อนุญาตให้เป็น null
    const [Fridge1_2_3Card, setFridge1_2_3Card] = useState(false);
    const [Fridge4_5_6_7_8Card, setFridge4_5_6_7_8] = useState(false);
    const [renderSuperDry1_2Card, setrenderSuperDry1_2] = useState(false);
    const [renderSuperDry3_4Card, setrenderSuperDry3_4] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [state, setState] = useState<'location' | 'mapnone' | 'mapProduction1' | 'mapProduction2' | 'mapProduction3' | 'mapProduction4' | 'mapProduction5' | 'mapWarehouse'>('mapnone');

    // Define refs for the cards
    const Fridge1_2_3CardcheckRef = React.useRef<HTMLDivElement>(null);
    const Fridge4_5_6_7_8CardCheckRef = React.useRef<HTMLDivElement>(null);
    const cardSuper1_2Ref = React.useRef<HTMLDivElement>(null);
    const cardSuper3_4Ref = React.useRef<HTMLDivElement>(null);


    const [GraphSuperD, setGraphSuperD] = useState(false);
    const [GraphFridge, setGraphSFridge] = useState(false);
    const [GraphRoom, setGraphRoom] = useState(false);

    //group data
    const [graphData, setGraphData] = useState<GraphPoint[]>([]);
    const paddedGraphData = [
        { date: '', max: null, min: null }, // Padding ด้านหน้า
        ...graphData,                       // ✅ ใส่ข้อมูลจริงเข้า array
        { date: '', max: null, min: null }, // Padding ด้านหลัง
    ];
    let sortedControls: number[] = [];
    const [sortedControl, setsortControl] = useState<number[]>([]);

    //datatemperature Superdry
    const [DatatempDry, setDatatempDry] = useState<DataSuperDry[]>([]);

    //datatemperature Fridge
    const [DatatempFridge, setDatatempFridge] = useState<DataFridge[]>([]);

    //datatemperature Room
    const [DatatempRoom, setDatatempRoom] = useState<DataRoom[]>([]);


    //group data TRoom
    const [graphDataT, setGraphDataT] = useState<GraphPoint[]>([]);
    const paddedGraphDataT = [
        { date: '', max: null, min: null }, // Padding ด้านหน้า
        ...graphDataT,                       // ✅ ใส่ข้อมูลจริงเข้า array
        { date: '', max: null, min: null }, // Padding ด้านหลัง
    ];
    let sortedControlsT: number[] = [];
    const [sortedControlT, setsortControlT] = useState<number[]>([]);

    //group data HRoom
    const [graphDataH, setGraphDataH] = useState<GraphPoint[]>([]);
    const paddedGraphDataH = [
        { date: '', max: null, min: null }, // Padding ด้านหน้า
        ...graphDataH,                       // ✅ ใส่ข้อมูลจริงเข้า array
        { date: '', max: null, min: null }, // Padding ด้านหลัง
    ];
    let sortedControlsH: number[] = [];
    const [sortedControlH, setsortControlH] = useState<number[]>([]);



    const [point, setpoint] = useState('')






    useEffect(() => {
        if (param) {
            console.log("State updated:", param);
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

    // useEffect(() => {
    //     console.log(graphData);
    // }, [graphData]);

    const handleClickGraphDry = async (loc: string) => {
        if (renderSuperDry1_2Card === true) {
            setrenderSuperDry1_2(false);
            await fetchDataSuperDry(loc); // รอโหลดข้อมูล

            // อัปเดต state ที่เก็บ graph data ถ้ามี เช่น setGraphData(graphData)
        } else if (renderSuperDry3_4Card === true) {
            setrenderSuperDry3_4(false);
            await fetchDataSuperDry(loc);
        } else {
            setrenderSuperDry1_2(false);
            setrenderSuperDry3_4(false);
        }

        setGraphSuperD(true);
    };

    const handleClickGraphFridge = async (loc: string) => {
        if (Fridge1_2_3Card === true) {
            setFridge1_2_3Card(false);
            await fetchDataFridge(loc); // รอโหลดข้อมูล

            // อัปเดต state ที่เก็บ graph data ถ้ามี เช่น setGraphData(graphData)
        } else if (Fridge4_5_6_7_8Card === true) {
            setFridge4_5_6_7_8(false);
            await fetchDataFridge(loc);
        } else if (renderSuperDry3_4Card === true) {
            setrenderSuperDry3_4(false);
            await fetchDataFridge(loc);
        } else {
            setFridge1_2_3Card(false);
            setFridge1_2_3Card(false);
        }

        setGraphSFridge(true);
    };

    const handleClickGraphRoom = async (loc: string) => {
        await fetchDataRoom(loc)
        if (graphDataH || graphDataT) {
                setGraphRoom(true);
        }
    };


    const fetchDataRoom = async (loc: string) => {

        if (!loc) {
            console.error("no location");
            return;
        }

        try {
            const response = await fetch(`/api/temperature/location?location=${loc}`);
            if (!response.ok) {
                console.log('response fail');
                
                setShowAlert(true);
                return;
            }

            const result = await response.json();
            console.log(result);
            setDatatempRoom(result.data);

            if (Array.isArray(result.data) && result.data.length > 0) {
                const sampleEntry: DataRoom = result.data[0];

                const GraphPointsT = transformRoomT(sampleEntry);
                setGraphDataT(GraphPointsT);
                console.log(GraphPointsT);

                const GraphPointsH = transformRoomH(sampleEntry);
                setGraphDataH(GraphPointsH);
                console.log(GraphPointsH);

                sortedControlsH = getFilteredHControls(sampleEntry).sort((a, b) => a - b);
                setsortControlH(sortedControlsH);

                sortedControlsT = getFilteredTControls(sampleEntry).sort((a, b) => a - b);
                setsortControlT(sortedControlsT);

            }
            

        } catch (err) {
            console.log('Error fetch fail', err);
        }
    };


    const fetchDataSuperDry = async (loc: string) => {

        if (!loc) {
            console.error("no location");
            return;
        }

        try {
            const response = await fetch(`/api/temperature/superdry?location=${loc}`);
            if (!response.ok) {
                console.log('response fail');
                
                setShowAlert(true);
                return;
            }

            const result = await response.json();
            console.log(result);
            setDatatempDry(result.data);

            if (Array.isArray(result.data) && result.data.length > 0) {
                const sampleEntry: DataSuperDry = result.data[0];
                const GraphPointss = transformSuperDryData(sampleEntry);
                setGraphData(GraphPointss);
                console.log(GraphPointss);

                sortedControls = getFilteredHControlsDry(sampleEntry).sort((a, b) => a - b);
                setsortControl(sortedControls)
            }

        } catch (err) {
            console.log('Error fetch fail', err);
        }
    };

    const fetchDataFridge = async (loc: string) => {

        if (!loc) {
            console.error("no location");
            return;
        }

        try {
            const response = await fetch(`/api/temperature/fridge?location=${loc}`);
            if (!response.ok) {
                console.log('response fail');
                
                setShowAlert(true);
                return;
            }

            const result = await response.json();
            console.log(result);
            setDatatempFridge(result.data);

            if (Array.isArray(result.data) && result.data.length > 0) {
                const sampleEntry: DataFridge = result.data[0];
                const GraphPointss = transformFridgeData(sampleEntry);
                setGraphData(GraphPointss);
                console.log(GraphPointss);

                sortedControls = getFilteredTControlsFridge(sampleEntry).sort((a, b) => a - b);
                setsortControl(sortedControls)
            }

        } catch (err) {
            console.log('Error fetch fail', err);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedTarget = event.target as Node;

            const isClickOutsideFridge1_2_3Card = Fridge1_2_3CardcheckRef.current && !Fridge1_2_3CardcheckRef.current.contains(clickedTarget);
            const isClickOutsideFridge4_5_6_7_8Card = Fridge4_5_6_7_8CardCheckRef.current && !Fridge4_5_6_7_8CardCheckRef.current.contains(clickedTarget);
            const isClickOutsideSuper1_2 = cardSuper1_2Ref.current && !cardSuper1_2Ref.current.contains(clickedTarget);
            const isClickOutsideSuper3_4 = cardSuper3_4Ref.current && !cardSuper3_4Ref.current.contains(clickedTarget);

            if (Fridge1_2_3Card && isClickOutsideFridge1_2_3Card) {
                setFridge1_2_3Card(false);
            }
            if (Fridge4_5_6_7_8Card && isClickOutsideFridge4_5_6_7_8Card) {
                setFridge4_5_6_7_8(false);
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
    }, [Fridge1_2_3Card, Fridge4_5_6_7_8Card, renderSuperDry1_2Card, renderSuperDry3_4Card]);

    const Riple_effect = () => (
        <>
            <div className='absolute size-5 md:size-5 lg:size-8 xl:size-10'>
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


    const divtempsuperD = () => (

        <>
            <div className="grid grid-cols-11 gap-4 p-4 w-full ">
                {graphData.map((point, index) => (
                    <div
                        key={index}
                        className="p-4 w-[100%] border rounded-xl shadow-sm bg-white hover:shadow-md transition-all"
                    >
                        <div className="text-sm text-gray-500">{point.date}</div>
                        <div className="text-lg font-semibold text-blue-600">
                            {point.max !== null ? `${point.max} °C` : 'ไม่มีข้อมูล'}
                        </div>
                    </div>
                ))}
            </div>

        </>

    );

    const renderalert = () => (
        <>
            <div className='w-full h-full fixed flex flex-col mt-25 items-center justify-center p-6 gap-6 z-50'>
                <div id="alert-card" className=" flex justify-center w-[50%] h-[20%] items-center z-50 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 w-10 h-10 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-4a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 10 6Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    </svg>
                    <div className="mx-2 text-xl font-kanit ">
                        ไม่พบข้อมูลสำหรับสถานที่นี้ หรือยังไม่ได้บันทึกข้อมูล
                    </div>
                    <button onClick={() => setShowAlert(false)} className=" -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-12 w-12 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" aria-label="Close">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1L1 13" />
                        </svg>
                    </button>
                </div>

            </div>

        </>
    );


    const CustomTick = (props: any): ReactElement => {
        const { x, y, payload } = props;

        if (!payload?.value || payload.value === '-' || payload.value === '0') {
            return <></>; // ซ่อนทั้งข้อความและเส้น tick
        }

        return (
            <g>
                <line
                    x1={x}
                    y1={y - 8}
                    x2={x}
                    y2={y}
                    stroke="#666"
                    strokeWidth={1}
                />
                <text
                    x={x - 7}
                    y={y + 14}

                    fill="gray"
                    fontSize={16}
                >
                    {payload.value}
                </text>
            </g>
        );
    };








    const renderGraphSuperDry = () => (
        <>
            {graphData.length > 0 && (
                <div className='fixed inset-0 flex flex-col bg-white z-50 2xl:z-20 overflow-y-auto'>

                    <div className='flex flex-col w-full flex-1 justify-center items-center p-6 gap-6'>
                        <div className='z-30 w-full flex flex-wrap justify-between items-center gap-4 px-4 sm:px-6 md:px-10 py-4'>
                            <button
                                className="bg-blue-800 hover:bg-blue-500 text-white font-semibold py-2 px-4 sm:px-6 rounded shadow text-sm sm:text-base"
                                onClick={() => {setGraphSuperD(false); setGraphData([]); setpoint('');} }
                            >
                                ← กลับไปดูแผนที่
                            </button>

                            <div className='text-white bg-gradient-to-r from-sky-600 via-blue-700 to-blue-900 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xl sm:text-2xl md:text-3xl font-kanit tracking-wide shadow-md text-center'>
                                SUPER DRY : {point}
                            </div>
                        </div>

                        {/* Graph Section */}
                        <div className='w-full flex flex-col gap-6'>
                            {/* Humidity */}
                            <div className='bg-white rounded-lg shadow border px-4 py-6'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">ความชื้น (Humidity)</h2>

                                {/* Custom Legend */}
                                <div className="flex items-center gap-6 justify-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-[#38bdf8] block rounded-sm" />
                                        <span className="text-sm text-gray-700">Min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-blue-500 block rounded-sm" />
                                        <span className="text-sm text-gray-700">Max</span>
                                    </div>
                                </div>

                                <div className='w-full h-[500px]'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={paddedGraphData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
                                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                interval={0}
                                                label={{ value: 'DATE', position: 'outsideBottom', dy: 20, dx: -25, fontSize: 13 }}
                                                tickLine={false}
                                                tick={<CustomTick />}
                                            />
                                            <YAxis
                                                label={{ value: '°H', angle: -90, position: 'outsideLeft', offset: 0, dx: -20 }}
                                                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                interval={0}
                                                tick={{ fontSize: 16 }}
                                                domain={[-1, 11]}
                                            />
                                            {[55, 45].map(y => (
                                                <ReferenceLine key={y} y={y} stroke="gray" strokeDasharray="0 0" strokeWidth={0.1} />
                                            ))}
                                            {sortedControl.map((y, i) => (
                                                <ReferenceLine
                                                    key={i}
                                                    y={y}
                                                    stroke={i === 0 || i === 4 ? "red" : i === 2 ? "black" : "#FFD700"}
                                                    strokeDasharray={i === 2 ? "10 10" : i % 2 === 0 ? "7 7" : "5 10"}
                                                    strokeWidth={0.5}
                                                />
                                            ))}
                                            <Line type="monotone" dataKey="min" stroke="#38bdf8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="max" stroke="blue" strokeWidth={2} />

                                            <ReferenceLine y={sortedControl[0]} stroke="red" strokeDasharray="7 7" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[1]} stroke="#FFD700" strokeDasharray="5 10" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[2]} stroke="black" strokeDasharray="10 10" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[3]} stroke="#FFD700" strokeDasharray="7 7" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[4]} stroke="red" strokeDasharray="7 7" strokeWidth={0.5} />


                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );




    const renderGraphFridge = () => (
        <>
            {graphData.length > 0 && (
                <div className='fixed inset-0 flex flex-col bg-white z-50 2xl:z-20 overflow-y-auto'>
                    <div className='flex flex-col w-full flex-1 justify-center items-center p-6 gap-6'>
                        <div className='top-20 z-30 w-full flex flex-wrap justify-between items-center gap-4 px-4 sm:px-6 md:px-10 py-4'>
                            <button
                                className="bg-blue-800 hover:bg-blue-500 text-white font-semibold py-2 px-4 sm:px-6 rounded shadow text-sm sm:text-base"
                                onClick={() => {setGraphSFridge(false); setGraphData([]); setpoint('');} }
                            >
                                ← กลับไปดูแผนที่
                            </button>

                            <div className='text-white bg-gradient-to-r from-sky-600 via-blue-700 to-blue-900 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xl sm:text-2xl md:text-3xl font-kanit tracking-wide shadow-md text-center'>
                                FRIDGE : {point}
                            </div>
                        </div>
                        {/* Graph Section */}
                        <div className='w-full flex flex-col gap-6'>
                            {/* Humidity */}
                            <div className='bg-white rounded-lg shadow border px-4 py-6'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">อุณหภูมิ (Temperature)</h2>

                                {/* Custom Legend */}
                                <div className="flex items-center gap-6 justify-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-[#38bdf8] block rounded-sm" />
                                        <span className="text-sm text-gray-700">Min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-blue-500 block rounded-sm" />
                                        <span className="text-sm text-gray-700">Max</span>
                                    </div>
                                </div>

                                <div className='w-full h-[500px]'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={paddedGraphData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
                                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                interval={0}
                                                label={{ value: 'DATE', position: 'outsideBottom', dy: 20, dx: -25, fontSize: 13 }}
                                                tickLine={false}
                                                tick={<CustomTick />}
                                            />
                                            <YAxis
                                                label={{ value: '°C', angle: -90, position: 'outsideLeft', dx: -20 }}
                                                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                tick={{ fontSize: 16 }}
                                                domain={[-1, 11]}
                                            />
                                            {[55, 45].map(y => (
                                                <ReferenceLine key={y} y={y} stroke="gray" strokeDasharray="0 0" strokeWidth={0.1} />
                                            ))}
                                            {sortedControl.map((y, i) => (
                                                <ReferenceLine
                                                    key={i}
                                                    y={y}
                                                    stroke={i === 0 || i === 4 ? "red" : i === 2 ? "black" : "#FFD700"}
                                                    strokeDasharray={i === 2 ? "10 10" : i % 2 === 0 ? "7 7" : "5 10"}
                                                    strokeWidth={0.5}
                                                />
                                            ))}
                                            <Line type="monotone" dataKey="min" stroke="#38bdf8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="max" stroke="blue" strokeWidth={2} />

                                            <ReferenceLine y={sortedControl[0]} stroke="red" strokeDasharray="7 7" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[1]} stroke="#FFD700" strokeDasharray="5 10" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[2]} stroke="black" strokeDasharray="10 10" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[3]} stroke="#FFD700" strokeDasharray="7 7" strokeWidth={0.5} />
                                            <ReferenceLine y={sortedControl[4]} stroke="red" strokeDasharray="7 7" strokeWidth={0.5} />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );


    const renderGraphRoom = () => (
        <>
            {graphDataH.length > 0 && (
                <div className='fixed bg-white z-50 2xl:z-20 w-full h-full '>
                    {/* Top Bar */}
                    <div className='fixed top-25 z-30 w-full flex flex-wrap justify-between items-center px-10 py-4'>
                        <button
                            className="bg-blue-800 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow"
                            onClick={() => {setGraphRoom(false); setGraphDataH([]); setGraphDataT([]); setpoint('');} }
                        >
                            ← กลับไปดูแผนที่
                        </button>

                        <div className='text-white bg-gradient-to-r from-sky-600 via-blue-700 to-blue-900 px-6 py-3 rounded-lg text-3xl font-kanit tracking-wide shadow-md'>
                            POINT: {point}
                        </div>
                    </div>
                    <div className=' w-full gap-2 justify-start items-center mt-15'>
                        {/* Graph Section */}
                        <div className='w-full flex flex-col gap-6'>
                            {/* Temperature */}
                            <div className='bg-white rounded-lg shadow border px-4 py-6 mt-10'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">อุณหภูมิ (Temperature)</h2>

                                {/* Custom Legend */}
                                <div className="flex items-center gap-6 justify-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-[#38bdf8] block rounded-sm" />
                                        <span className="text-sm text-gray-700">Min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-blue-500 block rounded-sm" />
                                        <span className="text-sm text-gray-700">Max</span>
                                    </div>
                                </div>

                                <div className='w-full h-[280px]'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={paddedGraphDataT} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                interval={0}
                                                label={{ value: 'DATE', position: 'outsideBottom', dy: 20, dx: -25, fontSize: 13 }}
                                                tickLine={false}
                                                tick={<CustomTick />}
                                            />
                                            <YAxis
                                                label={{ value: '°C', angle: -90, position: 'outsideLeft', dx: -20 }}
                                                ticks={[20, 21, 25, 29, 30]}
                                                tick={{ fontSize: 14 }}
                                                domain={[19, 31]}
                                            />
                                            {[31, 28, 27, 26, 24, 23, 22, 21, 35, 15].map(y => (
                                                <ReferenceLine key={y} y={y} stroke="gray" strokeDasharray="0 0" strokeWidth={0.1} />
                                            ))}
                                            {sortedControlT.map((y, i) => (
                                                <ReferenceLine
                                                    key={i}
                                                    y={y}
                                                    stroke={i === 0 || i === 4 ? "red" : i === 2 ? "black" : "#FFD700"}
                                                    strokeDasharray={i === 2 ? "10 10" : i % 2 === 0 ? "7 7" : "5 10"}
                                                    strokeWidth={0.5}
                                                />
                                            ))}
                                            <Line type="monotone" dataKey="min" stroke="#38bdf8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="max" stroke="blue" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Humidity */}
                            <div className='bg-white rounded-lg shadow border px-4 py-6'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">ความชื้น (Humidity)</h2>

                                {/* Custom Legend */}
                                <div className="flex items-center gap-6 justify-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-[#38bdf8] block rounded-sm" />
                                        <span className="text-sm text-gray-700">Min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-2 bg-blue-500 block rounded-sm" />
                                        <span className="text-sm text-gray-700">Max</span>
                                    </div>
                                </div>

                                <div className='w-full h-[280px]'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={paddedGraphDataH} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                interval={0}
                                                label={{ value: 'DATE', position: 'outsideBottom', dy: 20, dx: -25, fontSize: 13 }}
                                                tickLine={false}
                                                tick={<CustomTick />}
                                            />
                                            <YAxis
                                                label={{ value: '%H', angle: -90, position: 'outsideLeft', dx: -20 }}
                                                ticks={[30, 40, 50, 60, 70]}
                                                tick={{ fontSize: 14 }}
                                                domain={[25, 75]}
                                            />
                                            {[55, 45].map(y => (
                                                <ReferenceLine key={y} y={y} stroke="gray" strokeDasharray="0 0" strokeWidth={0.1} />
                                            ))}
                                            {sortedControlH.map((y, i) => (
                                                <ReferenceLine
                                                    key={i}
                                                    y={y}
                                                    stroke={i === 0 || i === 4 ? "red" : i === 2 ? "black" : "#FFD700"}
                                                    strokeDasharray={i === 2 ? "10 10" : i % 2 === 0 ? "7 7" : "5 10"}
                                                    strokeWidth={0.5}
                                                />
                                            ))}
                                            <Line type="monotone" dataKey="min" stroke="#38bdf8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="max" stroke="blue" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
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
                    src="/images/production1.png"
                    alt="Production1"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => {
                    handleClickGraphRoom('SMT-13')
                    setpoint('1')
                }}
                    className="absolute top-[6%] right-[41%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div
                    onClick={() => {
                        handleClickGraphRoom('SMT-12')
                        setpoint('2')
                    }}
                    className="absolute bottom-[4%] right-[43.5%] w-12 h-12 z-10">
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
                    src="/images/production2.png"
                    alt="Production2"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => {
                    handleClickGraphRoom('Laser')
                    setpoint('1')
                }}
                    className="absolute top-[7%] right-[43%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div onClick={() => {
                    handleClickGraphRoom('SMT-6')
                    setpoint('2')
                }}
                    className="absolute bottom-[5%] right-[43%] w-12 h-12 z-10">
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
                    src="/images/production3.png"
                    alt="Production3"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => {
                    handleClickGraphRoom('After')
                    setpoint('1')

                }}
                    className="absolute top-[6%] right-[60%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>
                <div onClick={() => {
                    handleClickGraphRoom('Qa Consumer')
                    setpoint('2')
                }}
                    className="absolute bottom-[4%] left-[30%] w-12 h-12 z-10">
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
                    src="/images/production4.png"
                    alt="Production4"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />

                <div onClick={() => {
                    handleClickGraphRoom('Qa Automotive1')
                    setpoint('1')
                }}
                    className="absolute top-[5.5%] right-[28%] w-12 h-12 z-10">
                    {Riple_effect()}
                </div>

                <div onClick={() => {
                    handleClickGraphRoom('Qa Automotive2')
                    setpoint('2')
                }}
                    className="absolute bottom-[4.5%] right-[30%] w-12 h-12 z-10">
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
                    src="/images/production5.png"
                    alt="Production5"
                    className="w-full h-auto lg:h-[670px] p-8 mt-2"
                />


                <div onClick={() => {
                    handleClickGraphRoom('SMT-19')
                    setpoint('CHECK')
                }}
                    className="absolute bottom-[4.5%] left-[35%] w-12 h-12 z-10">
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
            <div onClick={() => {
                handleClickGraphRoom('Automotive')
                setpoint('1')
            }}
                className="absolute bottom-[5%] right-[10%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* POINT 2*/}
            <div onClick={() => {
                handleClickGraphRoom('Consumer')
                setpoint('2')
            }}
                className="absolute bottom-[32%] right-[61%] w-12 h-12 z-10">
                {Riple_effect()}

            </div>

            {/* POINT 3*/}
            <div onClick={() => {
                handleClickGraphRoom('IQA')
                setpoint('3')
            }}
                className="absolute top-[52%] right-[49%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* Super Dry 1-2 */}
            <div onClick={() => {
                setrenderSuperDry1_2(true)
            }} className="absolute top-[19%] right-[3%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* Super Dry 3-4 */}
            <div onClick={() => { setrenderSuperDry3_4(true) }} className="absolute top-[57%] left-[3%] w-12 h-12 z-10">
                {Riple_effect()}
            </div>

            {/* Fridge 4-5-6-7-8 */}
            <div onClick={() => { setFridge4_5_6_7_8(true) }} className="absolute bottom-[5%] left-[6%] w-12 h-12 z-10 ">
                {Riple_effect()}
            </div>

            {/* Fridge 1-2-3 */}
            <div onClick={() => { setFridge1_2_3Card(true) }} className="absolute top-[6%] right-[5%] w-12 h-12 z-10 ">
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

            <div className="w-22 h-46 xl:w-34 xl:h-96 2xl:w-44 2xl:h-96 bg-gray-800 rounded-xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full z-10"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}

                </div>


                <div className="absolute top-1/3 left-0 w-full h-1/3 border-b border-blue-300 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full z-10"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}

                </div>


                <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center">
                    <div className="w-[90%] h-[85%] bg-sky-200/80 backdrop-blur-sm border border-white/50 rounded-md shadow-inner"></div>
                    <div className="absolute right-2 top-1/6 w-2 h-10 bg-blue-600 rounded-full z-10"></div>
                    <div className="absolute center top-3/6 w-[148px] h-1 bg-gray-600/30 "></div>
                    {partmsl()}


                </div>
            </div>

        </>

    );
    const SUPERDRYL = () => (
        <>
            <div className="w-22 h-46 xl:w-34 xl:h-96 2xl:w-44 2xl:h-96 bg-gray-800 rounded-xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
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

            <div className="w-22 h-46 xl:w-34 xl:h-96 2xl:w-44 2xl:h-96 bg-gray-200 rounded-xl shadow-xl border-4 border-white relative overflow-hidden ">
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

    const renderFridge1_2_3 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10 backdrop-blur-sm'>
            <div ref={Fridge1_2_3CardcheckRef} className="bg-black/50 rounded-2xl w-[40%] h-auto">
                <div className='font-bold text-2xl grid grid-cols-3 place-items-center m-5 w-auto h-[90%] group'>
                    {/* Icons */}
                    <div onClick={() => { handleClickGraphFridge('3'); setpoint('3') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px]  rounded-l-xl uppercase
                              text-sky-400 text-[12px]  xl:text-[26px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 3
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('2'); setpoint('2') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px]  uppercase
                               text-sky-400 text-[12px]  xl:text-[26px]  2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 2
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('1'); setpoint('1') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px]  rounded-r-xl uppercase
                              text-sky-400 text-[12px]  xl:text-[26px]  2xl:text-3xl font-extrabold drop-shadow-md tracking-wide  '>
                            Fridge 1
                        </div>
                        {FEEZNORMAL()}
                    </div>

                </div>
            </div>
        </div>
    );


    const renderFridge4_5_6_7_8 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10 backdrop-blur-sm'>
            <div ref={Fridge4_5_6_7_8CardCheckRef} className="bg-black/50 rounded-2xl w-[70%] h-auto">
                <div className='font-bold text-2xl grid grid-cols-5 place-items-center m-5 w-auto h-[90%] group'>
                    {/* Icons */}
                    <div onClick={() => { handleClickGraphFridge('4'); setpoint('4') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px]  uppercase text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 4
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('5'); setpoint('5') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px] uppercase text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 5
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('6'); setpoint('6') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px] uppercase text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 6
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('7'); setpoint('7') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>

                        <div className='flex items-center justify-center w-full p-[20px]  uppercase text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 7
                        </div>
                        {FEEZNORMAL()}
                    </div>
                    <div onClick={() => { handleClickGraphFridge('8'); setpoint('8') }}
                        className='flex flex-col items-center justify-center w-full mt-[20px] transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                        <div className='flex items-center justify-center w-full p-[20px]  uppercase text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide '>
                            Fridge 8
                        </div>
                        {FEEZNORMAL()}
                    </div>

                </div>
            </div>
        </div>
    );




    const renderSuperDry1_2 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10 backdrop-blur-sm'>
            <div ref={cardSuper1_2Ref} className="bg-black/50 rounded-2xl w-[40%] h-auto ">
                <div className='font-bold text-2xl grid grid-cols-2 place-items-center m-5 w-auto h-[90%]'>

                    {/* Group Wrapper */}
                    <div className="col-span-2 grid grid-cols-2 gap-2 w-full group">

                        {/* Box 1 */}
                        <div onClick={() => {
                            handleClickGraphDry('1');
                            setpoint('1')
                        }} className='flex flex-col items-center justify-center w-full p-[20px]  rounded-l-xl
                                   transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                            <div className="text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide">
                                SUPER DRY 1
                            </div>

                            <div className='mt-[20px] flex justify-end w-full'>
                                {SUPERDRYR()}
                                {SUPERDRYL()}
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div onClick={() => {
                            handleClickGraphDry('2');
                            setpoint('2')
                        }}
                            className='flex flex-col items-center justify-center w-full p-[20px]  rounded-r-xl
                                   transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                            <div className="text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide">
                                SUPER DRY 2
                            </div>
                            <div className='mt-[20px] flex justify-start w-full'>
                                {SUPERDRYR()}
                                {SUPERDRYL()}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );


    const renderSuperDry3_4 = () => (
        <div className='fixed flex w-full h-full justify-center items-center z-10 backdrop-blur-sm'>
            <div ref={cardSuper3_4Ref} className="bg-black/50 rounded-2xl w-[60%] h-auto ">

                <div className='font-bold text-2xl grid grid-cols-2 place-items-center m-5 '>

                    {/* Group Wrapper */}
                    <div className="col-span-3 grid grid-cols-3 gap-2 group">

                        {/* Box 1 */}
                        <div onClick={() => {
                            handleClickGraphDry('3');
                            setpoint('3')
                        }}
                            className='flex flex-col items-center justify-center w-full h-auto p-[20px]  rounded-l-xl 
                                   transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                            <div className="text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide ">SUPER DRY 3</div>
                            <div className='mt-[20px] flex justify-center w-full'>
                                {SUPERDRYR()}
                                {SUPERDRYL()}
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div onClick={() => {
                            handleClickGraphDry('4');
                            setpoint('4')
                        }}
                            className='flex flex-col items-center justify-center w-full h-auto p-[20px]  rounded-r-xl 
                                   transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                            <div className="text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide">SUPER DRY 4</div>
                            <div className='mt-[20px] flex justify-center w-full'>
                                {SUPERDRYR()}
                                {SUPERDRYL()}
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div onClick={() => {
                            handleClickGraphFridge('9');
                            setpoint('9')
                        }} className='flex flex-col items-center justify-center w-full h-auto p-[20px]  uppercase rounded-r-xl 
                                   transition-all duration-300 hover:scale-105 group-hover:opacity-50 hover:!opacity-100'>
                            <div className='text-sky-400 text-[12px]  xl:text-[28px] 2xl:text-3xl font-extrabold drop-shadow-md tracking-wide'>Fridge 9</div>
                            <div className='mt-[20px] flex justify-center w-full'>
                                {FEEZNORMAL()}
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );



    return (
        <div className='flex flex-col bg-white w-full h-screen'>
            <Suspense fallback={<div>Loading...</div>}>
                <ParamListener onGetParam={setParam} />
            </Suspense>
            {/* Header ใหม่ */}
            <header className="fixed w-full bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl px-10 mt-22 py-4 z-11">
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
                    {state === 'mapnone' && renderMapnone()}
                    {state === 'mapProduction1' && renderMapProduction1()}
                    {state === 'mapProduction2' && renderMapProduction2()}
                    {state === 'mapProduction3' && renderMapProduction3()}
                    {state === 'mapProduction4' && renderMapProduction4()}
                    {state === 'mapProduction5' && renderMapProduction5()}
                    {state === 'mapWarehouse' && renderMapWarehouse()}
                </div>
            </div>
            {/* renderALLCard */}
            {showAlert && renderalert()}
            {GraphRoom && renderGraphRoom()}
            {GraphSuperD && renderGraphSuperDry()}
            {GraphFridge && renderGraphFridge()}
            {Fridge1_2_3Card && renderFridge1_2_3()}
            {Fridge4_5_6_7_8Card && renderFridge4_5_6_7_8()}
            {renderSuperDry1_2Card && renderSuperDry1_2()}
            {renderSuperDry3_4Card && renderSuperDry3_4()}
        </div>

    );
}

