import facebook from "../img/facebook.png";
import gmail from "../img/gmail.png";
import google from "../img/google-maps.png";
import instr from "../img/instagram.png";
import linkedin from "../img/linkedin.png";
import youtube from "../img/youtube.png";

export default function Footer() {
  return (
    <div className="bg-blue-600 border-t-2 border-gray-700 text-white">
      <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Column 1 - Follow Us */}
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">Follow Us:</h1>
            <p className="text-sm">Stay connected with us on social media.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80">
                <img src={facebook} className="w-6" alt="Facebook" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src={instr} className="w-6" alt="Instagram" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src={linkedin} className="w-6" alt="LinkedIn" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src={youtube} className="w-6" alt="YouTube" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Get in Touch */}
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">Get in Touch:</h1>
            <p className="text-sm">Reach out to us for inquiries and support.</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">Email: contact@company.com</p>
          </div>
          
          {/* Column 3 - Our Services */}
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">Our Services:</h1>
            <ul className="text-sm space-y-1">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>SEO Optimization</li>
              <li>Digital Marketing</li>
            </ul>
          </div>
          
          {/* Column 4 - Contact Us */}
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">Contact Us:</h1>
            <div className="flex items-center gap-2">
              <img src={google} className="w-6 rounded-lg" alt="Google" />
              <span className="text-sm">Google Maps</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={gmail} className="w-6 rounded-lg" alt="Gmail" />
              <span className="text-sm">contact@company.com</span>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="mt-6 text-center text-sm">
          <p>&copy; 2025 CompanyName. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
