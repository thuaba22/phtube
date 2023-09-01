const handleCatagory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
       const div = document.createElement('div');
       div.innerHTML = `
       <button onclick="handleLoadVideos('${category.category_id}')" class="btn bg-[#25252533] hover:bg-[#FF1F3D] hover:text-white text-[#252525] font-medium text-lg normal-case rounded-[4px]">${category.category}</button>
       `;
       tabContainer.appendChild(div);
    });
    
   };
   handleCatagory();