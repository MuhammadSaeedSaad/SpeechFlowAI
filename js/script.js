document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

let dataPlot, dataObject;
const ctx = document.getElementById('myChart');

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const contents = event.target.result;
      dataObject = parseCSV(contents);
      // Do something with the dataArray (e.g., display it, manipulate it, etc.)
      // console.log(dataObject);
      dataPlot = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dataObject.labels,
          datasets: [{
            label: 'Ds and Fs',
            data: dataObject.data,
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

    };

    reader.readAsText(file);
  }
}

// function parseCSV(csvData) {
//     const lines = csvData.split('\r\n');
//     const dataArray = [];

//     for (let i = 0; i < lines.length; i++) {
//         const cells = lines[i].split(',');
//         dataArray.push(cells);
//     }

//     return dataArray;
// }

function parseCSV(csvData) {
  const lines = csvData.split('\r\n');
  const data = [];
  const labels = [];

  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(',');
    data.push(cells[0]);
    labels.push(cells[1]);
  }

  return { data, labels };
}



