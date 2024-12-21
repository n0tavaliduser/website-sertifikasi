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
        className="lg:container lg:mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center text-white"
      >
        <div>
          <p className="text-3xl font-bold text-orange-400">{asesi}+</p>
          <p className="text-sm">Asesi</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-400">{asesor}</p>
          <p className="text-sm">Asesor</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-400">{tuk}+</p>
          <p className="text-sm">TUK</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-400">
            {tingkatKesuksesan}%
          </p>
          <p className="text-sm">Tingkat Kesuksesan</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-400">
            {tahunPengalaman}+
          </p>
          <p className="text-sm">Tahun Pengalaman</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
