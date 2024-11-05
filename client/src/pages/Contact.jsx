import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
}

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);
const {user, API} = useAuth();
if(userData && user) {
  setContact({
    username: user.username,
    email: user.email,
    message:""
  });

  setUserData(false);
}

const URL = `${API}/api/form/contact`;
  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(contact);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      })
      if(response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("message send successfully")
        
      }
    } catch (error) {
      
    }

    
  };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/aboutus.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">

       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13276.965125479528!2d84.73442083535136!3d19.484210125686964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d4d3a65a3490d%3A0xfe811e0ed1336f93!2sScience%20College%20Hinjilicut%20(Autonomous)!5e1!3m2!1sen!2sin!4v1730108706521!5m2!1sen!2sin" 
       width="100%"
       height="450"
       allowFullScreen
       loading="lazy"
       referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </section>
    </>
  );
};