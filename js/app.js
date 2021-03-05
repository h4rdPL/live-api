//current date
const date = new Date();
const year = date.getFullYear();
let month = date.getMonth();

month = month + 1;

if (month < 10) {
    month = `0${month}`;
}

let day = date.getDate();

if (day < 10) {
    day = `0${day}`;
}
// Present date
const currentDate = `${year}-${month}-${day}`;

let firstDate = "2021-01-26";

//fetching API

const URL = `https://api.exchangerate.host/timeseries?start_date=${firstDate}&end_date=${currentDate}`;

// https://fixer.io/product
fetch(URL)
    .then(res => res.json())
    .then(function (data) {

        let xAxisDateArray = [];
        let yAxisValueArray = [];
        console.log(data)
        for (const date in data.rates) {
            xAxisDateArray.push(data.rates[`${date}`].PLN);
            yAxisValueArray.push(date)
            // console.log(date)
        }
        console.log(xAxisDateArray);
        console.log(yAxisValueArray);
        // chartjs.org

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yAxisValueArray,
                datasets: [{
                    label: "Live rate API from EUR to PLN",
                    data: xAxisDateArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                        }
                    }]
                }
            }
        });
    })