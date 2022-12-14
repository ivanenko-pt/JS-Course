'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// 248.Our First AJAX Call: XMLHttpRequest
/*
const getCountyData = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const currencySymbol =
      data.currencies[Object.keys(data.currencies)[0]].name;
    const languageCountry = data.languages[Object.keys(data.languages)[0]];
    console.log(currencySymbol);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${languageCountry}</p>
      <p class="country__row"><span>💰</span>${currencySymbol}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountyData(`portugal`);
getCountyData(`ukraine`);
getCountyData(`germany`);
getCountyData(`USA`);
*/
// 250. Callback HELL
/*

const renderCountry = function (data, className = ``) {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[Object.keys(data.currencies)[0]].name
        }</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountyAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country
    renderCountry(data);

    // Get eighbour country (2)
    // const [neighbour] = data.borders?.[0];
    const [neighbour] = data.borders;

    // console.log(neighbour);
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(`GET`, `https://restcountries.com/v3.1/alpha/${neighbour}`);

    request2.send();
    request2.addEventListener(`load`, function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, `neighbour`);
    });
  });
};

// getCountyAndNeighbour(`usa`);
getCountyAndNeighbour(`spain`);

setTimeout(() => {
  console.log(`1 second passed`);
}, 1000);
*/

// 251. Promises
// const renderCountry = function (data, className = ``) {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${
//           data.languages[Object.keys(data.languages)[0]]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           data.currencies[Object.keys(data.currencies)[0]].name
//         }</p>
//       </div>
//     </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// v.1.0
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      const neighbour = data[0].borders[0];
      console.log(neighbour);

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

// getCountryData(`portugal`);
getCountryData(`usa`);
*/
// 254. Handling Rejected promise

// const renderCountry = function (data, className = ``) {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${
//           data.languages[Object.keys(data.languages)[0]]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           data.currencies[Object.keys(data.currencies)[0]].name
//         }</p>
//       </div>
//     </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText(`beforeend`, msg);
//   // countriesContainer.style.opacity = 1;
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.com/v3.1/alpha/${country}`,
//     `Country not found`
//   )
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       console.log(neighbour);

//       if (!neighbour) throw new Error(`No neighbour found`);

//       // Country 2
//       getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         `Neighbour not found`
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener(`click`, function () {
//   getCountryData(`usa`);
// });

// getCountryData(`australia`);
// OLD wersion
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const neighbour = data[0].borders[0];
//       console.log(neighbour);

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     // if promise rejected
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}.Try again!`);
//     })
//     // always use in finali promise
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener(`click`, function () {
//   getCountryData(`spain`);
// });

// #258
// console.log(`Test start`);
// setTimeout(() => console.log(`0 sec timer`), 0);
// Promise.resolve(`Resolved promise 1`).then(res => console.log(res));

// Promise.resolve(`Resolved promise 2`).then(res => {
//   for (let i = 0; i < 10; i++) {}
//   console.log(res);
// });

// console.log(`Test end`);

//#259 Simple Promise
/*const lotteryPromise = new Promise(function (reslove, reject) {
  console.log(`Lotery draw is LOL`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      reslove(`You WIN 💦`);
    } else {
      reject(new Error(`You lost your money 💢`));
    }
  }, 200);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (reslove) {
    setTimeout(reslove, (seconds = 1000));
  });
};

wait(1)
  .then(() => {
    console.log(`I waited for a 2 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for a 3 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for a 4 seconds`);
    return wait(5);
  })

  .then(() => console.log(`I waited a 5 second`));

Promise.resolve(`abc`).then(x => console.log(x));
Promise.reject(new Error(`PROBLEM!`)).catch(x => console.error(x));
*/
// 260 Promisifing GEO

// const renderCountry = function (data, className = ``) {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${
//           data.languages[Object.keys(data.languages)[0]]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           data.currencies[Object.keys(data.currencies)[0]].name
//         }</p>
//       </div>
//     </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getPostition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve (position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPostition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPostition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       console.log(pos.coords);

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener(`click`, whereAmI);

// #2 codding
/*const imgContainer = document.querySelector(`.images`);

const wait = function (seconds) {
  return new Promise(function (reslove) {
    setTimeout(reslove, (seconds = 1000));
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement(`img`);
    img.src = imgPath;

    img.addEventListener(`load`, function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener(`error`, function () {
      reject(new Error(`Image not found`));
    });
  });
};

let currentImg;
createImage(`img/img-1.jpg`)
  .then(img => {
    currentImg = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  // 2 img
  .then(() => {
    currentImg.style.display = `none`;
    return createImage(`img/img-2.jpg`);
  })
  .then(img => {
    currentImg = img;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = `none`;
    return createImage(`img/img-3.jpg`);
  })
  // 3 img
  .then(img => {
    currentImg = img;
    console.log(`Images 3 load`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = `none`;
  })

  .catch(err => console.error(err));
*/

//  262 Async/ Avai

/* 
const renderCountry = function (data, className = ``) {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[Object.keys(data.currencies)[0]].name
        }</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPostition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAreYou = async function () {
  try {
    // Geolocation
    const pos = await getPostition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();

    // Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    // FIX country
    if (!res.ok) throw new Error(`Problem getting  country`);
    // FIX geo
    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💢`);
    renderError(`💢 ${err.message}`);

    // Reject promise returned from acync fucntion
    throw err;
  }
};

console.log(`1: Will get location`);
// Old way
// const city = whereAreYou();
// console.log(city);
// whereAreYou()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} ❌`))
//   .finally(() => console.log(`3: Finised getting`));
// New  way return data from acync fucntion
(async function () {
  try {
    const city = await whereAreYou();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} ❌`);
  }
  console.log(`3: Finised getting`);
})();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// **
// fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => console.log(res));
*/
// 265 Runnig promise in Parallel
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries(`portugal`, `usa`, `canada`);
*/
// 266 Other Promise Combinators: race, allSettled and any
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/usa`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long!`));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5),
])
.then(res => console.log(res[0]))
.catch(err => console.error(err));

// allSettled
Promise.allSettled([
  Promise.resolve(`Success`),
  Promise.reject(`ERROR`),
  Promise.resolve(` Aonther Success`)
]).then(res=> console.log(res))

Promise.all([
  Promise.resolve(`Success`),
  Promise.reject(`ERROR`),
  Promise.resolve(` Aonther Success`)
]).then(res=> console.log(res)).catch(err => console.error(err))
// promise.any [es2021]
Promise.any([
  Promise.resolve(`Success`),
  Promise.reject(`ERROR`),
  Promise.resolve(` Aonther Success`)
]).then(res=> console.log(res)).catch(err => console.error(err))
*/
// #3 Codding
// const imgContainer = document.querySelector(`.images`);

// const wait = function (seconds) {
//   return new Promise(function (reslove) {
//     setTimeout(reslove, (seconds = 1000));
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement(`img`);
//     img.src = imgPath;

//     img.addEventListener(`load`, function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener(`error`, function () {
//       reject(new Error(`Image not found`));
//     });
//   });
// };

// // let currentImg;
// // (async function() {
// // createImage(`img/img-1.jpg`)
// //   .then(img => {
// //     currentImg = img;
// //     console.log(`Image 1 loaded`);
// //     return wait(2);
// //   })
// //   // 2 img
// //   .then(() => {
// //     currentImg.style.display = `none`;
// //     return createImage(`img/img-2.jpg`);
// //   })
// //   .then(img => {
// //     currentImg = img;
// //     console.log(`Image 2 loaded`);
// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImg.style.display = `none`;
// //     return createImage(`img/img-3.jpg`);
// //   })
// //   // 3 img
// //   .then(img => {
// //     currentImg = img;
// //     console.log(`Images 3 load`);
// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImg.style.display = `none`;
// //   })

// //   .catch(err => console.error(err));
// // })()
// // Part 1
// const loadNPause = async function() {
//   try{
//     //Load image 1
//     let img = await createImage(`img/img-1.jpg`)
//     console.log(`Image 1 loaded`);
//     await wait(2)
//     img.style.display = `none`;
//      //Load image 2
//       img = await createImage(`img/img-2.jpg`)
//      console.log(`Image 2 loaded`);
//      await wait(2)
//      img.style.display = `none`;
//        //Load image 3
//        img = await createImage(`img/img-3.jpg`)
//        console.log(`Image 3 loaded`);
//        await wait(2)
//        img.style.display = `none`;
//   }catch(err) {
// console.error(err);
//   }
// }
// // loadNPause()
// // PART 2 
// const loadAll = async function(imgArr) {
//   try{
//     const imgs = imgArr.map(async img =>  await createImage(img))
//     console.log(imgs)

// const imgEl = await Promise.all(imgs)
// console.log(imgEl);

// imgEl.forEach(img=> img.classList.add`parallel`)

//   }
//   catch(err){
//     console.log(err);
//   }
// }
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])