// cokeIO module
module.exports = cokeIO;

cokeIO.prototype.tryDispensing = tryDispensing;
cokeIO.prototype.dispenseAt = dispenseAt;
cokeIO.prototype.exit = exit;
cokeIO.prototype.printInputs = printInputs;

var Gpio = require('onoff').Gpio;
var exec = require('child_process').exec;

//var sys = require('sys');
function puts(error, stdout, stderr) { /* sys.puts(stdout) */ }
//function putstr(error, stdout, stderr) { sys.puts(stdout) }


/*
+-----+-----+---------+------+---+--B Plus--+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 |     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
 |   2 |   8 |   SDA.1 |   IN | 1 |  3 || 4  |   |      | 5V      |     |     |
 |   3 |   9 |   SCL.1 |   IN | 1 |  5 || 6  |   |      | 0v      |     |     |
 |   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
 |     |     |      0v |      |   |  9 || 10 | 1 | ALT0 | RxD     | 16  | 15  |
 |  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
 |  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
 |  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
 |     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
 |  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
 |   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 0 | IN   | GPIO. 6 | 6   | 25  |
 |  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
 |     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
 |   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
 |   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
 |   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
 |  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
 |  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
 |  26 |  25 | GPIO.25 |   IN | 0 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
 |     |     |      0v |      |   | 39 || 40 | 1 | OUT  | GPIO.29 | 29  | 21  |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+--B Plus--+---+------+---------+-----+-----+
*/


var inputGpios = new Array();
var outputGpios = new Array();

function cokeIO(inputs, outputs)
{
  if (!(this instanceof cokeIO))
    return new cokeIO(inputs, outputs);

  setupInputs(inputs);
  setupOutputs(outputs);
}

function setupInputs(inputs)
{
  process.stdout.write("\nSetting Up Inputs.");
    for (var i = 0; i < inputs.length; i++)
    {
	    exec("gpio -g write " + inputs[i] + " 0", puts);
	    exec("gpio -g mode " + inputs[i] + " in", puts);
	    exec("gpio -g mode " + inputs[i] + " up ", puts);
	    inputGpios[i] = new Gpio(inputs[i], 'in','both');
      process.stdout.write(".");
    }
    process.stdout.write("done.");
}

function setupOutputs(outputs)
{
  process.stdout.write("\nSetting Up Outputs.");
    for (var i=0; i < outputs.length; i++)
    {
	    exec("gpio -g mode " + outputs[i] + " out", puts);
	    exec("gpio -g write " + outputs[i] + " 0 ", puts);
	    outputGpios[i] = new Gpio(outputs[i], 'out');
      process.stdout.write(".");
    }
    process.stdout.write("done.\n");
}

function printInputs()
{
  var btns = new bitField(0);

  for (var i=0; i < inputGpios.length; i++)
    {
		    btns.setBit(i, inputGpios[i].readSync());
        //		    if (inputGpios[i].readSync() != 0)
        //				    console.log(" not zero: " + inputs[i]);
    }
				console.log("Buttons: 0x" + btns.value.toString(16) );
				console.log("Buttons: 0b" + btns.value.toString(2) );

}

function exit()
{
  console.log("unexporting GPIOs");
  for (var i =0; i < outputGpios.length; i++)
      outputGpios[i].unexport();
  for (var i =0; i < inputGpios.length; i++)
      inputGpios[i].unexport();
}

function sleep(miliseconds)
{
  var end = new Date().getTime() + miliseconds;
  while(new Date().getTime() < end);
}

function dispenseAt(bayNumber)
{
	console.log("dispensing at: " + bayNumber);
                // all good dispense the can.
		console.log("dispensing out of: ["+ bayNumber +"] which is bcmGPIO: " + outputGpios[bayNumber].gpio );
                outputGpios[bayNumber].writeSync(1);
                sleep(1000);
                outputGpios[bayNumber].writeSync(0);
}


function tryDispensing(success, fail)
{
    console.log("Choose Booze");

    buttonsStart = 0;
    buttonsEnd = 7;  // change this for machines with more than 7 buttons. This should eventually be a config.

    var i= buttonsStart;

    var end = new Date().getTime() + 45000; // 45 seconds
    while(i <= buttonsEnd && (new Date().getTime()) < end )
    {
        // is there button down?

  	if (inputGpios[i].readSync() != 1)
            {
                console.log("button " + i + "down!");

          		// reset the timer
          		end = new Date().getTime() + 30000; // 30 seconds

                printInputs();

                // are we out of it?
                if (inputGpios[i+8].readSync() == 0)
                {
                    console.log("we are out of that thing");
		                fail("soldout");
                }
		            else
		            {
                  success(i);
		            }

            }
        i++;
        if (i > buttonsEnd)
            i = buttonsStart;
    }

	console.log("Waited too long!");
	fail("timedout");
}

function bitField(value)
{
		this.value = (!isNaN(parseFloat(value)) && isFinite(value))? value : 0;
		this.getBit = function(bitNumber) { return (this.value >> bitNumber)& 0x1 }
        this.setBit = function(bitNumber, value) {
                        if (value == 0)
                        { this.value &= 0x7FFFFFFF  & ~(1 << bitNumber); }
                else
                        { this.value |= 0x1 << bitNumber; }
         }

}
