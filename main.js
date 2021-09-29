const si = require('search-index');
const moviesJSON = require('./movies28000.json'); 

var movies = JSON.parse(JSON.stringify(moviesJSON))
console.log(movies)

async function asyncCall() {
    // initialize an index
    const searchIndex = await si();

    await searchIndex.FLUSH()

    const t0 = window.performance.now();
    // add documents to the index
    await searchIndex.PUT(movies)
    const t1 = window.performance.now();
    console.log('INDEXING TIME', t1 - t0)

    // read documents from the index
    const t2 = window.performance.now();
    const results = await searchIndex.QUERY('title:a')
    const t3 = window.performance.now();
    console.log('SEARCHING TIME', t3 - t2)
    
    console.log('SEARCH RESULTS', results);

  }

asyncCall()
