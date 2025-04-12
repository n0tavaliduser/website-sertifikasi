import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CardItem = ({ id, title, subtitle, imageUrl }) => (
  <Card className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105">
    <CardContent className="relative p-0">
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
        <div className="text-white text-center">
          s<p className="text-sm md:text-lg lg:text-xl font-bold text-[#102640]">{title}</p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">{subtitle}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-lg font-semibold">{title}</p>
    </CardFooter>
  </Card>
);

export default CardItem;
