// 2.OTP Countdown Simulator (Console App)
// ------------------------------------

//         Simulate OTP sending flow in Node.js:

//         Show “OTP Sent Successfully”

//         Start 10-second countdown

//         Allow resend only after countdown ends

console.log("OTP Sent Successfully");

let seconds = 10;

let intervalID = setInterval(() => {
  seconds--;
  console.log(`resend OTP after ${seconds}secs`);

  if (seconds === 0) {
    console.log(`resend OTP`);
    clearInterval(intervalID);
  }
}, 1000);
