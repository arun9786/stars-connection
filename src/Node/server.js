// let userObject = {
//   "6379185147": "6379185147",
//   "6379185148": "6379185148",
//   "6379185149": "6379185149"
// }

// function findObjectWithValue(obj, targetValue, childValue) {
//   for (let item in obj) {
//     console.log("item", item)
//     if (item === targetValue) {
//       // console.log("parent", item);
//       if (typeof obj[item] === 'object') {
//         console.log("came object", obj[item])
//         obj[item][childValue] = childValue;
//       } else {
//         console.log("here", obj);
//         obj = { ...obj, [item]: { [childValue]: childValue } }
//         console.log("final",obj);
//         return obj;
//       }
//     }
//     else {
//       console.log("came", obj[item]);
//       if (typeof obj[item] === 'object') {
//         let val = findObjectWithValue(obj[item], targetValue, childValue)
//         // console.log("console",item);
//         obj = { ...obj, [item]: val };
//       }
//     }
//   }
//   return obj;
// }

// const grandparent = "6379185148";

// const updateArray = (obj, param1, param2) => {
//   console.log(grandparent, param1);
//   if (grandparent === param1) {
//     let newObj={};
//     if(typeof obj==='object'){
//       newObj={...obj,[param2]:param2}
//     }else{
//       newObj={[param2]:param2}
//     }
//     return newObj;
//   } else {
//     console.log("it's object", obj);
//     if (typeof obj === 'object') {
//       return findObjectWithValue(obj, param1, param2);
//     }
//     else {
//       let obj = { [param2]: param2 }
//       return obj;
//     }
//   }
// };

// // console.log("initial", JSON.stringify(userObject));
// // userObject ={...userObject, [grandparent]: updateArray(userObject[grandparent], "6379185147","9786639019")}
// // console.log("end", JSON.stringify(userObject));
// // userObject ={...userObject, [grandparent]: updateArray(userObject[grandparent], "9786639019","9165748374")}
// // console.log("end", JSON.stringify(userObject));
// // userObject ={...userObject, [grandparent]: updateArray(userObject[grandparent], "6379185147","9165748375")}
// // console.log("end", JSON.stringify(userObject));
// userObject ={...userObject, [grandparent]: updateArray(userObject[grandparent], "6379185148","6767676767")}
// console.log("end", JSON.stringify(userObject));
// // test = { [grandparent]: updateArray(userObject[grandparent], "6379185147", "7878787878") };
// // userObject ={...userObject,test}
// // console.log("end", JSON.stringify(userObject));
// // userObject = updateArray("6379185147", "9159934557");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("6379185147", "9159934559");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("6767676767");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("9159934557", "7878787878");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("9159934557", "8989898989");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("7878787878", "1111111111");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("1234123456");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("6767676767", "4567895345");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("1111111111", "6453426272");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("4567895345", "5656565656");
// // console.log(JSON.stringify(userObject));
// // userObject = updateArray("9159934559", "8765908743");
// // console.log(JSON.stringify(userObject));
// // console.log(ar);
// // updateArray("6379185139");
// // console.log(ar)


const phoneEncoderForReferal =(phoneNumber)=>{
  const shuffledArray = [
      'A', '7', 'j', '3', 'D', 'N', 'X', 'W', 'z', 'h',
      'B', 'a', 'k', 'w', '5', 'R', '9', 'p', 'U', 'l',
  ]
  let referalCode='';
  for( let i=0;i<10;i++){
      let number=parseInt(phoneNumber[i]);
      if(i%2==0){
          referalCode+=shuffledArray[number];
      }else{
          referalCode+=shuffledArray[19-number];
      }
  }
  console.log(referalCode);
}

phoneEncoderForReferal("6379185147")
