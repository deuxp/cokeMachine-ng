// const play = require("../src/audio")().play;
const config = require("../config");
const site3Card = require("../src/site3Card")(
  config.stripeKey,
  config.herokuKey,
  config.herokuUrl
);
const testCard = "%B4242424242424242^SITE3/ARMAND B ^160723?;2234234";

test("should import config data", () => {
  // console.log("config: " + JSON.stringify(config, null, 2));
  expect(config.herokuKey).toBe("1dd4432e4000002342042422222");
});
test("site3Card instance has correct config data", () => {
  // console.log("site3Card: " + JSON.stringify(site3Card, null, 2));
  expect(site3Card.herokuToken).toBe("1dd4432e4000002342042422222");
  expect(site3Card.hostName).toBe("site3-staging.herokuapp.com");
  expect(site3Card.stripeKey).toBe("sk_test_Jxxxxxxxxxxxxxxxxxxx");
});

const magstripeCard = "%B4242424242424242^SITE3/ARMAND B ^160723?;2234234";

test("should parse the site3 magstripe", () => {
  const parsedCard = site3Card.parseCard(magstripeCard);
  // console.log(JSON.stringify({ parsedCard }, null, 2));
  expect(parsedCard.number).toBe("4242424242424242");
  expect(parsedCard.name).toBe("ARMAND B SITE3");
  expect(parsedCard.exp_year).toBe("16");
  expect(parsedCard.exp_month).toBe("07");
  expect(parsedCard.object).toBe("card");
});

const rfid = "01234567";

test("should parse a site3 keyfob", () => {
  const parsedKeyfob = site3Card.parseCard(rfid);
  expect(parsedKeyfob.number).toBe("01234567");
  expect(parsedKeyfob.object).toBe("rfid");
});

// onSuccess callback calls site3 card capture charge and passes a parsed card
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
