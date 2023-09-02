let currentCategoryId = "1000";
let videoData = []; // Global variable to store video data

const loadData = async () => {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categories = await response.json();
    const dataAll = categories.data;
    displayCategories(dataAll);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

const displayCategories = (dataAll) => {
  const divContainer = document.getElementById('category-container');
  divContainer.innerHTML = ''; // Clear existing content
  dataAll.forEach(data => {
    const div = document.createElement('div');
    div.classList = `bg-base-200 p-2 mx-10 my-2 md:mx-4 md:my-0 border-2 border-green-500`
    div.innerHTML = `
      <a onclick="categoryVideo('${data.category_id}')" class="tab text-black font-base text-xl">${data.category}</a>
    `;
    divContainer.appendChild(div);
  });
}

const categoryVideo = async (categoryId) => {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    videoData = data.data; // Store data globally
    displayData(); // Call the display function
  } catch (error) {
    console.error('Error loading category video:', error);
  }
}

// Function to display the data
const displayData = () => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  const noVideoCard = document.getElementById('no-video');
  noVideoCard.innerHTML = '';

  if (videoData.length === 0) {
    const videoCard = document.createElement('div');
    videoCard.innerHTML = `
      <div class="flex flex-cols justify-center items-end h-[300px]">
        <div> <img src="./resources/Icon.png" alt="">
        </div>
      </div>
      <h1 class="text-3xl font bold mt-4 text-center">Oops!! Sorry, There is no content here</h1>
    `;
    noVideoCard.appendChild(videoCard);
  } else {
    videoData.forEach(video => {
      // Extract hours and minutes from posted_date
      const { hours, minutes } = video.others.posted_date !== "" ? timeConversion(video.others.posted_date) : {};

      const videoCard = document.createElement('div');
      videoCard.classList = `card w-full md:w-[320px] bg-base-100 shadow-xl h-[300px]`;
      videoCard.innerHTML = `
        <figure><img src="${video.thumbnail}" /></figure>
        <div class="flex justify-end -mt-6 text-white"> ${hours !== undefined && minutes !== undefined
          ? `<p class="bg-black">${hours} hrs ${minutes} min ago</p>`
          : ''}
        </div>
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
        </div>
      `;
      cardContainer.appendChild(videoCard);
    });
  }
}

// Function to convert seconds to hours
const timeConversion = (postedDate) => {
  const integerSecond = parseInt(postedDate);
  const hours = parseInt(integerSecond / 3600);
  const minutes = parseInt((integerSecond % 3600) / 60);
  return { hours, minutes };
}

// Function to sort the data by views (can be called on button click)
const sortView = () => {
  console.log(videoData);
  videoData.sort((a,b) =>{
    const numA = parseInt(a.others.views)
    const numB = parseInt(b.others.views)
    return numB - numA;
  })

  // const emptyArray = [];
  // videoData.forEach(video =>{
  //   const view = video.others.views;
  //   emptyArray.push(view);
  // })
  // console.log(emptyArray);
  // emptyArray.sort((a, b) => b - a);

  // console.log(emptyArray);
  // emptyArray.sort((a,b) =>{
  //   const x = parseInt(a);
  //   const y= parseInt(b);
  //   return y - x;
  // })
  // console.log(emptyArray);
  // videoData.other.views;
  // console.log(view)

  // videoData.sort((a, b) => b.others.views - a.others.views);
  // console.log(a, b)
  displayData(); // Re-display the sorted data
}

// Initialize the data loading and category video display
loadData();
categoryVideo("1000");
