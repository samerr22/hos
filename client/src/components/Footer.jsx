import facebook from "../img/facebook.png";
import gmail from "../img/gmail.png";
import google from "../img/google-maps.png";
import instr from "../img/instagram.png";
import linkedin from "../img/linkedin.png";
import youtube from "../img/youtube.png";

export default function Footer() {
  return (
    <div className="bg-slate-900 broder-none">
      <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Column 1 */}
          <div className="text-white">
            <h1 className="text-lg font-serif mb-2">Follow Us:</h1>
            <p className="mb-1">dfdfdfdfdfdf</p>
            <p>dfdfdfdfdfdf</p>
          </div>
          
          {/* Column 2 */}
          <div className="text-white">
            <h1 className="text-lg font-serif mb-2">Get in Touch:</h1>
            <p className="mb-1">dfdfdfdfdfdf</p>
            <p>dfdfdfdfdfdf</p>
          </div>
          
          {/* Column 3 */}
          <div className="text-white">
            <h1 className="text-lg font-serif mb-2">Our Services:</h1>
            <p className="mb-1">dfdfdfdfdfdf</p>
            <p>dfdfdfdfdfdf</p>
          </div>
          
          {/* Column 4 */}
          <div className="text-white">
            <h1 className="text-lg font-serif mb-2">Contact Us:</h1>
            <div className="flex items-center gap-2 mb-2">
              <img src={google} className="w-6 rounded-lg" alt="Google" />
              <h1>new one</h1>
            </div>
            <div className="flex items-center gap-2">
              <img src={gmail} className="w-6 rounded-lg" alt="Gmail" />
              <h1>new one</h1>
            </div>
          </div>
          
          {/* Social Media Icons */}
          

        </div>
        
        <div className="mt-6 text-center text-white">
          <p>@compywirthuviersity.com</p>
        </div>
      </div>
    </div>
  );
}
