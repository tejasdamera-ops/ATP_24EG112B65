//write a funtion that recives any no of args  and return their sum

function sum(...a) {
    let sum=0;
   for (const element of a) {
    sum+=element
   }
   return sum;
}

let a=sum(1,2,3,4,55);
console.log(a);
