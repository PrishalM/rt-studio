import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import Link from "next/link";

import ".//subscribed.css";

export default function Home() {
  return (
    <div>
      <h2>Enjoy what is to come!</h2>
      <p>Don’t leave us to be junk, add us as a safe sender now!</p>
      <p>hello@rtstudio.com</p>
      <p>In the meantime check us out on social media!</p>
      <div className="social-container">
        <InstagramIcon />
        <XIcon />
      </div>
      <p style={{ color: "red" }}>insta grid</p>
    </div>
  );
}
