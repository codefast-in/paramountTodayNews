import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { fetchNotification } from '../../../services/operations/admin';
import './SearchBox.css';
import { Link } from 'react-router-dom';
function Notification({ isOpen, toggleNoti }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotificationsList = async () => {
            try {
                const response = await fetchNotification();
                setNotifications(response || []); // Ensure response is an array
                console.log(response.length);

                localStorage.setItem("item",response?.length)
            } catch (error) {
                console.error("Error fetching notification news:", error);
            }
        };

        fetchNotificationsList();
    }, []);


    const truncateText = (text, wordLimit=18) => {
        if(!text){
            return ""
        }
        const words = text.split(" ");
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
      };

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
             classNames="search-box"

            unmountOnExit
        >
                 <div className="absolute right-0 top-10 mt-2 lg:w-[40%] w-[60%] h-[40vh] bg-gray-400 text-black rounded-lg shadow-lg p-4 overflow-y-auto">

                <h2>Notifications</h2>
                <ul className=' flex flex-col gap-4'>
                    {notifications?.map((notification) => (
                        <Link
                  to={`/${notification?.news?.slug}`}
                        
                        key={notification?._id}>
                          <div className=' flex gap-3 lg:flex-row flex-col'>
                          <img src={notification?.news?.images[0]?.url} alt="Notification Image" className=' h-[50px] w-[100px]' />
                          <h3 className=' text-[10px] leading-tight'>{truncateText(notification?.news?.title)}</h3>
                          
                          </div>
                        </Link>
                    ))}
                </ul>
                <button onClick={toggleNoti}>Close</button>
            </div>
        </CSSTransition>
    );
}

export default Notification;
