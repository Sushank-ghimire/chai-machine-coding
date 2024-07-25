import { useEffect, useRef, useState } from "react";

const Verification = () => {
  const [combineOtp, setCombineOtp] = useState<string>();

  const [inputs, setInputs] = useState(new Array(4).fill(""));

  const inputRefs = useRef<any>([]);

  const [verifyState, setVerifyState] = useState<any>(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, e: any) => {
    const value = e.target.value;
    if (isNaN(value)) {
      alert("Input Only Numbers");
      return;
    }
    const newOtp = [...inputs];
    newOtp[index] = value.substring(value.length - 1);
    setInputs(newOtp);

    const combineOtp = newOtp.join("");
    setCombineOtp(combineOtp);

    // Move automatically to the next field
    if (value && index < inputs.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Checking the verification code
    if (combineOtp === "1234" && inputRefs.current[index + 1] != "") {
      setVerifyState("true");
      alert("OTP Verified");
    }

    if (
      inputRefs.current[index + 1] != "" &&
      combineOtp.length === 4 &&
      combineOtp !== "1234"
    ) {
      setVerifyState("false");
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "ArrowRight" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (e.key === "ArrowLeft" && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "Backspace" && inputRefs.current[index - 1]) {
      inputRefs.current[index].value = "";
      inputRefs.current[index - 1].focus();
    } else return;
  };

  const verifyOtp = () => {
    if (combineOtp === "1234") {
      document.querySelector(".indigo")?.classList.remove("bg-indigo-900");
      setVerifyState("true");
      alert("OTP Verified");
    } else {
      setVerifyState("false");
    }
  };

  const buttonClass = () => {
    if (verifyState === "true") return "bg-green-500";
    if (verifyState === "false") return "bg-red-500";
    return "bg-indigo-900";
  };

  const buttonText = () => {
    if (verifyState === "false") return "Verification Fail";
    if (verifyState === "true") return "Account Verified";
    return "Verify Account";
  };

  return (
    <div className="w-[90vw] m-auto mt-4 text-xl md:text-2xl h-[clamp(100%-10%)]">
      <h1 className="text-white font-bold text-center text-3xl mb-4">
        Chai Aur Code
      </h1>
      <div className="bg-white w-1/2 mx-auto font-bold mb-4 text-xl md:text-2xl text-black text-center p-4 rounded">
        <h1>Mobile Phone Verification</h1>
        <div>
          <p className="text-sm text-slate-500 mt-2">
            Enter the 4-digit Verification code that was sent to your phone
            number
          </p>
          <div className="p-4 mb-4">
            <div className="mt-4">
              <div className="flex space-x-2 items-center justify-center">
                {inputs.map((_, index) => (
                  <input
                    ref={(input) => (inputRefs.current[index] = input)}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    key={index}
                    maxLength={1}
                    min={0}
                    max={9}
                    type="text"
                    className={`md:w-[90px] w-[30px] h-[40px] text-sm bg-slate-200 md:h-[80px] md:px-3 md:py-2 p-2 border text-center md:text-3xl rounded-md focus:outline-none font-normal ${
                      verifyState == "true" ? "border-green-500 border-2" : null
                    } ${
                      verifyState == "false" ? "border-red-500 border-2" : null
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={verifyOtp}
              className={`w-2/3 px-3 mt-8 rounded text-white font-normal p-2 text-sm md:text-xl ${buttonClass()}`}
            >
              {buttonText()}
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            Didn't receive the code.{" "}
            <span className="text-indigo-900 cursor-pointer">Resend ?</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
