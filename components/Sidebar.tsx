import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-48 border-r bg-dark-200 border-gray-800">
            <div className="p-2 mt-10">
                <div className="bg-dark-300 rounded p-3 mb-4">
                    <div className="text-sm text-text-100 font-medium">PHA</div>
                </div>
                <div className="rounded p-3 mb-4">
                    <div className="text-text-100 text-sm">Fund Analysis</div>
                </div>
                <div className="rounded p-3 mb-4">
                    <div className="text-text-100 text-sm">Holdings</div>
                </div>
                <div className="rounded p-3 mb-4">
                    <div className="text-text-100 text-sm">Transactions</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;