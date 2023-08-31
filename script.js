const handleCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const data = await response.json();
    const tabContainer =document.getElementById("tab-container");
    data.data.forEach((category)=> {
        const div =document.createElement("div");
        div.innerHTML=`
        <button onclick="handleLoadVideos('${category.category_id}')" class="py-2 px-5 text-lg font-medium text-[#252525b3] bg-[#25252526] rounded"> ${category.category} </button> 
        `;

        tabContainer.appendChild(div);
    });
    };

    const handleLoadVideos = async(categoryId) => {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();
        console.log(data.data);
    };

 
handleCategory();