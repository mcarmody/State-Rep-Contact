<script>
  console.log("started");
  
  var senderEmail = '';
  var repEmail = '';
  var senatorEmail = '';
  var senatorName = '';
  var repName = '';
  var subject = 'Be part of the solution. Support supervised use today.';
  var senderName = '';
  var senderCity = '';
  var senderZip = '';
  var senderLat;
  var senderLong;
  var emailBody = '';
  var rawRepData;
  var settings = [];
  var apikey = "af8ee9d3-8056-41c0-85c7-56047ddbc655";

  $(function () {
    $('.button').on('click', function (event) {
      senderName = window.document.getElementsByClassName('first-name')[0].children[0].children[0].value + " " + window.document.getElementsByClassName('last-name')[0].children[0].children[0].value;
      senderCity = window.document.getElementById('text-yui_3_17_2_1_1555271846381_75798-field').value;
      senderZip = window.document.getElementById('text-yui_3_17_2_1_1555271846381_76872-field').value;
      senderEmail = window.document.getElementById('email-yui_3_17_2_1_1555272195614_24293-field').value;

      settings = {
        "async": true,
        "url": "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDT5_s7Ft3jGzCt_sQKdYRHdXN9cVh9Duk&address="+senderZip,
        "method": "GET",
        "data": ""
      }
      alert("Redirecting to your email now...");
      checkRep();
      console.log("itsworking.gif");
    });
  });

var checkRep= function() {
  console.log("functioning")
  console.log("Name/City/Zip: "+senderName+", "+senderCity+", "+senderZip);
  // Maps API call

  $.ajax(settings).done(function (response) {
    console.log("Geolocation request going out...");
    console.log(response);
    senderLat = response.results[0].geometry.location["lat"];
    senderLong = response.results[0].geometry.location["lng"];
    console.log(senderLat+", "+senderLong)

    // Open States API Call
    var data = "query={people(latitude:"+senderLat+",longitude:"+senderLong+",first:4){edges{node{name}}}}";

    var openStatesSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://openstates.org/api/v1/legislators/geo/?lat="+senderLat+"&long="+senderLong+"&apikey=af8ee9d3-8056-41c0-85c7-56047ddbc655&apikey="+apikey,
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
      },
      "processData": false,
      "data": ""
    }

    $.ajax(openStatesSettings).done(function (response) {
      console.log(response);
      rawRepData = response;
      repName = rawRepData[0]["last_name"];
      senatorName = rawRepData[1]["last_name"];
      repEmail = rawRepData[0]["email"];
      senatorEmail = rawRepData[1]["email"];
      if(repEmail == null){repEmail = ""};
      if(senatorEmail == null){senatorEmail = ""};
      console.log("Rep. "+repName+", Senator "+senatorName);
      emailBody = `Dear Senator `+senatorName+` and Representative ` + repName+`:
%0D%0A%0D%0A
My name is ` + senderName + ` and I’m a concerned constituent from ` + senderCity +`, ` + senderZip + `.
%0D%0A%0D%0A
I’m writing today to express my support for a pilot Supervised Use Site (SUS) in Denver and to demand that you take action to support passage of this lifesaving intervention in the Colorado State Legislature.  As you know, the Overdose Crisis claimed 72,306 lives  in 2017 alone; more than 1.4 million people have died since 1999.  In order to combat the Crisis, the Denver City Council approved a pilot program to establish a SUS in Denver by an overwhelming margin of 12-1 allowing for this lifesaving public health intervention to be implemented as a matter of local control.  
%0D%0A%0D%0A
Data gathered from 102 Supervised Use Sites operating in 63 cities around the globe provides a wealth of information to support their efficacy.  In fact, there has yet to be a single fatal overdose occurring in any of these sites.  Further, they are proven to promote public health by curbing the spread of viral hepatitis and HIV and have been shown reduce public disorder without increasing crime in surrounding communities.  
%0D%0A%0D%0A
The City’s clear desire for a pilot SUS still requires an exemption from the Colorado State Legislature.  Because SUS provides the most clinically sound method to address the current Overdose Crisis and because a Denver SUS would be privately funded in its entirety, I expect that you will support expeditious passage of this lifesaving and critical legislation.  
%0D%0A%0D%0A
Thank you for your time and attention to this important matter.
%0D%0A%0D%0A
Sincerely,%0D%0A
` + senderName;
        window.open('mailto:' + repEmail + ',' + senatorEmail + '?cc=' + senderEmail + ',TakeAction@EndOverdose.Today&subject=' + subject + '&body=' +   emailBody);

    }).done(function() {
      console.log("Email: " + senderEmail);
      console.log("Body: " + emailBody);
    })
      
  });
}
</script>