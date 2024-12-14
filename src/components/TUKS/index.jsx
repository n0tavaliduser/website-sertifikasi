import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CardItem = ({ imageUrl, footerText, description }) => (
  <Card className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105">
    <CardContent className="relative p-0">
      <img
        src={imageUrl}
        alt="Card image"
        className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
        <div className="text-white text-center">
          <p className="text-sm md:text-lg lg:text-xl font-bold text-[#102640]">
            {footerText}
          </p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">
            {description}
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-lg font-semibold">{footerText}</p>
    </CardFooter>
  </Card>
);

export const TUKS = () => {
  const cardData = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      footerText: "Politeknik Negeri Pontianak",
      description: "Kota Pontianak Kalimantan Barat",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      footerText: "Politeknik Negeri Pontianak",
      description: "Kota Pontianak Kalimantan Barat",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      footerText: "Politeknik Negeri Pontianak",
      description: "Kota Pontianak Kalimantan Barat",
    },
  ];

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div key={index}>
            <CardItem
              imageUrl={card.imageUrl}
              footerText={card.footerText}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TUKS;
