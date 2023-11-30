import React from "react";
import {
  BsInstagram,
  BsFacebook,
  BsTiktok,
  BsWhatsapp,
  BsMailbox2,
  BsPhone,
} from "react-icons/bs";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <img src="https://i.ibb.co/VTZMMg2/logo.png" alt="Logo de la empresa" />
      <div className="social-links-container">
        <p>Redes Sociales</p>
        <ul className="social-links">
          <li>
            <BsInstagram />
          </li>
          <li>
            <BsFacebook />
          </li>
          <li>
            <BsTiktok />
          </li>
          <li>
            <BsWhatsapp />
          </li>
        </ul>
      </div>
      <div className="email-container">
        <p>
          <BsMailbox2 />
        </p>
        <p>contacto@phonestore.com</p>
      </div>
      <div className="phone-container">
        <p>
          <BsPhone />
        </p>
        <p>0800-444-2569</p>
      </div>
    </footer>
  );
};

export default Footer;
