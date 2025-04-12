import React from "react";
import logoLSP from "@/assets/Icon/logoLSP.png";
import IG from "@/assets/Icon/IG.png";
import whatsapp from "@/assets/Icon/whatsapp.png";
import email from "@/assets/Icon/email.png";

export const Footer = () => {
  return (
    <footer className="bg-[#06113C] dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/** Company */}
          <div>
            <div className="text-white">
              <img src={logoLSP} alt="Logo LSP" style={{ width: "200px", height: "auto" }} />
              {/* Perbaikan di sini */}
              <h1 className="font-bold text-lg mb-2">Alamat</h1>
              <h2>Jl. Talaga Bodas No.31 Lengkong Kota Bandung</h2>
            </div>
          </div>

          {/** Help Center */}
          <div className="text-white">
            <h1 className="font-bold text-lg mb-2">Kontak</h1>
            <p>+628 222 078 7857</p>
            <p>lsp.api.indonesia57@gmail.com</p>
            <div className="pt-4">
              <h1 className="font-bold">Ikuti Kami</h1>
              <div>
                <a href="https://wa.me/6282220787857" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
                  <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
                </a>
                {/* Instagram Icon */}
                <a href="https://instagram.com/lsp_api_p3" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
                  <img src={IG} alt="Instagram" className="w-6 h-6" />
                </a>
                {/* Email Icon */}
                <a href="mailto:lsp.ap.indonesia57@gamil.com" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
                  <img src={email} alt="Email" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/** Informasi */}
          <div>
            <h2 className="mb-2 text-lg text-white font-bold uppercase">Legal</h2>
            <ul className="text-white">
              {[
                { name: "Beranda", href: "/" },
                { name: "Partnership", href: "/Partnership" },
                { name: "Tentang", href: "/Tentang" },
                { name: "Skema", href: "/Skema" },
                { name: "TUKS", href: "/Location" },
                { name: "Galeri", href: "/Galeri" },
                { name: "Berita", href: "/Berita" },
                { name: "Kontak", href: "/Kontak" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/** Download */}
          <div>
            <h2 className="mb-2 text-sm text-center text-white font-bold uppercase dark:text-white">Lokasi</h2>
            <div className="w-full h-64 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.686944912804!2d107.61891087456304!3d-6.927972693071834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e88000855239%3A0x9637e97a8d61d55b!2sJl.%20Talaga%20Bodas%20No.31%2C%20Malabar%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040262!5e0!3m2!1sen!2sid!4v1734167501625!5m2!1sen!2sid"
                width="300"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/** Bottom Section */}
      <div className="px-4 py-6 bg-[#06113C] dark:bg-gray-700 flex justify-center items-center">
        <span className="text-sm text-[#EB8317] dark:text-gray-300 sm:text-center">
          © 2024 <a href="https://flowbite.com/">LSP AP-I™</a>. All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
          {[
            { name: "Facebook", icon: "facebook-icon-path" },
            { name: "Twitter", icon: "twitter-icon-path" },
            { name: "Discord", icon: "discord-icon-path" },
          ].map((social, index) => (
            <a key={index} href="#" className="text-white font-bold dark:hover:text-white">
              <span className="sr-only">{social.name}</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
