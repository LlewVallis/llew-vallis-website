import React, { useRef, useState } from "react";
import Emailjs from "emailjs-com";

import "./work.scss";

const Work = () => (
  <>
    <WorkCaption />
    <Contact />
  </>
);

const WorkCaption = () => (
  <p>
    Got something in mind? Fill in the form and I'll get back to you.
    Alternatively, Shoot me an email at{" "}
    <a href="mailto://llewvallis@gmail.com">llewvallis@gmail.com</a> or catch me
    on Discord at <b>Llew Vallis#5734</b> if thats more your style.
  </p>
);

const Contact = () => {
  const subjectRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const [state, setState] = useState("pending");

  const onSubmit = (e) => {
    e.preventDefault();

    if (state === "pending") {
      setState("sending");

      const subject = subjectRef.current.value;
      const replyTo = emailRef.current.value;
      const message = messageRef.current.value;

      sendEmail(subject, replyTo, message)
        .then(() => {
          console.log("Sent email successfully");
          setState("succeeded");
        })
        .catch((e) => {
          console.log("Failed to send email", e);
          setState("failed");
        });
    } else if (state === "succeeded") {
      setState("pending");

      subjectRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } else if (state === "failed") {
      setState("pending");
    }
  };

  const buttonText = {
    pending: "SEND",
    sending: "SENDING",
    failed: "COULD NOT SEND",
    succeeded: "SENT",
  }[state];

  const disabled = state !== "pending";

  return (
    <form onSubmit={onSubmit} className={`state-${state}`}>
      <label>
        Subject
        <input
          ref={subjectRef}
          disabled={disabled}
          type="text"
          placeholder="Your subject line"
        />
      </label>

      <label>
        Reply Email (required)
        <input
          ref={emailRef}
          disabled={disabled}
          required
          type="email"
          placeholder="The address for me to reply to"
        />
      </label>

      <label>
        Message (required)
        <textarea
          ref={messageRef}
          disabled={disabled}
          required
          rows="10"
          placeholder="The message you'd like to send"
        />
      </label>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

const sendEmail = (subject, replyTo, message) => {
  return Emailjs.send(
    "service_d4i57oh",
    "template_n6d54ct",
    {
      reply_to: replyTo,
      subject,
      message,
    },
    "user_6hUwfgWxVG1q6kkPJLpQH"
  );
};

export default Work;
