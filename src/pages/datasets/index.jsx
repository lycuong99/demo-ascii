import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DatasetsPage = () => {
  const types = [
    "All datasets",
    "Computer science",
    "Mathematics",
    "Education",
    "Health",
    "NLP",
    "Artificial Intelligence",
    "Machine learning",
    "Physics",
    "Social Science",
    "Chemistry",
  ];

  const datasets = [
    {
      title: "Dataset 1",
      time: "2022-01-01",
      volumn: "100MB",
      file: "1 File(CSV)",
      desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imageUrl:
        "https://images.unsplash.com/photo-1725832062946-2ec9aae5c4e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    },
    {
      title: "Dataset 2",
      time: "2022-01-01",
      volumn: "100MB",
      file: "1 File(CSV)",
      desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imageUrl:
        "https://images.unsplash.com/photo-1725832062946-2ec9aae5c4e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    },
    {
      title: "Dataset 3",
      time: "2022-01-01",
      volumn: "100MB",
      file: "1 File(CSV)",
      desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imageUrl:
        "https://images.unsplash.com/photo-1725832062946-2ec9aae5c4e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    },
    {
      title: "Dataset 4",
      time: "2022-01-01",
      volumn: "100MB",
      file: "1 File(CSV)",
      desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imageUrl:
        "https://images.unsplash.com/photo-1725832062946-2ec9aae5c4e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    },
  ];
  return (
    <main className="z-10 relative ">
      <div className="container h-full pt-[80px] lg:px-8 xl:px-10 mx-auto">
        <div className="mb-8 xl:mb-12 flex flex-col gap-4 pt-4">
          <h1 className="text-4xl lg:text-6xl font-neu font-light text-white">Dataset</h1>
          <p>Explore, and download datasets. Learn more about our datasets.</p>
          <div className="flex gap-4">
            <Button className="bg-white text-black">
              New Dataset <Plus />
            </Button>
            <Button variant="outline " className="bg-[#21233F]">
              Your work
            </Button>
          </div>
        </div>

        <div>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground " />
            <Input placeholder="Search" className="pl-10 bg-accent" />

            <Filter className="absolute right-4 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Badge key={type} variant={"accent"}>
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <h2 className="text-xl lg:text-3xl font-neu font-medium text-white flex gap-2 items-baseline my-8 xl:my-12">
          <TrendingUp />
          Trending Datasets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {datasets.map((dataset) => (
            <DatasetCard
              key={dataset.title}
              title={dataset.title}
              imageUrl={dataset.imageUrl}
              time={dataset.time}
              volumn={dataset.volumn}
              file={dataset.file}
              desciption={dataset.desciption}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

const PageContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};
const DatasetCard = ({ title, imageUrl, time, volumn, file, desciption }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader
        className="rounded-xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "120px",
        }}
      ></CardHeader>
      <CardContent className="px-4 py-4 border-t border flex-1">
        <h3 className="text-xl font-neu font-medium">{title}</h3>
        <p>{desciption}</p>
      </CardContent>
      <CardFooter className="flex justify-between px-4 py-2 h-14">
        <Select value="2">
          <SelectTrigger className="w-[50px]  p-2.5 rounded-xl h-[32px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
  );
};
export default DatasetsPage;
