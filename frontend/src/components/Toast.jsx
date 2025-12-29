import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getToastConfig = () => {
        switch (type) {
            case 'success':
                return {
                    bgColor: 'bg-green-500/10 border-green-500/30',
                    textColor: 'text-green-300',
                    icon: <FaCheckCircle className="text-green-400" />,
                };
            case 'error':
                return {
                    bgColor: 'bg-red-500/10 border-red-500/30',
                    textColor: 'text-red-300',
                    icon: <FaExclamationCircle className="text-red-400" />,
                };
            case 'info':
            default:
                return {
                    bgColor: 'bg-blue-500/10 border-blue-500/30',
                    textColor: 'text-blue-300',
                    icon: <FaInfoCircle className="text-blue-400" />,
                };
        }
    };

    const config = getToastConfig();

    return (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
            <div className={`flex items-center gap-3 ${config.bgColor} backdrop-blur-xl border rounded-xl px-5 py-4 shadow-2xl min-w-[320px] max-w-md`}>
                <div className="text-xl">{config.icon}</div>
                <p className={`flex-1 ${config.textColor} font-medium text-sm`}>{message}</p>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors ml-2"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default Toast;
