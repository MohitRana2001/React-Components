import { useRef , useEffect } from "react";


const NotificationDropDown = ({notifications , setIsOpen}) => {

    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        console.log(dropdownRef.current && !dropdownRef.current.contains(event.target));
        console.log(dropdownRef + "ref");
        console.log(event.target + "event");
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            // setUnreadCount(0);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown' , handleOutsideClick);
        
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    return (
        <div ref={dropdownRef} className=' w-56 bg-white border rounded-lg shadow-lg'>
            <ul>
                {notifications.map((notification) => (
                    <li className='p-4 border-b flex items-center justify-between' key={notification.id}>
                        <p>{notification.title}</p>
                        {/* {console.log(notification.title)}; */}
                        <small className='text-gray-500'>{notification.time}</small>
                    </li>
                ))}
            </ul>
            <button className='w-full py-2 text-center text-blue-500 hover:bg-gray-100'>
                See all notifications
            </button>
        </div>
    );
};

export default NotificationDropDown;