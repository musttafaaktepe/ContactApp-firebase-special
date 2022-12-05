import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../authentication/firebase";

const ForgotPassword = () => {
  const [emailadres, setEmailadres] = useState("");

  const [emailError, setEmailError] = useState(false);

  const sendForgotPassword = () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailadres.match(reg)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      alert("ınvalid email");
    }

    if (!emailError) {
      sendPasswordResetEmail(auth, emailadres)
        .then(() => {
          alert("check your mail");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="modal" id="forgotPassword" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmailadres(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={sendForgotPassword}
            >
              Send
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
