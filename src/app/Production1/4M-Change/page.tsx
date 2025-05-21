import ProcessTable from './4M-compo/page';

const sampleData = {
  "Id": 1,
  "Date": "2025-05-20T00:00:00.000Z",
  "Line": "Kyocera",
  "Shift": "A/D",
  "Process1": "Rom Write No.1",
  "Process2": "Rom Write No.2",
  "Process3": "Rom Write No.3",
  "Process4": "Router No.1",
  "Process5": "Router No.2",
  "Process6": "Router No.3",
  "Process7": "Image Checker No.1",
  "Process8": "Image Checker No.2",
  "Process9": "Image Checker No.3",
  "Process10": "Image Checker No.4",
  "Process11": "Image Checker No.5",
  "Process12": "Image Checker No.6",
  "Process13": "Hold Drilling",
  "Process14": "Rom write function test",
  "AM1": "1287",
  "PM1": "1287",
  "AM2": "5056",
  "PM2": "",
  "AM3": "",
  "PM3": "",
  "AM4": "0506",
  "PM4": "0507",
  "AM5": "",
  "PM5": "",
  "AM6": "",
  "PM6": "",
  "AM7": "",
  "PM7": "",
  "AM8": "",
  "PM8": "",
  "AM9": "",
  "PM9": "",
  "AM10": "",
  "PM10": "",
  "AM11": "",
  "PM11": "0506",
  "AM12": "",
  "PM12": "",
  "AM13": "",
  "PM13": "",
  "AM14": "",
  "PM14": "",
  "Checked": "1287",
  "QA_Confirm": "0506"
};

export default function Page() {
  return (
    <main className="w-screen h-screen bg-amber-50 p-6 pt-40">
      <ProcessTable  data={sampleData} />
    </main>
  );
}
