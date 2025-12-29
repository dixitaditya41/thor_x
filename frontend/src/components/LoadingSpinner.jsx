import { IoMdFootball } from 'react-icons/io';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative w-20 h-20">
                {/* Spinning outer ring */}
                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-pitch-green rounded-full animate-spin"></div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <IoMdFootball className="text-3xl text-pitch-green animate-pulse" />
                </div>
            </div>
            <p className="mt-4 text-slate-400 text-sm font-medium">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
