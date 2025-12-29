import { FaExclamationTriangle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                            <FaExclamationTriangle className="text-yellow-400 text-xl" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-slate-700/50 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/20"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
