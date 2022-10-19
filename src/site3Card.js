const http = require("https");

site3Card.prototype.captureCharge = captureCharge;
site3Card.prototype.parseCard = parseCard;
site3Card.prototype.preAuth = preAuth;
site3Card.prototype.parseCard = parseCard;
site3Card.prototype.captureChargeRfid = captureChargeRfid;

module.exports = site3Card;

// var herokuToken;
// let hostName;

const site3Card = function (stripeKey, herokuKey, herokuUrl) {
  if (!(this instanceof site3Card))
    return new site3Card(stripeKey, herokuKey, herokuUrl);

  // constructing attributes
  this.stripe = require("stripe")(stripeKey);
  this.herokuToken = herokuKey;
  this.hostName = herokuUrl;
};

const parseCard = function (string) {
  const card = {};
  if (string.indexOf("%B") != 0) {
    if (string.length === 8) {
      console.log("Rfid: " + string);
      card.number = string;
      card.object = "rfid";
      return card;
    }
    console.log("Bad Card: " + string);
    return null;
  }

  // decompose
  string = string.substr(2);
  var ar = string.split("^");

  card.number = ar[0];
  var name = ar[1].split("/");
  card.name = name[1] + name[0];
  card.exp_year = ar[2].substr(0, 2);
  card.exp_month = ar[2].substr(2, 2);
  card.object = "card";
  //console.log("card:  %j", card);

  return card;
};

// TODO:
// 1. @param { onSuccess:Function } callback, on success
// 2. @param { fail:Function } callback, on error
// 3. var "out" is declared, but never called
const preAuth = function (string, onSuccess, onFail) {
  if (string.length < 4) {
    onFail("nocard");
    return;
  }

  // 8 length is keyfob.  Longer is credit card.
  if (string.length == 8) {
    onSuccess(parseCard(string));
    return;
  }
  var out = this.stripe.charges.create(
    {
      amount: 500,
      currency: "cad",
      source: parseCard(string),
      capture: false,
      description: "Charge for refereshments",
    },
    function (err, charge) {
      // asynchronously called
      if (charge !== null && charge["status"] == "paid") {
        console.log("Authorized!");
        onSuccess(charge);
      } else {
        //console.log("charge: %j error: %j", charge, err);
        onFail(string || "chargeError", charge, err);
        // done here
      }
    }
  );
};

const captureChargeRfid = async function (Rfid, success, onFail) {
  var query = `/purchases?rfid=${Rfid}&token=${this.herokuToken}`;
  try {
    const res = await fetch(query, { method: "POST" });
    const data = JSON.parse(res);
    console.log({ data });
    if (data.status === 0) success(); // what is success() ? never heard of it..
  } catch (err) {
    console.log({ err });
    onFail(err);
  }
};

const captureCharge = function (charge, onSuccess, fail) {
  const { serial, id, status, access } = charge;
  if (access === "rfid") {
    captureChargeRfid(serial, onSuccess, fail);
    return;
  }
  this.stripe.charges.capture(id, function (error, chargeInfo) {
    if (charge && status === "paid") onSuccess(chargeInfo);
    else throw new Error({ error }); // else fail(error);
  });
};
