import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Box, Button, Input, Paper, TextareaAutosize, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const form = useRef(null);
  const recaptchaRef = useRef(null);
  const [done, setDone] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const closeModal = () => {
    setShowPopup(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setShowPopup(true);
      return;
    }
    emailjs.sendForm(
      "service_ik1p9er",
      "template_w4ethig",
      form.current,
      "MD7CiurlUoyOHPDTL"
    ).then((result) => {
        console.log(result.text);
        setDone(true);
        form.current.reset();
        setIsCaptchaVerified(false);
    }).catch((error) => {
        console.log(error.text);
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {showPopup && (
        <Box>
          <Paper>
            <Box p={4}>
              <Typography variant="h6" align="center">
                Please complete the CAPTCHA
              </Typography>
              <Button
                onClick={closeModal}
                type="button"
                className="w-full mt-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      <Paper className="max-w-md mx-auto bg-white rounded-lg shadow-2xl p-8">
        <form ref={form} onSubmit={sendEmail}>
          {["Name", "Email", "Subject", "Message"].map((label, idx) => (
            <Box key={label} className="mb-4">
              <label className="block font-medium text-gray-700">{label} *</label>
              {label !== "Message" ? (
                <Input
                  type={label.toLowerCase()}
                  name={`user_${label.toLowerCase()}`}
                  placeholder={label}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <TextareaAutosize
                  rows={4}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                  name="message"
                  placeholder={label}
                />
              )}
            </Box>
          ))}
          <Box className="mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={() => setIsCaptchaVerified(true)}
            />
          </Box>
          <Button
            type="submit"
            value="Send"
            className="w-full bg-gradient-to-br from-pink-600 to-purple-700 text-white py-2 px-4 rounded-md hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-md"
          >
            Send
          </Button>
        </form>
        {done && (
          <Typography className="mt-4 flex items-center justify-center text-xl text-gray-400">
            Thanks for contacting us!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ContactForm;
