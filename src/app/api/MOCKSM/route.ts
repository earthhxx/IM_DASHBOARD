const isMock = true;

const fetchSkillMatrix = async () => {
  if (isMock) {
    return [
      {
        room: 'PRODUCTION1',
        team: 'A',
        department: 'Production',
        location: 'SMT-1',
        base64Pdf: 'data:application/pdf;base64,JVBERi0xLjMKJc...'
      },
      {
        room: 'PRODUCTION2',
        team: 'A',
        department: 'Production',
        location: 'SMT-2',
        base64Pdf: 'data:application/pdf;base64,JVBERi0xLjQKJc...'
      }
    ];
  } else {
    const res = await fetch('/api/your-api-endpoint?S_team=Alpha&S_room=A');
    const json = await res.json();
    return json.data;
  }
};
