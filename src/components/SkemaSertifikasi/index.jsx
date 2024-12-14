import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const SkemaSertifikasi = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-content-start place-items-center py-10">
      <div className="w-full sm:w-auto h-auto">
        <Card className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105">
          <CardContent className="relative p-0">
            <img
              src="https://images.unsplash.com/photo-1731323036230-fb37b4d9ed71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
              alt=""
              className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
              <div className="text-white text-center">
                <p className="text-xl font-bold">Klaster</p>
                <p className="text-xl font-bold text-black">
                  Administrasi Perkantoran
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-semibold">Administrasi Perkantoran</p>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full sm:w-auto h-auto">
        <Card className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105">
          <CardContent className="relative p-0">
            <img
              src="https://images.unsplash.com/photo-1731323036230-fb37b4d9ed71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
              alt=""
              className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
              <div className="text-white text-center">
                <p className="text-xl font-bold">Klaster</p>
                <p className="text-xl font-bold text-black">
                  Sekretaris Yunior
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-bold">Sekretaris Yunior</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default SkemaSertifikasi;
