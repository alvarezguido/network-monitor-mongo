collect ();

function collect () {
  fetch('get_data_json')
  .then(response => response.json())
  .then(function(data){
  
    var x = [];
    var y = [];
    var select = document.getElementById("unit");
    var unit = select.options[select.selectedIndex].value;
    var unit_text = select.options[select.selectedIndex].text;
    data.forEach(function(valor){
      x.push(valor.x);
      y.push(valor.y/unit);

      return (x,y)
    })
    console.log(x)
    console.log(y)

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Traffic in '+unit_text,
                data: y,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

  })
  .catch(err => console.log("Request failed",err))
}
