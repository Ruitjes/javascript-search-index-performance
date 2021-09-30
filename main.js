const si = require('search-index');
const levelup = require('levelup')
const memdown = require('memdown')
const moviesJSON = require('./movies28000.json'); 

var movies = JSON.parse(JSON.stringify(moviesJSON))
console.log(movies)

async function asyncCall() {
    const searchIndex = await si({db: levelup(memdown())});

    console.log("SEARCH LIBRARY", searchIndex)

    const t0 = window.performance.now();
    // add documents to the index
    await searchIndex.PUT(movies)
    const t1 = window.performance.now();
    console.log('INDEXING TIME', t1 - t0)

    document.getElementById("index").innerHTML = "INDEXING TIME: " + (t1 - t0) + " Msec";

    // read documents from the index
    const t2 = window.performance.now();
    const results = await searchIndex.QUERY('the')
    const t3 = window.performance.now();

    console.log('SEARCHING TIME', t3 - t2)
    document.getElementById("search").innerHTML = "SEARCHING TIME: " + (t3 - t2) + " Msec";

    console.log('SEARCH RESULTS', results);
    document.getElementById("result").innerHTML = "RESULT IN CONSOLE";
  }

asyncCall()
