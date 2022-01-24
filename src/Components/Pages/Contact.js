import { useRef } from "react";
import "./Contact.css";
const Contact = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    const contact = {
      name: name,
      email: email,
      phone: phone,
    };

    props.putRequest(contact);
  };

  return (
    <div className="contactBody">
      <h2>Any Issues? Contact us directly</h2>
      <form className="contactForm" onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          className="contactName"
        ></input>
        <label htmlFor="email">Email ID:</label>
        <input
          id="email"
          type="text"
          ref={emailRef}
          className="contactEmail"
        ></input>
        <label htmlFor="mobile">Phone Number:</label>
        <input
          id="mobile"
          type="number"
          ref={phoneRef}
          className="contactPhone"
        ></input>
        <button className="contactBtn">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
