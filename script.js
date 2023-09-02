const handleCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const data = await response.json();
    const tabContainer =document.getElementById("tab-container");
    data.data.forEach((category)=> {
        const div =document.createElement("div");
        div.innerHTML=`
        <button onclick="handleLoadVideos('${category.category_id}')" class="py-2 hover:bg-[#FF1F3D] hover:text-white px-5 text-lg font-medium text-[#252525b3] bg-[#25252526] rounded"> ${category.category} </button> 
        `;

        tabContainer.appendChild(div);
    });
    };

    const handleLoadVideos = async(categoryId) => {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();
        const cardContainer=document.getElementById("card-container");
        cardContainer.innerHTML = "";
        cardContainer.classList.add("grid");

        if (data.status === false ) {
          const noContent = document.createElement("div");
          noContent.innerHTML =`
          <div class="mt-40 lg:ml-20 space-y-8">
          <img class="mx-auto" src="./Icon.png">
          <h1 class="text-3xl font-bold text-center text-black" >Oops!! Sorry, There is no <br> content here</h1>
          </div>
          `;
          cardContainer.appendChild(noContent);
          cardContainer.classList.remove("grid");
        }

        data.data.forEach((videos) => {
            const release = videos?.others?.posted_date;
            const div =document.createElement("div");
            div.innerHTML=`
            <div>
            <figure class="relative">
            <div class="h-[200px]">
            <img class="h-full w-full rounded-lg" src=${videos?.thumbnail}/>
            <h3 class="absolute bottom-4 rounded right-2 px-2 bg-[#171717] text-white">${releaseDate(release)}</h3>
            </div>
            </figure>
            <div class="card-body">
               <div class="flex gap-3">
                <div>
                <img class="h-10 w-10 rounded-full" src=${videos.authors[0].profile_picture}/>
                </div>
              <div class="space-y-2">
                <h4 class="font-bold text-[#171717]">${videos.title}</h4>
                <div class="flex gap-3">
                <p class="text-[#171717b3]">${videos.authors[0].profile_name}</p> 
                <p class="text-[#171717b3]">${videos.authors[0].verified?'<img src="./fi_10629607.svg">':''}</p>
                 
                </div>
                <p class="text-[#171717b3]">${videos.others.views} views</p>
              </div>
               </div>
            </div>
          </div>
            `;

        cardContainer.appendChild(div);

        
        });
    };



    const releaseDate = (date) => {
      const totalSeconds = date;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const formattedTime = `${hours} hrs ${minutes} min ago`;
  
      if (date !== "" && date !== undefined) {
         return formattedTime;
      } else {
          return "" ;
      }
  }



handleCategory();
handleLoadVideos("1000");