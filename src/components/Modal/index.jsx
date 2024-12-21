import React from "react";

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl">
        {/* Modal content */}
        <div className="relative bg-orange-400 rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title} {/* Dynamic title */}
            </h3>
            <button onClick={onClose} className="rounded-lg text-sm w-8 h-8">
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4">{children}</div> {/* Dynamic body */}
          {/* Modal footer */}
          {footer && (
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              {footer} {/* Dynamic footer */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
