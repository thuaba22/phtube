const handleCatagory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    
    data.data.forEach((category) => {
       const div = document.createElement('div');
       div.innerHTML = `
       <button onclick="handleLoadVideos('${category.category_id}')" class="btn  bg-[#25252533] focus:outline-none focus:ring focus:bg-[#FF1F3D] focus:text-white focus:ring-[#FF1F3D]  text-[#252525] font-medium text-lg normal-case rounded-[4px] mb-10">${category.category}</button>
       `;
       tabContainer.appendChild(div);
       
    });
    
   };
   const handleLoadVideos = async(categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
   if(data.data.length === 0){
    const noVideoDiv = document.createElement('div');
    noVideoDiv.innerHTML = `
    
        <div class="grid grid-cols-1 col-span-4 justify-center items-center mt-20">
        <figure>
        <img class="mx-auto" src="./images/Icon.png" alt="">
        <figcaption>
        <h1 class="text-2xl text-center font-bold">Oops!! Sorry, There is no content here</h1>
        </figcaption>
        </figure>
          
        </div>
    
    
    `;
    cardContainer.classList.remove('grid');
    cardContainer.appendChild(noVideoDiv);

   }

   else{
    data.data.forEach((videos) => {
        const div = document.createElement('div');
        const postedTime = videos.others?.posted_date;
        const hour = Math.floor(postedTime/3600);
        const min = Math.floor((postedTime%3600) / 60);
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl" data-views="${videos.others?.views || 0}">
                    <figure class="relative"><img class="h-[200px] w-full" src="${videos.thumbnail}" alt="Shoes" />
                    ${videos.others?.posted_date ? `<div class="bg-[#171717] absolute bottom-3 right-3 rounded-[4px]">
                    <p class="text-white text-[10px] p-1">${hour} hr ${min} min ago</p>
                    </div>` : ''}
                    
                    </figure>
                    
                    <div class="card-body flex flex-row">
                   <div>
                   <img
                   class="h-[40px] w-[40px] rounded-full"  src="${videos.authors[0]?.profile_picture}"
                   />
                  </div>
                  <div>
                     <h3 class="card-title text-[#171717] font-bold text-sm">${videos.title}</h6>
                     <div class="flex flex-row items-center">
                    <div>
                    <small>${videos.authors[0]?.profile_name}</small>
                    </div>
                    <div>
                    <p>${videos.authors[0]?.verified? ' <img src="./images/icons8-verified-badge-16.png" alt="">' :''}</p>
                    </div>
                    </div>
                    <small>${videos.others?.views} views</small>
                  </div>
                   </div>
                  </div>
                      
        `;
        cardContainer.classList.add('grid');
        cardContainer.appendChild(div);
    
    
        });
   }


   }

   const sortVideos = () => {

    const cardContainer = document.getElementById('card-container');
    const cardElement = cardContainer.querySelectorAll('.card');
    const cardsArray = [];
    for(const card of cardElement){
        cardsArray.push(card);
    }
    cardsArray.sort((a,b)=>{
        const views1 = parseInt(a.getAttribute('data-views')) || 0;
        const views2 = parseInt(b.getAttribute('data-views')) || 0;
        return views2 - views1;
    });
    cardContainer.innerHTML = '';
    for(const card of cardsArray){
        cardContainer.appendChild(card);

    }
   }
   const sortByViewsButton = document.getElementById('sorting-views');
sortByViewsButton.addEventListener('click', sortVideos);
   handleCatagory();
   handleLoadVideos('1000');