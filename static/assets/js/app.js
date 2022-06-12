function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
 
  function getAreaValue() {
    var uiArea = document.getElementsByName("uiArea");
    for(var i in uiArea) {
      if(uiArea[i].checked) {
          return uiArea[i].value;
      }
    }
    return -1; // Invalid Value
  }  

  function onClickedEstimatePrice_1() {
    console.log("Estimate price button clicked");
    // var url = "http://127.0.0.1:5000/predict"; //Use this if you are NOT using heroku

    var sqft = document.getElementById("uiSqft");
    var sq = sqft.value;
    var bhk = getBHKValue();
    var area = getAreaValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var loc = location.value;
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    
    var url = "https://bang-house-price-aj.herokuapp.com/predict"; // Use this if  you are using heroku
  
    $.post(url, {
      // (bath, balcony, total_sqft_cal, room, Area, location)
      Bath: bathrooms,  
      Bal:bathrooms,
      sqft :sq,
      uiBHK :bhk,
      Area : area,
      location :loc

    },function(data, status) {
        console.log(data.price);
        estPrice.innerHTML = "<h2>" + data.price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    // var url = "http://127.0.0.1:5000/location"; // Use this if you are NOT using Heroku
    var url = "api/location"; // Use this if for Heroku
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.location;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;
