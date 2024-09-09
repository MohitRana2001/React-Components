import { useState , useRef, useEffect} from 'react';
import { BsBell } from 'react-icons/bs';
// import NotificationDropDown from './NotificatioDropDown';

const NotificationButton = () => {
    const [isOpen , setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);

    const notifications = [
        { id: 1, title: 'Notification 1', time: '2m' },
        { id: 2, title: 'Notification 2', time: '5m'},
        { id: 3, title: 'Notification 3', time: '10m'},
    ];    


    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='relative'>
                <BsBell size={20} />
                {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-3 w-3 flex items-center justify-center text-xs'>{unreadCount}</span>
                )}
            </button>
            {isOpen && <NotificationDropDown setIsOpen={setIsOpen} notifications={notifications} />} 
        </div>
    );
};

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



export default NotificationButton;