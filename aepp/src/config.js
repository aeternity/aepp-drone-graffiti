const API_URL = 'https://backend.dronegraffiti.com'
// const API_URL = 'http://localhost:3000';
// const API_URL = 'http://192.168.43.131:3000';

export default {
  // HARDCODED SETTINGS
  imageSettings: {
    max: { width: 1000, height: 1000 },
    min: { width: 400, height: 300 }
  },
  canvas: {
    url: API_URL + '/rendered/latest.png',
    width: 3300,
    height: 5000,
    pixelToMM: 10, // Pixel * pixelToMM = mm
  },
  droneSettings: {
    wallId: 'MX19-001',
    gpsLocation: [0, 0],
    wallSize: [33000, 50000],   // in mm
    canvasSize: [33000, 50000], // mm
    canvasPosition: [0, 0], // mm (origin = [bottom left])
    colors: ['#000000', '#eb340f', '#0f71eb'], // default [#000]
    droneResolution: 200,       // min distance drone can move, in mm
    dronePrecisionError: 150,   // error margin, mm
    droneFlyingSpeed: 0.3,  // average drone flying speed [m/s],
    minimumImageSize: [10, 10]
  },
  blockchainSettings: {
    contractAddress: 'ct_2U9MkZK9JXTUemAURfCd8BDQZcXK4Gk8Hwfqxf1ASSYNrQnhjz'
  },
  apiUrl: API_URL
}
