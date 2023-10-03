
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
            universeCard.classList.add('p-3', 'rounded', 'border-2', 'shadow-lg');
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
        <span onClick="getDetailsUniverseItem('${universeData.id}')" class="block flex cursor-pointer relative"><i class="fas fa-arrow-right bg-red-50 text-red-300 p-3 rounded-full absolute top-5 right-3"></i></span>
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
    
    `;
    detailsBannar.innerHTML = `
    <img class="rounded" src="${singUnivers.image_link[0]}" alt="">
    `;

    document.getElementById('close-btn').addEventListener('click', function () {
        modalUniverse.classList.add('hidden');
    })
}


loadData();
//
