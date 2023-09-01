
const loadData = async() =>{
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const categories = await response.json();
  const dataAll = categories.data
  displayCategories(dataAll);
  
}

const displayCategories =(dataAll) =>{
const divContainer = document.getElementById('category-container');
dataAll.forEach(data =>{
  const div = document.createElement('div');
  div.classList = `bg-base-200 mr-10 p-2`
  div.innerHTML =`
  <a onclick="categoryVideo('${data.category_id}')" class="tab text-black font-semibold text-xl">${data.category}</a>
  `
  divContainer.appendChild(div);
})
}

const categoryVideo = async(categoryId) => {
  console.log(categoryId);
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
  const data = await response.json();
  const dataContainerLoop = data.data
  console.log(dataContainerLoop.length)
  // loop will execute with if else condition
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML = ''
  dataContainerLoop.forEach(video =>{
    const videoCard = document.createElement('div');
    videoCard.classList =`card w-full md:w-[320px] bg-base-100 shadow-xl h-[300px]`;
    videoCard.innerHTML=`
    <figure><img src="${video.thumbnail}" /></figure>
    <div class="card-body">
      <div class="flex gap-4">
        <div>
       <img class="w-[40px] h-[40px] rounded-full" src="${video.authors[0].profile_picture}" alt="">
        </div>
        <div>
          <h1 class="card-title">${video.title}</h1>
        <h5 class="card-title text-base">
        ${video.authors[0].profile_name}
          <div class="bg-transparent">${video.authors[0].verified ? '<i class="fa-solid fa-certificate" style="color: #0c56d4;"></i>' : ''}</div>
        </h5>
        <p>${video.others.views} views</p>
        </div>
        </div>
    `
    cardContainer.appendChild(videoCard);
  })
}

loadData();
categoryVideo("1000");