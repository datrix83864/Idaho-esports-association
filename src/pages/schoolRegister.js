import React, { useState } from "react";
import Layout from '@theme/Layout';

export default function SchoolRegister() {
  const [name, setName] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [mascot, setMascot] = useState("");
  const [logo, setLogo] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
      e.preventDefault();
      setError("");
      setMessage("");
      if (name) {
          // send a request to the server.
          try {
              const body = { name, address_1, address_2, city, zip, mascot};
              await fetch(`/api/schoolregister`, {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(body),
              });
              await Router.push("/success");
          } catch (error) {
              console.error(error);
          }
      } else {
          setError("All fields are required");
          return;
      }
  }
  return (
    <Layout title="School Registration" description="School Registration">
  
        <main>
          <p className="description">
            Educators and administrators are welcome to sign up their schools using this forms. Parents and students, this form is NOT for you.
          </p>
          <form
        className={styles.form}
        data-netlify="false"
        data-netlify-honeypot="bot-field"
        name="schoolRegister"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="feedback" />
        <p className={styles.hidden}>
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
        </p>
  
        <label htmlFor="name">School Name</label>
        <input id="name" className={styles['form-field']} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="address_1">Address</label>
        <input id="address_1" className={styles['form-field']} type="text" name="address_1" value={address_1} onChange={(e) => setAddress_1(e.target.value)} required />

        <label htmlFor="address_2">Address</label>
        <input id="address_2" className={styles['form-field']} type="text" name="address_2" onChange={(e) => setAddress_2(e.target.value)} value={address_2}/>

        <label htmlFor="city">City</label>
        <input id="city" className={styles['form-field']} type="text" name="city" onChange={(e) => setCity(e.target.value)} value={city} required />

        <label htmlFor="zip">Zip Code</label>
        <input id="zip" className={styles['form-field']} type="text" name="zip" onChange={(e) => setZip(e.target.value)} value={zip} required />
        
        <label htmlFor="mascot">Mascot</label>
        <input id="mascot" className={styles['form-field']} type="text" name="mascot" onChange={(e) => setMascot(e.target.value)} value={mascot} />

        <button className={styles.button} type="submit">Submit</button>
      </form>
      </main>
    </Layout>
  );
}
