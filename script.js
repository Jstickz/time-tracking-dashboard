// Periods of Reports variable Declaration
const dailyButton = document.getElementById("daily");
const weeklyButton = document.getElementById("weekly");
const monthlyButton = document.getElementById("monthly");

let returnedData = 0;

async function getUserData() {
  const response = await fetch("./data.json");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`); 
  }

  const data = await response.json();
  return data;
}

const promise = getUserData();
promise
  .then((data) => {
    returnedData = data;
  })
  .catch((error) => {
    console.log(`Could not get user data: ${error}`);
  });


const activities = ["work", "play", "study", "exercise", "social", "selfcare"];

const dailyUpdate = () => {
  activities.forEach((activity, index) => {
    const primaryHoursElement = document.getElementById(
      `${activity}-primary-hours`
    );
    const secondaryHoursElement = document.getElementById(
      `${activity}-secondary-hours`
    );

    if (returnedData[index]) {
      primaryHoursElement.innerHTML = `${returnedData[index]["timeframes"]["daily"]["current"]}`;
      secondaryHoursElement.innerHTML = `Yesterday - ${returnedData[index]["timeframes"]["daily"]["previous"]}`;
    }
  });
};

const weeklyUpdate = () => {
  activities.forEach((activity, index) => {
    const primaryHoursElement = document.getElementById(
      `${activity}-primary-hours`
    );
    const secondaryHoursElement = document.getElementById(
      `${activity}-secondary-hours`
    );

    if (returnedData[index]) {
      primaryHoursElement.innerHTML = `${returnedData[index]["timeframes"]["weekly"]["current"]}`;
      secondaryHoursElement.innerHTML = `Last Week - ${returnedData[index]["timeframes"]["weekly"]["previous"]}`;
    }
  });
};

const monthlyUpdate = () => {
  activities.forEach((activity, index) => {
    const primaryHoursElement = document.getElementById(
      `${activity}-primary-hours`
    );
    const secondaryHoursElement = document.getElementById(
      `${activity}-secondary-hours`
    );

    if (returnedData[index]) {
      primaryHoursElement.innerHTML = `${returnedData[index]["timeframes"]["monthly"]["current"]}`;
      secondaryHoursElement.innerHTML = `Last Month - ${returnedData[index]["timeframes"]["monthly"]["previous"]}`;
    }
  });
};

dailyButton.onclick = dailyUpdate;
weeklyButton.onclick = weeklyUpdate;
monthlyButton.onclick = monthlyUpdate;
