function read_inputs() {
  var beds = document.getElementById("fnor").value;
  var baths = document.getElementById("fnobth").value;
  var sqft = document.getElementById("ftq").value;
  var yrbuilt = document.getElementById("fyb").value;
  var txyear = document.getElementById("fty").value;
  var insurance = document.getElementById("fi").value;

  const radioButtons = document.querySelectorAll('input[name="yes_no"]');
  let selectedSize;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedSize = radioButton.value;
      break;
    }
  }
  data = {
    beds: parseInt(beds),
    baths: parseInt(baths),
    sqft: parseInt(sqft),
    yr_built: parseInt(yrbuilt),
    txyear: parseInt(txyear),
    insurance: parseInt(insurance),
    basement: parseFloat(selectedSize),
  };

  function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 };
  
  const querystring = encodeQueryData(data);
  
  var address = "http://127.0.0.1:5000/predict?";
  
  let text2 = querystring;
  let text1 = address;
  let result = text1.concat(text2);
  

  fetch( result )
    .then( response => response.json() )
    .then( response => {

      var pricesection = document.getElementById("estimatedprice");
      pricesection.innerText = Math.round(response["price"]) + "$";
    } );

   
}
