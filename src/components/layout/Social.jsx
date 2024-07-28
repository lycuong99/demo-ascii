import { cn } from "../../lib/util";

const socialList = [
  {
    id: 1,
    icon: "/discord.svg",
    name: "Discord",
    url: "#",
  },
  {
    id: 2,
    icon: "/twitter.svg",
    name: "Twitter",
    url: "#",
  },
  {
    id: 4,
    icon: "/telegram.svg",
    name: "Telegram",
    url: "#",
  },
  {
    id: 3,
    icon: "/email.svg",
    name: "Email",
    url: "#",
  },
];
const Social = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {socialList.map((item) => (
        <a href={item.url} key={item.id} className=" p-1.5 lg:p-2 flex justify-center items-center">
          <img className="h-full aspect-square fill-teal-400" src={item.icon} alt={item.name} />
        </a>
      ))}
    </div>
  );
};

export default Social;
