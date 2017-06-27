angular.module('app.controllers', [])

.controller('tCFinancialCalculatorCtrl', ['$scope', '$stateParams','$ionicPopup','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $timeout) {
  $ionicPopup.showAlert = function() {

        var alertPopup = $ionicPopup.alert({
           title: 'Title',
           template: 'Alert message'
        });

        alertPopup.then(function(res) {
           // Custom functionality....
        });
     };

}])

//var numeral = require('numeral');
var LastActive = "PV1";

var BE1 = false;
var BE2 = false;

var PV1Val = 0;
var PM1Val = 0;
var NP1Val = 0;
var IR1Val = 0;
var FV1Val = 0;
var PV2Val = 0;
var PM2Val = 0;
var NP2Val = 0;
var IR2Val = 0;
var FV2Val = 0;

function SwitchFunc($input) {
  inputUpd($input);
  var iVal = numeral(document.getElementById($input).value).value();
  iVal = -iVal;
  document.getElementById($input).value = iVal;
  valUpd($input);
};
function SwitchAbs($int) {
  var i = $int;
  i = -i;
  return i;
}
function clearIn($input) {
  var r = confirm("Clear all values (OK) or active value (Cancel)?");
if (r == true) {
  document.getElementById("PV" + $input).value = "";
  document.getElementById("PM" + $input).value = "";
  document.getElementById("NP" + $input).value = "";
  document.getElementById("IR" + $input).value = "";
  document.getElementById("FV" + $input).value = "";
} else {
    document.getElementById(LastActive).value = "";
}

};
function calcHandle($input) {

  var str = $input;
  var int = str.substring(2,3);

  if (int == 1)
  {
    var PVval = PV1Val;
    var PMval = PM1Val;
    var NPval = NP1Val;
    var IRval = IR1Val;
    var FVval = FV1Val;
  }
  else {
    var PVval = PV2Val;
    var PMval = PM2Val;
    var NPval = NP2Val;
    var IRval = IR2Val;
    var FVval = FV2Val;
  }
  if (int == "1")
  {
      var BegVal = numeral(BE1).format("0.00");
  }
  else {
      var BegVal = numeral(BE2).format("0.00");
  }

  var inputName = $input.substring(0,3);

//running calc functions
  switch(str.substring(0,2)){
    case "PV":
      var val = PV(IRval,NPval,PMval,FVval,BegVal) || 0;
      if (int == "1")
      {
          PV1Val = val;
      }
      else {
          PV2Val = val;
      }
    break;
    case "PM":
      var val = pmt2(IRval,NPval,PVval,FVval) || 0;
      if (int == "1")
      {
          PV1Val = val;
      }
      else {
          PV2Val = val;
      }
    break;
    case "NP":
      var val = nper(IRval,PMval,PVval,FVval,BegVal) || 0;
      if (int == "1")
      {
          NP1Val = val;
      }
      else {
          NP2Val = val;
      }
    break;
    case "IR":
      var val = rate(NPval,PMval,PVval,FVval,BegVal) || 0;
      if (int == "1")
      {
          IR1Val = val;
      }
      else {
          IR2Val = val;
      }
    break;
    case "FV":
      var val = FV(IRval,NPval,PMval,PVval,BegVal) || 0;
      if (int == "1")
      {
          FV1Val = val;
      }
      else {
          FV2Val = val;
      }
    break;
  }
  if (IsNumeric(val) != 1)
  {
    alert("Appropriate values are not filled in.")
  }
  else {
    switch($input.substring(0,2)){
      case "PV":
        PV1Val = val;
        document.getElementById($input).value = numeral(val).format('$0,0.[00]');
        inpStr = inputName+"Label";
        if (val < 0) {
          document.getElementById(inpStr).innerHTML = "Loan";
        }
        else {
          document.getElementById(inpStr).innerHTML = "PV";
        }
      break;
      case "PM":
        document.getElementById($input).value = numeral(val).format('$0,0.[00]');
        inpStr = inputName+"Label";
        if (val < 0) {
          document.getElementById(inpStr).innerHTML = "Wdrl";
        }
        else {
          document.getElementById(inpStr).innerHTML = "Pmt";
        }
      break;
      case "NP":
        document.getElementById($input).value = numeral(val).format('0.[00]');
      break;
      case "IR":
        document.getElementById($input).value = numeral(inputVal/100).format('0.00%');
      break;
      default: document.getElementById($input).value = numeral(val).format('$0,0.[00]');
    }
  };
}
function inputUpd($input) {
  LastActive = $input;

  document.getElementById("PV1").value = PV1Val;
  document.getElementById("PM1").value = PM1Val;
  document.getElementById("NP1").value = NP1Val;
  document.getElementById("IR1").value = IR1Val;
  document.getElementById("FV1").value = FV1Val;

  document.getElementById("PV2").value = PV2Val;
  document.getElementById("PM2").value = PM2Val;
  document.getElementById("NP2").value = NP2Val;
  document.getElementById("IR2").value = IR2Val;
  document.getElementById("FV2").value = FV2Val;

// For switching labels for PV/Loan, Pmt/Wdrl
//if (document.getElementById($input).value > 0) {
//  switch ($input){
//    case "PV1":
//break;
//}
}
function BEToggle($input)
{
  if (($input.id).substring(2,3) == "1")
  {
    if (BE1 == false)
    {
      BE1 = true;
      document.getElementById("B1Label").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      document.getElementById("E1Label").innerHTML = "End";
    }
    else {
      BE1 = false;
      document.getElementById("B1Label").innerHTML = "Beg";
      document.getElementById("E1Label").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
  }
  else {
    if (BE2 == false)
    {
      BE2 = true;
      document.getElementById("B2Label").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      document.getElementById("E2Label").innerHTML = "End";
    }
    else {
      BE2 = false;
      document.getElementById("B2Label").innerHTML = "Beg";
      document.getElementById("E2Label").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
  }

}

function valUpd($input) {

  var inputName = $input.substring(0,3);
  var inputVal = document.getElementById($input).value;

  PV1Val = document.getElementById("PV1").value;
  PM1Val = document.getElementById("PM1").value;
  NP1Val = document.getElementById("NP1").value;
  IR1Val = document.getElementById("IR1").value;
  FV1Val = document.getElementById("FV1").value;

  PV2Val = document.getElementById("PV2").value;
  PM2Val = document.getElementById("PM2").value;
  NP2Val = document.getElementById("NP2").value;
  IR2Val = document.getElementById("IR2").value;
  FV2Val = document.getElementById("FV2").value;

      document.getElementById("PV1").value = numeral(PV1Val).format('$0,0.[00]');
      document.getElementById("PV2").value = numeral(PV2Val).format('$0,0.[00]');
      document.getElementById("PM1").value = numeral(PM1Val).format('$0,0.[00]');
      document.getElementById("PM2").value = numeral(PM2Val).format('$0,0.[00]');
      document.getElementById("NP1").value = numeral(NP1Val).format('0.[00]');
      document.getElementById("NP2").value = numeral(NP2Val).format('0.[00]');
      document.getElementById("IR1").value = numeral(IR1Val/100).format('0.00%');
      document.getElementById("IR2").value = numeral(IR2Val/100).format('0.00%');
      document.getElementById("FV1").value = numeral(FV1Val).format('$0,0.[00]');
      document.getElementById("FV2").value = numeral(FV2Val).format('$0,0.[00]');

  switch($input.substring(0,2)){
    case "PV":
      inpStr = inputName+"Label";
      if (inputVal < 0) {
        document.getElementById(inpStr).innerHTML = "Loan";
      }
      else {
        document.getElementById(inpStr).innerHTML = "PV";
      }
    break;
    case "PM":
      inpStr = inputName+"Label";
      if (inputVal < 0) {
        document.getElementById(inpStr).innerHTML = "Wdrl";
      }
      else {
        document.getElementById(inpStr).innerHTML = "Pmt";
      }
    break;
    case "NP":
      document.getElementById($input).value = numeral(inputVal).format('0.[00]');
    break;
    case "IR":
      document.getElementById($input).value = numeral(inputVal/100).format('0.00%');
    break;
    default: document.getElementById($input).value = numeral(inputVal).format('$0,0.[00]');
  }

}

function IsNumeric(val) {
    return Number(parseFloat(val))==val;
}
function barClick($input) {
  var num = ($input.id).substring(7,8);
  document.getElementById("AButton" + num).className = "button button-dark button-small button-block button-outline";
  document.getElementById("MButton" + num).className = "button button-dark button-small button-block button-outline";
  document.getElementById("SButton" + num).className = "button button-dark button-small button-block button-outline";
  document.getElementById("QButton" + num).className = "button button-dark button-small button-block button-outline";
  $input.className = "button button-dark button-small button-block";
}


function PV(rate, periods, payment, future, type) {
  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return present value
  if (rate === 0) {
    return payment * periods - future; //changed - payment to payment
  } else {
      var PVval = ((((1 - Math.pow(1 + rate, periods)) / rate) * -payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods)).toFixed(2); //changed payment to -payment
    return PVval; //conv_number(PVval,2);
  }
};

function PMT(rate, nper, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv)/nper;

  var pvif = Math.pow(1 + rate, nper);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= (1 + rate);
  };

  return pmt;//.toFixed(2);
}
function pmt2(rate, nper, pv, fv)

{
  fv = parseFloat(fv);
  nper = parseFloat(nper);
  pv = parseFloat(pv);
  per = .01;
  per = parseFloat(per);

  if (( per == 0 ) || ( nper == 0 )){

    //alert("Why do you want to test me with zeros?");

    return(0);

  }

  rate = eval((rate)/(per * 100));

  if ( rate == 0 ) // Interest rate is 0
  {
    pmt_value = - (fv - pv)/nper; // changed fv + pv to fv - pv
  }
  else
  {
    x = Math.pow(1 + rate,nper);
    pmt_value = -((rate * (fv + x * -pv))/(-1 + x)); //changed * pv to * -pv
  }
  //pmt_value = conv_number(pmt_value,2);
  return pmt_value;//round2Fixed(pmt_value);
}

function FV(rate, nper, pmt, pv)
{
  nper = parseFloat(nper);
  pmt = parseFloat(pmt);
  pv = parseFloat(pv);
  per = "0.01";
  rate = eval((rate)/(per * 100));

  if (( pmt == 0 ) || ( nper == 0 )) {
    alert("Payment or Nper value is 0.");
    return(pv);
  }

  if ( rate == 0 ) // Interest rate is 0
  {
    fv_value = -(pv - (pmt * nper)); //changed "+ (pmt" to "- (pmt"
  }
  else
  {
    x = Math.pow(1 + rate, nper);
    // y = Math.pow(1 + rate, nper);

    fv_value = - ( pmt + x * -pmt + rate * x * pv ) /rate; //changed -pmt to pmt and * pmt to * -pmt
  }
  //fv_value = conv_number(fv_value,2);
  return fv_value;//round2Fixed(fv_value);
}

function nper(rate, pmt, pv, fv) {
  fv = parseFloat(fv);
  pmt = parseFloat(pmt);
  pv = parseFloat(pv);
  per = 0.01;
  per = parseFloat(per);

  if (( per == 0 ) || ( pmt == 0 )){
    //alert("Why do you want to test me with zeros?");
    return(0);
  }
  rate = eval((rate)/(per * 100));
  if ( rate == 0 ) // Interest rate is 0
  {
    nper_value = - (fv + pv)/-pmt; //changed /pmt to /-pmt
  }

  else
  {
    nper_value = Math.log((-fv * rate - pmt)/(-pmt + rate * pv))/ Math.log(1 + rate); //changed rate + pmt to rate - pmt and pmt + rate to -pmt + rate
  }
  //nper_value = conv_number(nper_value,2);
  return Math.ceil(nper_value);
}

function conv_number(expr, decplaces)

{ // This function is from David Goodman's Javascript Bible.
var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
while (str.length <= decplaces) {
str = "0" + str;
}

var decpoint = str.length - decplaces;
return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
}

function rate(nper, pmt, pv, fv, type, guess) {
    // Sets default values for missing parameters
    fv = typeof fv !== 'undefined' ? fv : 0;
    type = typeof type !== 'undefined' ? type : 0;
    guess = typeof guess !== 'undefined' ? guess : 0.1;

    // Sets the limits for possible guesses to any
    // number between 0% and 100%
    var lowLimit = 0;
    var highLimit = 1;

   // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
   // the solution as valid.
   var tolerance = Math.abs(0.00000005 * pmt);

   // Tries at most 40 times to find a solution within the tolerance.
   for (var i = 0; i < 40; i++) {
       // Resets the balance to the original pv.
       var balance = pv;

       // Calculates the balance at the end of the loan, based
       // on loan conditions.
       for (var j = 0; j < nper; j++ ) {
           if (type == 0) {
               // Interests applied before payment
               balance = balance * (1 + guess) + pmt;
           } else {
               // Payments applied before insterests
               balance = (balance + pmt) * (1 + guess);
           }
       }

       // Returns the guess if balance is within tolerance.  If not, adjusts
       // the limits and starts with a new guess.
       if (Math.abs(balance + fv) < tolerance) {
           return guess;
       } else if (balance + fv > 0) {
           // Sets a new highLimit knowing that
           // the current guess was too big.
           highLimit = guess;
       } else  {
           // Sets a new lowLimit knowing that
           // the current guess was too small.
           lowLimit = guess;
       }

       // Calculates the new guess.
       guess = (highLimit + lowLimit) / 2;
   }

   // Returns 0 if no acceptable result was found after 40 tries.
   return "0.00";
};
function round2Fixed(value) {
  value = +value;

  if (isNaN(value))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + 2) : 2)));

  // Shift back
  value = value.toString().split('e');
  return (+(value[0] + 'e' + (value[1] ? (+value[1] - 2) : -2))).toFixed(2);
}
function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
