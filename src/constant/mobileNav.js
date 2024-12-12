import { IoHomeOutline, IoFilmOutline, IoVideocamOutline, IoMenuOutline } from "react-icons/io5";

export const MobileLinks = [
    {
        id: 1,
        title: "Home",
        icon: <IoHomeOutline className="text-lg" />,
        path: "/"
    },
    // {
    //     id: 2,
    //     title: "Reels",
    //     icon: <IoFilmOutline className="text-lg" />,
    //     path: "/reel"
    // },
    {
        id: 3,
        title: "Live",
        icon: <IoVideocamOutline className="text-lg" />,
        path: "/live"
    },
    {
        id: 4,
        title: "Menu",
        icon: <IoMenuOutline className="text-lg" />,
        onClick: () => handleMenuClick() // Add this line
    },
];

const handleMenuClick = () => {
    // console.log("Menu clicked!");
    // Your custom logic here
};
