import { cn } from "../../lib/utils";

import { Marquee } from "../../LandingPage/magicui/marquee";
import Rev1 from "../../../assets/images/rev1.jpg";
import Rev4 from "../../../assets/images/rev4.jpg";

const reviews = [
  {
    name: "Chidi",
    username: "@chidi",
    body: "Agrovest has made it much easier for me to track and manage my agricultural investments. The platform provides detailed insights, ensuring my investments are performing optimally.",
    img: Rev1,
  },
  {
    name: "Mariam",
    username: "@mariam",
    body: "As an investor, Agrovest has helped me diversify my portfolio into the agricultural sector. The platform's transparent data and real-time tracking have boosted my confidence in sustainable farming investments.",
    img: Rev4,
  },
  {
    name: "Kwame",
    username: "@kwame",
    body: "Agrovest has taken the complexity out of tracking agricultural prices and returns. Their platform makes it easy to stay on top of my investments and monitor the market trends.",
    img: Rev1,
  },
  {
    name: "Amina",
    username: "@amina",
    body: "Investing through Agrovest has been a game changer. The platform offers a clear overview of my returns, and the price tracking tool helps me stay updated on agricultural market conditions.",
    img: Rev4,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
