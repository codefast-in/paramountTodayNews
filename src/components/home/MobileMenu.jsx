import React from "react";
import { MobileLinks } from "../../constant/mobileNav";
import { Link, useLocation, matchPath } from "react-router-dom";
import { handleIsMenuOpen } from "../../redux/newsSlice";
import { useDispatch } from "react-redux";

function MobileMenu() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Check if the URL contains '/livetv/master.m3u8'
  const shouldShowMenu = !location.pathname.includes('/livetv/master.m3u8');

  if (!shouldShowMenu) {
    return null; // Do not render anything if the condition is not met
  }

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div style={{ zIndex: 100 }} className="bg-[#003c5b] w-full bg-opacity-90 max-h-[58px]">
      <div className="w-[100vw] border-2 p-2 z-50 lg:hidden sm:hidden md:hidden">
        <ul className="w-11/12 mx-auto flex justify-between z-50">
          {MobileLinks.map((link) => (
            <li key={link.id}>
              {link.title !== "Menu" ? (
                <Link to={link.path}>
                  <div className="flex flex-col items-center z-50 text-white">
                    {/* Assuming link.icon is an SVG or icon component */}
                    {link.icon}
                    <p>{link.title}</p>
                  </div>
                </Link>
              ) : (
                <div onClick={() => dispatch(handleIsMenuOpen())}>
                  <div className="flex flex-col items-center z-50 text-white">
                    {/* Assuming link.icon is an SVG or icon component */}
                    {link.icon}
                    <p>{link.title}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
