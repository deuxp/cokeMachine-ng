module.exports = {
  herokuUrl: "site3-staging.herokuapp.com",
  herokuKey: "1dd4432e4000002342042422222",
  stripeKey: "sk_test_Jxxxxxxxxxxxxxxxxxxx",
  maxDelayBetweenInputBytes: 500,
  minDelayBetweenSuccessfulCharges: 2000,
  minDelayBetweenFaildCharges: 1500,
  inputs: [
    6, 13, 19, 26, 12, 16, 20, 21, /* indicators */ 9, 11, 0, 5, 25, 8, 7, 1,
  ],
  outputs: [17, 27, 22, 10, 4, 18, 23, 24],
  swipeFailSoundFile: "fail.mp3",
  swipeSuccessSoundFile: "success.mp3",
  chargeFailSoundFile: "fail.mp3",
  chargeSuccessSoundFile: "success.mp3",
  soldOutSoundFile: "fail.mp3",
};
