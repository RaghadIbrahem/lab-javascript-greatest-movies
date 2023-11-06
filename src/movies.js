// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);}

function cleanDirectors(directorsArray) {
    return [...new Set(directorsArray)];
  } 

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => {
        return (
          movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
        );
      }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) return 0;

    const validMovies = moviesArray.filter(movie => typeof movie.score === 'number');
    const totalScore = validMovies.reduce((acc, movie) => acc + movie.score, 0);
    const averageScore = totalScore / validMovies.length;

    return parseFloat(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));
    return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {const sortedMovies = moviesArray.slice().sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
  return sortedMovies;}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const sortedMovies = moviesArray.slice().sort((a, b) => a.title.localeCompare(b.title));
  const first20Titles = sortedMovies.slice(0, 20).map(movie => movie.title);
  return first20Titles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(movie => {
        const duration = movie.duration.split(' ');
        let totalMinutes = 0;
        for (const part of duration) {
          if (part.includes('h')) {
            totalMinutes += parseInt(part) * 60;
          } else if (part.includes('min')) {
            totalMinutes += parseInt(part);
          }
        }
        return { ...movie, duration: totalMinutes };
      });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;
    const yearScores = {};
    moviesArray.forEach((movie) => {
        const year = movie.year;
        yearScores[year] = yearScores[year] || { totalScore: 0, movieCount: 0 };
        yearScores[year].totalScore += movie.score;
        yearScores[year].movieCount++;
    });
    let bestYear = null;
    let bestAverage = -1;
    for (const year in yearScores) {
        const { totalScore, movieCount } = yearScores[year];
        const average = totalScore / movieCount;

        if (average > bestAverage || (average === bestAverage && year < bestYear)) {
            bestYear = year;
            bestAverage = average;
        }
    }
    return `The best year was ${bestYear} with an average score of ${bestAverage.toFixed(1)}`;
}