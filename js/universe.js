
// Global variable to track the current sorting order
let isDescendingOrder = false;

// Sort function to compare two universe objects by date
const sortByDate = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    return isDescendingOrder ? dateB - dateA : dateA - dateB;
};

// Function to update and display the sorted universe
const updateAndDisplaySortedUniverse = () => {
    isDescendingOrder = !isDescendingOrder; // Toggle sorting order
    allShowUniverse.sort(sortByDate); // Sort the universe array by date
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear the card container

    // Display the sorted universe
    displayUniverse(allShowUniverse, defultCount);
};

// Rest of your code remains the same
const defultCount = 6;
let allShowUniverse = [];
// control sorted
const dateWise = document.getElementById('date-wise');
const descending = document.getElementById('descending');
const seeMoreControl = document.getElementById('see-more-control');
//const backDefultControl = document.getElementById('back-defult-control');
if (true) {
    dateWise.classList.remove('hidden');
}
else {
    dateWise.classList.add('hidden');
}
document.getElementById('sort-by-date').addEventListener('click', function () {
    updateAndDisplaySortedUniverse();
    dateWise.classList.add('hidden');
    descending.classList.remove('hidden');
});

document.getElementById('descending-btn').addEventListener('click', function () {
    updateAndDisplaySortedUniverse();
    descending.classList.add('hidden');
    dateWise.classList.remove('hidden');
});

const loadData = async () => {
    try {
        const toolsUrl = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(toolsUrl);
        const data = await res.json();
        allShowUniverse = data.data.tools;
        displayUniverse(allShowUniverse, defultCount);
    }
    catch (error) {
        console.log(error);
    }
};

const displayUniverse = (universe, count) => {
    //console.log(universe);
    const cardContainer = document.getElementById('card-container');
    //data reset
    cardContainer.innerHTML = '';

    // see more and back defult control
    const seeMoreControl = document.getElementById('see-more-control');
    const backDefultControl = document.getElementById('back-defult-control');
    if (allShowUniverse.length > defultCount) {
        seeMoreControl.classList.remove('hidden');
    }
    else {
        seeMoreControl.classList.add('hidden');

    }
    const seeMoreUniverse = () => displayUniverse(allShowUniverse, allShowUniverse.length);
    document.getElementById('see-more-btn').addEventListener('click', function () {
        seeMoreUniverse();
        backDefultControl.classList.remove('hidden');
        seeMoreControl.classList.add('hidden');
    });

    const backDefultUniverse = () => displayUniverse(allShowUniverse, defultCount);
    document.getElementById('back-defult-btn').addEventListener('click', function () {
        backDefultUniverse();
        seeMoreControl.classList.remove('hidden');
        backDefultControl.classList.add('hidden');
    });

    // end see more and back defult control

    for (let i = 0; i < count; i++) {
        if (universe[i]) {
            const universeData = universe[i];
            //console.log(universeData) // 6 universecard show
            const universeCard = document.createElement('div');
            universeCard.classList.add('hover:animate-bounce', 'p-3', 'rounded', 'border-2', 'shadow-lg');
            universeCard.innerHTML = `
          <img class="rounded-lg" src="${universeData.image}" alt="">
          <h3 class="capitalize text-xl my-3.5 font-medium">features</h3>
      <ol class="text-slate-500 list-decimal list-inside">
        <li class="">${universeData.features[0]}</li>
        <li>${universeData.features[1]}</li>
        <li>${universeData.features[2]}</li>
      </ol>
          <span class="block my-6"><hr></span>
     <div class="flex justify-between">
        <h3 class="capitalize text-xl mt-3 font-medium">${universeData.name}</h3>
        <span onClick="getDetailsUniverseItem('${universeData.id}')" class="block flex cursor-pointer relative"><i class="animate-bounce fas fa-arrow-right bg-red-50 text-red-300 p-3 rounded-full absolute top-5 right-3"></i></span>
      </div>

      <div class="my-4 flex text-zinc-400">
      <span class="mx-2"><i class="fas fa-calendar"></i></span>
      <span>${universeData.published_in}</span>

      </div>
        `;
            cardContainer.appendChild(universeCard);
        }
    }
};

//get details by modal
const getDetailsUniverseItem = async (id) => {
    try {
        const idUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const res = await fetch(idUrl);
        if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        const data = await res.json();
        displyUniverseDetails(data.data)
    }
    catch (error) {
        console.error("An error occurred:", error);
        // You can also handle the error in other ways, such as showing a message to the user:
        alert("An error occurred while fetching phone details. Please try again later.");
    }
};

const displyUniverseDetails = singUnivers => {
    console.log(singUnivers);
    const modalUniverse = document.getElementById('universe-modal');
    modalUniverse.classList.remove('hidden');

    const detailsInfo = document.getElementById('details-info');
    const detailsBannar = document.getElementById('details-bannar');

    detailsInfo.innerHTML = `
    <p class="text-left">${singUnivers.description}</p>   
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
    <p class="bg-white rounded-lg py-3 px-5 capitalize text-lime-400">${singUnivers.pricing ? singUnivers.pricing[0].price + ' ' + singUnivers.pricing[0].plan : 'free of cost/ basic'}</p>
    <p class="bg-white rounded-lg py-3 px-5 capitalize text-yellow-400">${singUnivers.pricing ? singUnivers.pricing[1].price + ' ' + singUnivers.pricing[1].plan : 'free of cost/ pro'}</p>
    <p class="bg-white rounded-lg py-3 px-5 capitalize text-fuchsia-400">${singUnivers.pricing ? singUnivers.pricing[2].price + ' ' + singUnivers.pricing[2].plan : 'free of cost/ enterprice'}</p>
    </div>
    
   <div class="md:flex justify-between">
  <div class="md:w-1/2">
   <h3 class="capitalize mt-5 mb-3">features</h3>
    <ul class="text-slate-500 list-disc list-inside">
        <li>${singUnivers.features[1].feature_name}</li>
        <li>${singUnivers.features[2].feature_name}</li>
        <li>${singUnivers.features[3].feature_name}</li>
      </ul>
  </div>
   <div class="md:w-1/2">
   <h3 class="capitalize mt-5 mb-3">integrations</h3>
  <ul class="text-slate-500 list-disc list-inside">
    <li>${singUnivers.integrations && singUnivers.integrations[0] ? singUnivers.integrations[0] : 'No data found'}</li>
    <li>${singUnivers.integrations && singUnivers.integrations[1] ? singUnivers.integrations[1] : 'No data found'}</li>
    <li>${singUnivers.integrations && singUnivers.integrations[2] ? singUnivers.integrations[2] : 'No data found'}</li>
</ul>
  </div>
   </div>
    `;

    detailsBannar.innerHTML = `
       <img class="rounded" src="${singUnivers.image_link[0]}" alt="">
       <h3 class="mt-3 text-center">${singUnivers.input_output_examples && singUnivers.input_output_examples[0].input ? singUnivers.input_output_examples[0].input : 'can you give any example'}</h3>
       <p class="mt-3 text-center">${singUnivers.input_output_examples && singUnivers.input_output_examples[0].output ? singUnivers.input_output_examples[0].output : 'no! not yet! tske a breck'}</p>
        <p id="accuracy" class="absolute top-2 right-2 bg-red-400 text-white p-1 z-10 rounded-xl text-center w-36"><span>${singUnivers.accuracy.score}</span> % accuracy</p>
       `;
    const accuracyControl = document.getElementById('accuracy');
    if (singUnivers.accuracy.score === null) {
        accuracyControl.classList.add('hidden');
    };

    document.getElementById('close-btn').addEventListener('click', function () {
        modalUniverse.classList.add('hidden');
    })
}


loadData();
//
