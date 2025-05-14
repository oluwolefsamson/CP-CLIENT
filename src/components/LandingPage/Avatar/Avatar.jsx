import { AvatarCircles } from "../magicui/avatar-circles";

import Sign2 from "../../../assets/images/sign2.jpg";
import Sign3 from "../../../assets/images/sign3.jpg";
import Sign4 from "../../../assets/images/sign4.jpg";

const avatars = [
  {
    imageUrl: Sign4,
    profileUrl: "https://unsplash.com/photos/YhiSA2Kxm8A",
  },
  {
    imageUrl: Sign2,
    profileUrl: "https://unsplash.com/photos/PWBozjMIdI4",
  },
  {
    imageUrl: Sign3,
    profileUrl: "https://unsplash.com/photos/rXvxDzjZxvU",
  },
  {
    imageUrl: Sign4,
    profileUrl: "https://unsplash.com/photos/BXOXnQ26B7o",
  },
  {
    imageUrl: Sign2,
    profileUrl: "https://unsplash.com/photos/4Wv1btdw9Ew",
  },
  {
    imageUrl: Sign3,
    profileUrl: "https://unsplash.com/photos/JgGFomscHho",
  },
];

export function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
