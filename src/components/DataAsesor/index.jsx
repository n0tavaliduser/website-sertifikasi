import React from "react";
import Pengurus from "@/assets/Organisasi/Pengurus.jpg";
import Perempuan from "@/assets/Organisasi/Perempuan.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DataAsesor = () => {
  const members = [
    { name: "Agus Sumeru", noreg: "MET.000.003627 2013", role: "Asesor", image: Pengurus },
    { name: "Dedi Nurdadi, ST", noreg: "MET.000.003624 2013", role: "Asesor", image: Pengurus },
    { name: "Mohamad Ilyas, ST, MM", noreg: "MET.000.003628 2013", role: "Asesor", image: Pengurus },
    { name: "Aneta", noreg: "MET. 000.001261 2022", role: "Asesor", image: Perempuan },
    { name: "Bertha Musty", noreg: "MET.000.004262 2015", role: "Asesor", image: Perempuan },
    { name: "Dadan Ramdan H.", noreg: "MET. 000.001260 2022", role: "Asesor", image: Pengurus },
    { name: "Delicia Purdanisari", noreg: "MET. 000.001255 2022", role: "Asesor", image: Perempuan },
    { name: "Devy Ardhiany Utami", noreg: "MET. 000.007184 2016", role: "Asesor", image: Perempuan },
    { name: "Didi Subandi", noreg: "MET. 000.001259 2022", role: "Asesor", image: Pengurus },
    { name: "Dina Sri Wahyuni", noreg: "MET. 000.001267 2022", role: "Asesor", image: Perempuan },
    { name: "Elis Ratnaningsih", noreg: "MET.000.004268 2015", role: "Asesor", image: Perempuan },
    { name: "Evelyn Meiroza", noreg: "MET.000.007171 2016", role: "Asesor", image: Perempuan },
    { name: "Hari utomo", noreg: "MET. 000.001254 2022", role: "Asesor", image: Pengurus },
    { name: "Herwianto M", noreg: "MET. 000.001253 2022", role: "Asesor", image: Pengurus },
    { name: "Ilwan Syahwildan", noreg: "MET. 000.001256 2022", role: "Asesor", image: Pengurus },
    { name: "Ir. Syahrizal Mustafa", noreg: "MET.000.003625 2013", role: "Asesor", image: Pengurus },
    { name: "Irne Novitasari", noreg: "MET. 000.007175 2016", role: "Asesor", image: Perempuan },
    { name: "Luki Lukmanul Hakim", noreg: "MET.000.001252 2022", role: "Asesor", image: Pengurus },
    { name: "Margono Budhi C.", noreg: "MET.000. 001258 2022", role: "Asesor", image: Pengurus },
    { name: "Mohamad Lutfi", noreg: "MET. 000. 001257 2022", role: "Asesor", image: Pengurus },
    { name: "Ni Ra Aida Zaidin", noreg: "MET. 000.001264 2022", role: "Asesor", image: Perempuan },
    { name: "Ratna Kemala", noreg: "MET. 000.001266 2022", role: "Asesor", image: Perempuan },
    { name: "Ridwan Kurniawan", noreg: "MET. 000.001262 2022", role: "Asesor", image: Pengurus },
    { name: "Rini Ratnaningsih", noreg: "MET. 000.001263 2022", role: "Asesor", image: Perempuan },
    { name: "Rustam Hutabarat", noreg: "MET.000.001251 2022", role: "Asesor", image: Pengurus },
    { name: "Tuti Sulastri", noreg: "MET.000.004278 2015", role: "Asesor", image: Perempuan },
    { name: "Yanti Listiani", noreg: "MET.000.004266 2015", role: "Asesor", image: Perempuan },
    { name: "Yustina Eka Erdiyani", noreg: "MET.000.004270 2015", role: "Asesor", image: Perempuan },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <button className="custom-next"></button>,
    prevArrow: <button className="custom-prev"></button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <style jsx>{`
        .slick-prev,
        .slick-next {
          font-size: 16px;
          font-weight: bold;
          color: white; /* Warna teks/icon tombol */
          background-color: #06113c; /* Warna biru tua */
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          z-index: 10;
        }
        .slick-prev:hover,
        .slick-next:hover {
          background-color: #eb8317; /* Tetap biru tua saat di-hover */
          color: white; /* Warna teks/icon tetap */
        }

        .slick-prev {
          left: -50px;
        }
        .slick-next {
          right: -50px;
        }
        .slick-slide {
          display: flex;
          justify-content: center;
        }
        .card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 50px;
          text-align: center;
          max-width: 200px;
        }
        .card img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 15px;
          border: 2px solid #ccc;
        }
        .card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        .card p {
          font-size: 14px;
          color: #666;
          margin: 5px 0;
        }
        .card .noreg {
          font-size: 12px;
          color: #888;
        }
      `}</style>
      <h1 className="text-center text-2xl font-bold mb-6">Data Asesor</h1>
      <Slider {...settings}>
        {members.map((member, index) => (
          <div key={index} className="card">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p className="noreg">{member.noreg}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DataAsesor;
