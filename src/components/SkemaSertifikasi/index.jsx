import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SkemaSertifikasi = () => {
  return (
    <section className="grid grid-cols-2 place-content-start place-items-center">
      <div className="w-[498px] h-[346px]">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <div className="py-4">
          <div className="bg-[#102640] text-white p-2 rounded-lg text-2xl text-center">
            Administrasi Perkantoran
          </div>
        </div>
      </div>
      <div className="w-[498px] h-[346px]">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <div className="py-4">
          <div className="bg-[#102640] text-white p-2 rounded-lg text-2xl text-center">
            Sekretaris Yunior
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkemaSertifikasi;
