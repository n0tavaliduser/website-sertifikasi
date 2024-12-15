import React, { useState, useEffect, useRef } from "react";

const Graph = () => {
  const [asesi, setAsesi] = useState(0);
  const [asesor, setAsesor] = useState(0);
  const [tuk, setTuk] = useState(0);
  const [tingkatKesuksesan, setTingkatKesuksesan] = useState(0);
  const [tahunPengalaman, setTahunPengalaman] = useState(0);

  const sectionRef = useRef(null);

  const animateNumber = (setState, target, duration) => {
    let start = 0;
    const step = target / (duration / 50);

    const interval = setInterval(() => {
      start += step;
      setState(Math.min(Math.round(start), target));

      if (start >= target) {
        clearInterval(interval);
      }
    }, 50);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          animateNumber(setAsesi, 1500, 3000);
          animateNumber(setAsesor, 29, 2000);
          animateNumber(setTuk, 30, 2500);
          animateNumber(setTingkatKesuksesan, 97, 2000);
          animateNumber(setTahunPengalaman, 6, 2000);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[#102640] py-8">
      <div
        ref={sectionRef}
        className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center text-white"
      >
        {/* Card 1 */}
        <div className="transition duration-300 p-4 rounded-lg">
          <p className="text-3xl font-bold text-orange-400 group-hover:text-white">
            {asesi}+
          </p>
          <p className="text-sm">Asesi</p>
        </div>

        {/* Card 2 */}
        <div className="transition duration-300 p-4 rounded-lg">
          <p className="text-3xl font-bold text-orange-400 group-hover:text-white">
            {asesor}
          </p>
          <p className="text-sm">Asesor</p>
        </div>

        {/* Card 3 */}
        <div className="transition duration-300 p-4 rounded-lg">
          <p className="text-3xl font-bold text-orange-400 group-hover:text-white">
            {tuk}+
          </p>
          <p className="text-sm">TUK</p>
        </div>

        {/* Card 4 */}
        <div className="transition duration-300 p-4 rounded-lg">
          <p className="text-3xl font-bold text-orange-400 group-hover:text-white">
            {tingkatKesuksesan}%
          </p>
          <p className="text-sm">Tingkat Kesuksesan</p>
        </div>

        {/* Card 5 */}
        <div className="transition duration-300 p-4 rounded-lg">
          <p className="text-3xl font-bold text-orange-400 group-hover:text-white">
            {tahunPengalaman}+
          </p>
          <p className="text-sm">Tahun Pengalaman</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
