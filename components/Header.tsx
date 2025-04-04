import React from 'react';
import Image from "next/image";

const Header = () => {
    return (
        <header className="border-b bg-dark-200 border-gray-800 w-full relative">
                <div className="absolute left-6 top-0 p-4">
                    <Image src="/logo.png" alt="logo" width={24} height={24} />
                </div>
                <div className="flex justify-between items-center pl-48 pr-6 py-4 relative">
                    <nav className="flex space-x-8">
                            <a href="#" className="px-2 py-1 text-text-300">Home</a>
                            <a href="#" className="px-2 py-1 relative group text-text-100 font-bold">Portfolio
                                <div className="absolute left-0 right-0 -bottom-[20px] h-0.5 bg-card-bg"></div>
                            </a>
                            <a href="#" className="px-2 py-1 text-text-300">Mutual Funds</a>
                            <a href="#" className="px-2 py-1 text-text-300">Tools</a>
                            <a href="#" className="px-2 py-1 text-text-300">Transactions</a>
                    </nav>

                    <div className="flex  items-center space-x-4">
                        <button className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button className="p-2">
                            <svg width="27" height="22" className="h-5 w-5" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path strokeWidth={1.5} d="M25.2662 15.9511L25.204 16.2944L25.5047 16.4712L26.4645 17.0358C26.2157 17.7878 25.8219 18.4752 25.3188 19.0588L24.3704 18.501L24.0604 18.3187L23.789 18.5546C23.3756 18.9138 22.9017 19.1918 22.3898 19.3771L22.06 19.4965V19.8473V20.9775C21.328 21.1257 20.5528 21.1313 19.7859 20.9772V19.8473V19.4965L19.4562 19.3771C18.9443 19.1918 18.4704 18.9138 18.057 18.5546L17.7856 18.3187L17.4756 18.501L16.5276 19.0586C16.0236 18.4711 15.63 17.7866 15.3814 17.0357L16.3413 16.4712L16.6419 16.2944L16.5798 15.9511C16.4808 15.4042 16.4808 14.8458 16.5798 14.2989L16.6419 13.9556L16.3413 13.7788L15.3814 13.2142C15.6303 12.4622 16.0241 11.7748 16.5272 11.1912L17.4756 11.749L17.7856 11.9313L18.057 11.6954C18.4704 11.3362 18.9443 11.0582 19.4562 10.8729L19.7859 10.7535V10.4027V9.27254C20.518 9.12425 21.2932 9.11868 22.06 9.27283V10.4027V10.7535L22.3898 10.8729C22.9017 11.0582 23.3756 11.3362 23.789 11.6954L24.0604 11.9313L24.3704 11.749L25.3188 11.1912C25.8219 11.7748 26.2157 12.4622 26.4645 13.2142L25.5047 13.7788L25.204 13.9556L25.2662 14.2989C25.3652 14.8458 25.3652 15.4042 25.2662 15.9511ZM15.2522 17.1118C15.2512 17.1124 15.2502 17.1129 15.2492 17.1135L15.2492 17.1135L15.2522 17.1118ZM26.5939 13.1382C26.5948 13.1376 26.5958 13.137 26.5968 13.1365L26.5968 13.1365L26.5939 13.1382ZM16.4928 21.4902C16.8256 21.4902 17.1519 21.4078 17.4448 21.2625C17.4476 21.3028 17.4517 21.3424 17.4568 21.3813C17.2773 21.4576 17.0812 21.5 16.8768 21.5H2.02521C1.19183 21.5 0.5 20.8087 0.5 19.9375V18.15C0.5 15.2292 2.82466 12.875 5.6706 12.875H6.26631C7.24255 13.3134 8.3168 13.5625 9.451 13.5625C10.5845 13.5625 11.6627 13.3136 12.6361 12.875H13.0438C12.8714 13.7461 13.2326 14.6369 13.9742 15.1295C13.172 15.666 12.8127 16.663 13.0987 17.6027C13.4538 18.7791 14.0819 19.8798 14.9032 20.7849L14.9056 20.7875C15.3143 21.2314 15.8896 21.4902 16.4928 21.4902ZM13.0991 12.6545C13.0991 12.6545 13.0991 12.6546 13.0991 12.6546L13.2314 12.695L13.5774 12.8004L13.2314 12.6948L13.0991 12.6545ZM18.3809 15.125C18.3809 16.5391 19.5111 17.709 20.9272 17.709C22.3433 17.709 23.4735 16.5391 23.4735 15.125C23.4735 13.7102 22.3384 12.541 20.9272 12.541C19.516 12.541 18.3809 13.7102 18.3809 15.125ZM14.3516 5.5C14.3516 8.27039 12.1493 10.5 9.451 10.5C6.75273 10.5 4.55043 8.27039 4.55043 5.5C4.55043 2.72961 6.75273 0.5 9.451 0.5C12.1493 0.5 14.3516 2.72961 14.3516 5.5Z" stroke="white"/>
                            </svg>
                        </button>
                        <button className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
        </header>

    );
};

export default Header;