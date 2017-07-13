var cities = [];
var totalCities = 15;
var popSize=3000;
var population= [];
var fitness= [];
var citiesBr = [];
var currentBest;
// var order = [];
// var countDispay;
// var totalPermutations;
// var count = 0;


var recordDistance= Infinity;
var bestEver;

function setup() {
  frameRate(20);
  createCanvas(1400, 730);
  var order= [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(40,width/2-40), random(40,height-100));
    cities[i] = v;
    citiesBr[i] = v;
    order[i]=i;
  }

  var dBR = calcDistanceBR(citiesBr);
  recordDistanceBR = dBR;
  bestEverBr = citiesBr.slice();

  //pop
  for(var i=0; i< popSize;i++ ){
    population[i]= shuffle(order); //DEFAULT FISHER -YATES SHUUFLE ALGORITHM
    //shuffle(population[i],100);
  }


 
  // console.log(population);



  countDispay=createP();
  // var d = calcDistance(cities, order);
  // recordDistance = d;
  // bestEver = order.slice();

  // totalPermutations = factorial(totalCities);
  // console.log(totalPermutations);

}

function draw() {
  background(51);
 //genetic algo

  calculateFitness();
  normalizeFitness();
  nextGeneration();
  push()
  textSize(12);
  text('Generation  : ' +frameCount,20,27)
  text('Population : 3000  ; Mutation : 0.1 % ',20, 44)











  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(0, 250, 255);
  strokeWeight(6);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  stroke(250, 220, 25);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();


   noStroke();
  fill(0,255,0);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

fill(255);
textSize(22);
text("Genetic Algorithm               ", 20, height-30);
text("(Evolutionary Machine Learning)                   <1000 seconds", 20, height-10)

    //BRUTE-----------------------------BRUTE-------------------------------BRUTE----------------------//
    translate(width/2,0)
     stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < citiesBr.length; i++) {
    vertex(citiesBr[i].x, citiesBr[i].y);
  }
  endShape();

    stroke(255 , 0, 0);
  strokeWeight(5);
  noFill();
  beginShape();
  for (var i = 0; i < citiesBr.length; i++) {
    vertex(bestEverBr[i].x, bestEverBr[i].y);
  }
  endShape();

  var i = floor(random(citiesBr.length));
  var j = floor(random(citiesBr.length));
  swap(citiesBr, i, j);

  var dBR = calcDistanceBR(citiesBr);
  if (dBR < recordDistanceBR) {
    recordDistanceBR = dBR;
    bestEverBr = citiesBr.slice();
  }

  noStroke();
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }
  //BRUTE----------------------------------BRUTE----------------------------BRUTE--------------------------//
  
  
  


  // var d = calcDistance(cities, order);
  // if (d < recordDistance) {
  //   recordDistance = d;
  //   createP(recordDistance );
  //   bestEver = order.slice();
  // }
  // //
  // countDispay.html(count + ' /' + totalPermutations);  
  // textSize(22);
  // // var s = '';
  // // for (var i = 0; i < order.length; i++) {
  // //   s += order[i];
  // // }
  // fill(255);
  // var percent = 100 * (count / totalPermutations);
  
  //text(nf(percent, 0, 2) + "% completed", 20, height - 50);

  // nextOrder();
  text("Lexicographical Ordering Algorithm", 20, height-30)
  text("(Brute Force)                                                       >10000 Years", 20, height-10)


}

function calcDistanceBR(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}


function shuffle(a,num){
for(var i=0;i<num; i++ ){
  var indexA = floor(random(a.length));
  var indexB = floor(random(a.length));
  swap(a,indexA,indexB)
}
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// This is my lexical order algorithm

// function nextOrder() {
//   count++;

//   // STEP 1 of the algorithm
//   // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
//   var largestI = -1;
//   for (var i = 0; i < order.length - 1; i++) {
//     if (order[i] < order[i + 1]) {
//       largestI = i;
//     }
//   }
//   if (largestI == -1) {
//     noLoop();
//     console.log('finished');
//   }

//   // STEP 2
//   var largestJ = -1;
//   for (var j = 0; j < order.length; j++) {
//     if (order[largestI] < order[j]) {
//       largestJ = j;
//     }
//   }

//   // STEP 3
//   swap(order, largestI, largestJ);

//   // STEP 4: reverse from largestI + 1 to the end
//   var endArray = order.splice(largestI + 1);
//   endArray.reverse();
//   order = order.concat(endArray);
// }

//  










function calculateFitness(){
  var currentRecord=Infinity;
   for(var i=0; i< population.length; i++)
    {var d = calcDistance(cities, population[i])
      if(d< recordDistance){
        recordDistance=d;
        bestEver= population[i];
      }
    if(d<currentRecord)
      {currentRecord = d;
       currentBest=population[i];}
      
      fitness[i]=pow( 1/d, 5);

    }
    console.log(recordDistance)
}

function normalizeFitness(){
  var sum =0;
  for(var i=0; i< fitness.length; i++)
  {sum+= fitness[i];
  }
  for(var i=0; i< fitness.length; i++)
  {fitness[i]/=sum;}
}


function nextGeneration(){
  var newPopulation =[];
  for(var i=0; i<population.length; i++)
    {var order =pickOne(population,fitness);
      mutate(order);
      newPopulation[i] =order;}

population=newPopulation;
}

function pickOne(list,prob){
  var index =0
  var r= random(1);

  while(r>0){
    r=r-prob[index];
    index++;
  }

  index--;
  return list[index].slice();
}

function mutate(order, mutationRate){
  var indexA= floor(random(order.length));
  var indexB= floor(random(order.length));
  swap(order, indexA, indexB);
}
  

