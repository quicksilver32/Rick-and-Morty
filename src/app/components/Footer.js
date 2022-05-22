import React from "react";
import "../../assets/styles/components/footer.css";
import social_git from "../../assets/images/svg/social-git.svg";
import social_vk from "../../assets/images/svg/social-vk.svg";
import social_inst from "../../assets/images/svg/social-inst.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p className="copyright">&lt;/&gt;by Quicksilver32 2022</p>
        <a
          className="social-media"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/quicksilver32"
        >
          <img src={social_git} width="64" height="64" alt="github" />
        </a>
        <a
          className="social-media"
          target="_blank"
          rel="noreferrer"
          href="https://vk.com/id135732126"
        >
          <img src={social_vk} width="64" height="64" alt="vk" />
        </a>
        <a
          className="social-media"
          target="_blank"
          rel="noreferrer"
          href="https://instagram.com/quicksilver_meow"
        >
          <img src={social_inst} width="64" height="64" alt="inst" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
