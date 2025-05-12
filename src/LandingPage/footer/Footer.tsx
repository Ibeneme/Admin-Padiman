import { FaTelegram, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import "./Footer.css";

const iconStyle = { fontSize: 24, color: "#fff" };

const socialLinks = [
  {
    href: "https://t.me/padimanroute",
    icon: <FaTelegram style={iconStyle} />,
    label: "Telegram",
  },
  {
    href: "https://instagram.com/padimanroute",
    icon: <FaInstagram style={iconStyle} />,
    label: "Instagram",
  },
  {
    href: "https://x.com/padimanroute",
    icon: <FaXTwitter style={iconStyle} />,
    label: "X (Twitter)",
  },
  {
    href: "https://tiktok.com/@padimanroute",
    icon: <SiTiktok style={iconStyle} />,
    label: "TikTok",
  },
];

const Footer = () => {
  return (
    <footer className="padiman-footer">
      <div className="padiman-footer-inner">
        {/* Contact Section */}
        <div className="padiman-footer-section">
          <h3 className="padiman-footer-title">Contact Us</h3>
          <address className="padiman-footer-contact">
            <a href="mailto:info@padimanroute.com">padimanroute@gmail.com</a>
          </address>
        </div>

        {/* Social Media Section */}
        <div className="padiman-footer-section">
          <h3 className="padiman-footer-title">Follow Us</h3>
          <div className="padiman-footer-socials">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="padiman-footer-bottom">
        &copy; {new Date().getFullYear()} Padiman Route. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;