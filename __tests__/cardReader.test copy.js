console.log("hello");

// const play = require("../src/audio")().play;
// const config = require("../config");
// const util = require("util");
// const site3Card = require("../src/site3Card")(
//   config.stripeKey,
//   config.herokuKey,
//   config.herokuUrl
// );

// const configData = util.format(
//   "%s %s %s %s %s",
//   "output: ",
//   config.test("ga "),
//   config.stripeKey,
//   config.herokuKey,
//   config.herokuUrl
// );

// console.log("hell0");
// console.log(`config: ${configData}`);

//console.log("config:" + JSON.stringify(config));

//play('success.mp3');
//play('fail.mp3');

/*
var card = site3Card.parseCard("%B4242424242424242^SITE3/ARMAND B ^160723?;2234234");
console.log(JSON.stringify(card));
*/

/*
site3Card.preAuth("%B4242424242424242^SITE3/ARMAND B ^160723?;2234234",
    function (charge) {

        console.log("success!");
        // capture
        site3Card.captureCharge(charge,
          function () {console.log(" capture success!") },
          function () {console.log(" capture fail!") }
           );
    } ,
function (string, charge, err) { console.log("err!" + err.code);}
);

site3Card.preAuth("%B4243424242424242^SITE3/ARMAND B ^160723?;2234234",
function (charge) { console.log("success!");} ,
function (string, charge, err) { console.log("err!" + err.code);}
);
*/

/*
site3Card.preAuth("DEADBEEF",
function (charge) { console.log("RFID success!");} ,
function (string, charge, err) { console.log(" RFID err!");}
);



site3Card.preAuth("DEADBEAT",
function (charge) { console.log("RFID success!");} ,
function (string, charge, err) { console.log(" RFID err!");}
);
*/

/*
var rfids = ["DEADBEEF", "deadbeef", "deadbeat"];

for (i=0; i < rfids.length; i++)
{
  var r = site3Card.parseCard(rfids[i]);
  site3Card.captureCharge(r,
    function (res) {console.log(" rfid " + res + " capture success!"); },
    function (res, id) {console.log(" rfid " + res + "capture fail! for: " + id); }
     );
}
*/

/*
      site3Card.captureCharge(rfid2,
        function () {console.log(" rfid " + rfid + "capture success!") },
        function () {console.log(" rfid " + + rfid + "capture fail!") }
         );
*/
