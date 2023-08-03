document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

let dataPlot, dataPlot1, dataArray;
const ctx = document.getElementById('myChart');
const ctx1 = document.getElementById('myChart1');
let dNumCell = document.getElementById("dNum");
let fNumCell = document.getElementById("fNum");
let dRatioCell = document.getElementById("dRatio");
let fRatioCell = document.getElementById("fRatio");

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const contents = event.target.result;
      dataArray = parseCSV(contents);
      let dsAndFs = splitDsFs(dataArray);

      console.log("hellos");
      console.log(dsAndFs);
      // Do something with the dataArray (e.g., display it, manipulate it, etc.)
      // console.log(dataArray);
      dataPlot = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dsAndFs.Ds.data,
          datasets: [{
            label: 'Dysfluent',
            data: dsAndFs.Ds.data,
            borderWidth: 1,
            borderColor: "#3e95cd"
          }]
        },
        options: {
          tension: 0.4,
          animation: {
            duration: 0
          }
          // scales: {
          //     y: {
          //     beginAtZero: true
          //     }
          // }
        }
      });

      dataPlot1 = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: dsAndFs.Fs.data,
          datasets: [{
            label: 'Fluent',
            data: dsAndFs.Fs.data,
            borderWidth: 1,
            borderColor: "#3e95cd"
          }]
        },
        options: {
          tension: 0.4,
          animation: {
            duration: 0
          }
          // scales: {
          //     y: {
          //     beginAtZero: true
          //     }
          // }
        }
      });

      const numsAndRatios = getNumsAndRatios(dsAndFs);
      dNumCell.innerText = numsAndRatios.numOfDs;
      fNumCell.innerText = numsAndRatios.numOfFs;
      dRatioCell.innerText = numsAndRatios.dRatio;
      fRatioCell.innerText = numsAndRatios.fRatio;

    };




    reader.readAsText(file);
  }
}

function parseCSV(csvData) {
  const lines = csvData.split('\r\n');
  const dataArray = [];

  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(',');
    dataArray.push(cells)
  }

  return dataArray;
}

function splitDsFs(dataArray) {
  const Ds = { data: [], labels: [] };
  const Fs = { data: [], labels: [] };

  for (let i = 0; i < dataArray.length; i += 2) {
    if (i !== dataArray.length - 1) {
      if (dataArray[i][1] == "D") {
        //  Ds.data.push(dataArray[i + 1][0] - dataArray[i][0]);
        Ds.data.push(Math.round((dataArray[i + 1][0] - dataArray[i][0]) * 100) / 100);
        Ds.labels.push(dataArray[i][1]);
      }

      if (dataArray[i][1] == "F") {
        Fs.data.push(Math.round((dataArray[i + 1][0] - dataArray[i][0]) * 100) / 100);
        Fs.labels.push(dataArray[i][1]);
      }
    }
  }
  Ds.data.sort();
  Fs.data.sort();
  return { Ds, Fs }
}

function getNumsAndRatios(dsAndFs) {
  const numOfDs = dsAndFs.Ds.labels.length;
  console.log("num of Ds: " + numOfDs);
  const numOfFs = dsAndFs.Fs.labels.length;
  console.log("num of Fs: " + numOfFs);
  let dRatio = (numOfDs * 100) / (numOfDs + numOfFs);
  let fRatio = (numOfFs * 100) / (numOfDs + numOfFs);
  dRatio = Math.round(dRatio * 100) / 100
  fRatio = Math.floor(fRatio * 100) / 100;

  return { numOfDs, numOfFs, dRatio, fRatio };
}

