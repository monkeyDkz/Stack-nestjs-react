'use client';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-white p-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <img src="/images/placeholders/logos/tailwind.svg" alt="logo" className="mb-4 h-5" />
              <p className="font-bold">Components made easy.</p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="font-medium hover:text-gray-800"><a href="#">Overview</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Pricing</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Marketplace</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Features</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Integrations</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="font-medium hover:text-gray-800"><a href="#">About</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Team</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Blog</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Careers</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Contact</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Resources</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="font-medium hover:text-gray-800"><a href="#">Help</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Sales</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Advertise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Social</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="font-medium hover:text-gray-800"><a href="#">Twitter</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">Instagram</a></li>
                <li className="font-medium hover:text-gray-800"><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-zinc-600 md:flex-row md:items-center">
            <p>© 2024 Wickedblocks. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-gray-800"><a href="#">Terms and Conditions</a></li>
              <li className="underline hover:text-gray-800"><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
