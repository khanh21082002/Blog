import React , { useEffect } from 'react';


export default function Header() {
    useEffect(() => {
        const handleScroll = () => {
          const blogHeader = document.querySelector('.blog-header');
          const maxWidthContainer = document.querySelector('.max-w-7xl');
          if (blogHeader) {
            if (window.scrollY > 0) {
              blogHeader.style.position = 'fixed';
              blogHeader.style.top = '0';
              blogHeader.style.width = maxWidthContainer.offsetWidth + 'px';
              blogHeader.style.zIndex = '1000';
            } else {
              blogHeader.style.position = 'static';
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className='w-full bg-[#00CCFF] h-12 flex justify-center items-center text-3xl font-bold text-white mb-3 blog-header'>
           Blog
        </div>
    )
}