
$(document).ready(function () {

  var APIKey = "89b8547ad02b071ba91bc50d9611c36e";
  let lot;
  let lat;
  // Geting curent city position by IP adress
  function getCurentCity() {
    $.get("http://ipinfo.io", function (response) {
      let cityName = response.city
      getDataAPI(cityName);
    }, "jsonp");
  }

  // Call Wheter API for curent day wheter 
  getCurentCity();



  function getDataAPI(cityName) {
    $('#city_output').text(cityName)
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + APIKey
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {

        $('#pemperature_output_data').text(response.main.temp)
        $('#humidity_output_data').text(response.main.humidity)
        $('#windspeed_output_data').text(response.wind.speed)
        lot = response.coord.lon;
        lat = response.coord.lat;
        let uxURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lot;
        let fdURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&appid=" + APIKey;
        uxCall(uxURL);
        fiveDayForecast(fdURL);
      })


  }

  //Geting the value for UX index ussing value for lot and lat from previus API call

  function uxCall(uxURL) {
    $.ajax({
      url: uxURL,
      method: "GET"
    })
      .then(function (response) {
        $("#uw_index_output_data").text(response.value)
      })
  }
  function fiveDayForecast(fdURL) {
    $.ajax({
      url: fdURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);
        $(".card_date_1").text(response.list[3].dt_txt).attr('style', 'text-align:center')
        $(".card_date_2").text(response.list[11].dt_txt).attr('style', 'text-align:center')
        $(".card_date_3").text(response.list[19].dt_txt).attr('style', 'text-align:center')
        $(".card_date_4").text(response.list[27].dt_txt).attr('style', 'text-align:center')
        $(".card_date_5").text(response.list[35].dt_txt).attr('style', 'text-align:center')
        temp1 = ((response.list[3].main.temp - 273.15) * 1.8) + 32;
        temp2 = ((response.list[11].main.temp - 273.15) * 1.8) + 32;
        temp3 = ((response.list[19].main.temp - 273.15) * 1.8) + 32;
        temp4 = ((response.list[27].main.temp - 273.15) * 1.8) + 32;
        temp5 = ((response.list[35].main.temp - 273.15) * 1.8) + 32;
        $('.card_temp1').text("Temp:" + temp1.toFixed(2) + "℉")
        $('.card_temp2').text("Temp:" + temp2.toFixed(2) + "℉")
        $('.card_temp3').text("Temp:" + temp3.toFixed(2) + "℉")
        $('.card_temp4').text("Temp:" + temp4.toFixed(2) + "℉")
        $('.card_temp5').text("Temp:" + temp5.toFixed(2) + "℉")
        $(".card_hum1").text("Humidity:" + response.list[3].main.humidity + "%")
        $(".card_hum2").text("Humidity:" + response.list[11].main.humidity + "%")
        $(".card_hum3").text("Humidity:" + response.list[19].main.humidity + "%")
        $(".card_hum4").text("Humidity:" + response.list[27].main.humidity + "%")
        $(".card_hum5").text("Humidity:" + response.list[35].main.humidity + "%")
      })
  }
  fiveDayForecast();
  function searchCity() {
    $('#search_city_btn').on('click', (event) => {
      event.preventDefault();
      let searchCity = $('#input_search_area')
      let citys = JSON.parse(localStorage.getItem('cityListLS'))
      let citySearch = searchCity[0].value;
      if (citys) {
        if (citys.includes(searchCity[0].value)) {

        } else {
          citys.push(searchCity[0].value)
          localStorage.setItem("cityListLS", JSON.stringify(citys))
          createBtn(citySearch);
        }
      }
      else {
        localStorage.setItem("cityListLS", JSON.stringify([searchCity[0].value]))
        createBtn(citySearch);
      }

    })
  }
  searchCity();


  $(document).on('click', ".input_btn_value", function () {
    getDataAPI($(this).text());

  })

  let citys = JSON.parse(localStorage.getItem('cityListLS'))
  function createBtn(citySearch) {
    const searchArea = $('#city_output_area')
    getDataAPI(citySearch)
    let newBtn = $(`<button >${citySearch}</button>`).attr('class', 'input_btn_value').attr('style', 'display:block')
    searchArea.append(newBtn)
  }
  citys.forEach((citysNames) => createBtn(citysNames))

});















