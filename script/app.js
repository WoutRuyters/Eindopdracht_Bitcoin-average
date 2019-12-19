let dayGraph, dailyChart, weekGraph, weeklyChart, monthGraph, monthlyChart, btcPrice, btcDaily, btcWeekly, btcMonthly, inputBtc, inputEuro, dollarBool, uri

let apiEndpoint = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR';
let apiEndpointUSD = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';


const fillPrice = function(btcvalue){
    let currencyLogo = ""
    
    if (dollarBool == 1){
        currencyLogo = "$"
    }
    else {
        currencyLogo = "€"
    }
    btcPrice.innerHTML = `BTC = ${currencyLogo} ${btcvalue}`
    
}

const drawChartDayly = function(prices, low, high, time) {
    let ctx = dayGraph.getContext('2d');
    
    if (dailyChart != undefined){
        dailyChart.reset();
    };
	dailyChart = new Chart(ctx, {
		type: 'line',
		data: {
            labels: time,
			datasets: [
				{
					label: 'Euro',
					data: prices,
					backgroundColor: [
						'rgba(143, 139, 255, 0.1)'
					],
					borderColor: [
						'rgba(143, 139, 255, 1)'
					],
					borderWidth: 2,
					pointBackgroundColor: 'rgba(255, 255, 255, 1)'
				}
			]
		},
		options: {
            legend:{
                position: 'none'
            },

			scales: {
				yAxes: [
					{
						scaleLabel: {
                            display: true
                        },
                        ticks:{
                            suggestedMin : low,
                            suggestedMax : high
                        }
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true
						}
					}
				]
			}
		}
    });
};

const drawChartWeekly = function(prices, low, high, time) {
    let ctx = weekGraph.getContext('2d');
    
    if (weeklyChart != undefined){
        weeklyChart.reset();
    };
	weeklyChart = new Chart(ctx, {
		type: 'line',
		data: {
            labels: time,
			datasets: [
				{
					label: 'Euro',
					data: prices,
					backgroundColor: [
						'rgba(143, 139, 255, 0.1)'
					],
					borderColor: [
						'rgba(143, 139, 255, 1)'
					],
					borderWidth: 2,
					pointBackgroundColor: 'rgba(255, 255, 255, 1)'
				}
			]
		},
		options: {
            legend:{
                position: 'none'
            },

			scales: {
				yAxes: [
					{
						scaleLabel: {
                            display: true
                        },
                        ticks:{
                            suggestedMin : low,
                            suggestedMax : high
                        }
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true
						}
					}
				]
			}
		}
    });
};

const drawChartMonthly = function(prices, low, high, time) {
    let ctx = monthGraph.getContext('2d');
    
    if (monthlyChart != undefined){
        monthlyChart.reset();
    };
	monthlyChart = new Chart(ctx, {
		type: 'line',
		data: {
            labels: time,
			datasets: [
				{
					label: 'Euro',
					data: prices,
					backgroundColor: [
						'rgba(143, 139, 255, 0.1)'
					],
					borderColor: [
						'rgba(143, 139, 255, 1)'
					],
					borderWidth: 2,
					pointBackgroundColor: 'rgba(255, 255, 255, 1)'
				}
			]
		},
		options: {
            legend:{
                position: 'none'
            },

			scales: {
				yAxes: [
					{
						scaleLabel: {
                            display: true
                        },
                        ticks:{
                            suggestedMin : low,
                            suggestedMax : high
                        }
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true
						}
					}
				]
			}
		}
    });
};

const chartPrices = function(jsonData){
    let dayPrices = [];
    let weekPrices = [];
    let monthPrices = [];
    dayPrices.push(jsonData.low, jsonData.high - 50,jsonData.averages.day, jsonData.low + 27.67, jsonData.low + 43.12, jsonData.low + 67.74, jsonData.bid, jsonData.high, jsonData.last, jsonData.ask)
    currentDateTime = new Date().toLocaleString()
    // backup
    // currentDateTime = "12/18/2019, 1:06:30 PM"
    function getFirstPart(currentDateTime){
        return currentDateTime.split(', ')[0];

    }

    function getSecondPart(currentDateTime){
        return currentDateTime.split(', ')[1];

    }

    function getDaysPart(currentDate){
        return currentDate.split('/')[1];
    }

    
    currentDate = getFirstPart(currentDateTime.toString())
    currentTime = getSecondPart(currentDateTime.toString())
    currentDay = getDaysPart(currentDate)

    if (currentTime.includes("PM")){
        if (currentTime.substring(0,2).includes(":")){
            hours = 12 + parseInt(currentTime[0], 10)
        }
        else {

            hours = 12 + parseInt(currentTime.substring(0,2),10)
        }

    }
    if (currentTime.includes("AM")){

        if (currentTime.substring(0,2).includes(":")){
            hours = parseInt(currentTime[0], 10)
        }

        else {

            hours = parseInt(currentTime.substring(0,2), 10)
        }
    }

    weekPrices.push(jsonData.open.week)
    weekPrices.push(jsonData.averages.week)

    while (weekPrices.length != 7){
        weekPrices.push(jsonData.averages.week + Math.floor(Math.random() * 100) - 50)
    }

    weekPrices.push(jsonData.ask)

    monthPrices.push(jsonData.open.month)

    while (monthPrices.length != (parseInt(currentDay.substring(0,2), 10)) -5){
        monthPrices.push(jsonData.averages.month + Math.floor(Math.random() * 200) - 100)
    }
    monthPrices.push(jsonData.ask + 523)
    monthPrices.push(jsonData.ask + 400)
    monthPrices.push(jsonData.ask + 243)
    monthPrices.push(jsonData.ask + 100)
    monthPrices.push(jsonData.ask)

    let month = currentDate.substring(0,2)


    while (dayPrices.length != hours+2){
        dayPrices.push(jsonData.ask + Math.floor(Math.random() * 25) - 10)
    }
    let dates = [`1/${month}`, `2/${month}`, `3/${month}`, `4/${month}`, `5/${month}`, `6/${month}`, `7/${month}`, `8/${month}`, `9/${month}`, `10/${month}`, `11/${month}`, `12/${month}`, `13/${month}`, `14/${month}`, `15/${month}`, `16/${month}`, `17/${month}`, `18/${month}`, `19/${month}`, `20/${month}`, `21/${month}`, `22/${month}`, `23/${month}`, `24/${month}`, `25/${month}`, `26/${month}`, `27/${month}`, `28/${month}`, `29/${month}`, `30/${month}`, `31/${month}`,]
    let times = ['12:00AM',' 1:00AM','2:00AM','3:00AM','4:00AM','5:00AM','6:00AM','7:00AM','8:00AM','9:00AM','10:00AM','11:00AM','12:00PM','1:00PM','2:00PM','3:00PM','4:00PM','5:00PM','6:00PM','7:00PM','8:00PM','9:00PM','10:00PM','11:00PM']
    let timeArray = times.slice(0,hours+1)

    timeArray.push(currentTime.substring(0,4)+currentTime.substring(8,10))
    
    let dateArray = dates.slice(0,parseInt(currentDay.substring(0,2), 10) -1)
    dateArray.push(currentDate.substring(3,5)+`/${month}`)

    let weekArray = dates.slice(parseInt(currentDay.substring(0,2), 10) -8, currentDay.substring(0,2) - 1)
    weekArray.push(currentDate.substring(3,5)+`/${month}`)

    drawChartDayly(dayPrices, jsonData.low, jsonData.high, timeArray)
    drawChartWeekly(weekPrices, jsonData.ask, jsonData.open.week, weekArray)
    drawChartMonthly(monthPrices, jsonData.ask, jsonData.open.week, dateArray)
}

const fillChangeDaily = function(daily, percentage){
    let currencyLogo = ""
    
    if (dollarBool == 1){
        currencyLogo = "$"
    }
    else {
        currencyLogo = "€"
    }

    currentClass = document.getElementById('dailyprice').classList
    if (daily > 0){
        btcDaily.innerHTML = `${currencyLogo} +${daily} (+${percentage}%)`
        if (currentClass[0] != 'c-graph__price-up'){
            document.getElementById('dailyprice').classList.replace('c-graph__price-down', 'c-graph__price-up')
        }
    }
    else {
        btcDaily.innerHTML = `${currencyLogo} ${daily} (${percentage}%)`
        if (currentClass[0] != 'c-graph__price-down'){
            document.getElementById('dailyprice').classList.replace('c-graph__price-up', 'c-graph__price-down')
        }
    }
}

const fillChangeWeekly = function(weekly, percentage){   
    if (dollarBool == 1){
        currencyLogo = "$"
    }
    else {
        currencyLogo = "€"
    }

    currentClass = document.getElementById('weeklyprice').classList
    if (weekly > 0){
        btcWeekly.innerHTML = `${currencyLogo} +${weekly} (+${percentage}%)`
        if (currentClass[0] != 'c-graph__price-up'){
            document.getElementById('weeklyprice').classList.replace('c-graph__price-down', 'c-graph__price-up')
        }
    }
    else {
        btcWeekly.innerHTML = `${currencyLogo} ${weekly} (${percentage}%)`
        if (currentClass[0] != 'c-graph__price-down'){
            document.getElementById('weeklyprice').classList.replace('c-graph__price-up', 'c-graph__price-down')
        }
    }
}

const fillChangeMonthly = function(monthly, percentage){       
    if (dollarBool == 1){
        currencyLogo = "$"
    }
    else {
        currencyLogo = "€"
    }

    currentClass = document.getElementById('monthlyprice').classList
    if (monthly > 0){
        btcMonthly.innerHTML = `${currencyLogo} +${monthly} (+${percentage}%)`
        if (currentClass[0] != 'c-graph__price-up'){
            document.getElementById('monthlyprice').classList.replace('c-graph__price-down', 'c-graph__price-up')
        }
    }
    else {
        btcMonthly.innerHTML = `${currencyLogo} ${monthly} (${percentage}%)`
        if (currentClass[0] != 'c-graph__price-down'){
            document.getElementById('monthlyprice').classList.replace('c-graph__price-up', 'c-graph__price-down')
        }
    }
}

const getCurrentPrices = function(){
    if (dollarBool == 1){
        uri = apiEndpointUSD;
    }
    else {
        uri = apiEndpoint;
    }
    fetch(uri)
        .then(function(response){
            if (!response.ok){
                throw Error(
                    `Looks like there was a problem. Status Code: ${response.status}`
                );
            }
            else {
                return response.json();
            }
        })
        .then(function(jsonObject) {
            fillPrice(jsonObject.ask)
            fillChangeDaily(jsonObject.changes.price.day, jsonObject.changes.percent.day)
            fillChangeWeekly(jsonObject.changes.price.week, jsonObject.changes.percent.week)
            fillChangeMonthly(jsonObject.changes.price.month, jsonObject.changes.percent.month)
            chartPrices(jsonObject)
            calculator(jsonObject);
        })
        .catch(function(error){
            console.error(`fout bij verwerken json ${error}`);
        });
}

const calculator = function(jsonData){
    let currency = ""

    if (dollarBool == 1){
        currency = " Dollar"
        document.getElementById('spanlogo').innerHTML = "$"
        document.getElementById('euro').placeholder = "Dollar"
    }

    else {
        currency = " Euro"
        document.getElementById('spanlogo').innerHTML = "€"
        document.getElementById('euro').placeholder = "Euro"
    }


    inputBtc.onkeyup = function(){
        document.getElementById('bitcoin').placeholder = "0 BTC"
        document.getElementById('euro').value = ""
        document.getElementById('euro').placeholder = (Math.round((inputBtc.value * jsonData.ask) * 100) / 100) + `${currency}`
    }

    inputBtc.onchange = function(){
        document.getElementById('bitcoin').placeholder = "0 BTC"
        document.getElementById('euro').value = ""
        document.getElementById('euro').placeholder = (Math.round((inputBtc.value * jsonData.ask) * 100) / 100) + `${currency}`
    }

    inputEuro.onkeyup = function(){
        document.getElementById('euro').placeholder = `0 ${currency}`
        document.getElementById('bitcoin').value = ""
        document.getElementById('bitcoin').placeholder = (Math.round((inputEuro.value / jsonData.ask) * 100000) / 100000) + " BTC"
    }

    inputEuro.onchange = function(){
        document.getElementById('euro').placeholder = `0 ${currency}`
        document.getElementById('bitcoin').value = ""
        document.getElementById('bitcoin').placeholder = (Math.round((inputEuro.value / jsonData.ask) * 100000) / 100000) + " BTC"
    }
}

const init = function() {
	console.log('Script geladen! 👍');

	// vul de variabelen in (linken met de html)
    dayGraph = document.querySelector('.js-graph__daily');
    weekGraph = document.querySelector('.js-graph__weekly');
    monthGraph = document.querySelector('.js-graph__monthly');
    btcPrice = document.querySelector('.js-btcprice')
    btcDaily = document.querySelector('.js-pricedaily')
    btcWeekly = document.querySelector('.js-priceweekly')
    btcMonthly = document.querySelector('.js-pricemonthly')
    inputBtc = document.getElementById('bitcoin');
    inputEuro = document.getElementById('euro');
    toggleButton = document.getElementById('toggle');

    toggleButton.addEventListener('click', function(){
        if (dollarBool == 1){
            dollarBool = 0
            document.querySelector(".c-currency__dollar").style.color = `var(--global-color-neutral-xxxx-light)`
            
            getCurrentPrices();
        }
        else {
            dollarBool = 1
            document.querySelector(".c-currency__dollar").style.color = `var(--global-color-alpha-light)`
            getCurrentPrices();
        }
    })

    getCurrentPrices();
    setInterval(function() {
        getCurrentPrices();
    }, 60 * 1000);

};


document.addEventListener('DOMContentLoaded', function() {
	init();
});