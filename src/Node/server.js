let ar = [
  {
    "6379185147": {
      "6379185148": "6379185148",
      "6379185149": {
        "6379185150": "6379185150",
        "6379185151": {
            "9156789012":"9156789012"
        }
      }
    }
  },
  {
    "6379185247": {
      '6379185248': "6379185248",
      "6379185349": {
        "6379285150": "6379285150",
        "6379285151": {
          "9786639017": "9786639017"
        }
      }
    }
  },
  {
    "9159934457": "9159934457"
  }
];

function findObjectWithValue(arr, targetValue, childValue) {
  for (const item of arr) {
    if(item[targetValue]){
        item[targetValue][childValue]=childValue;
        return ar;
    }else{
        if (typeof item === 'object') {
          const result = findObjectWithValue(Object.values(item), targetValue, childValue);
          if (result) {
            return;
          }
        } else if (item === targetValue) {
          console.log(arr);
          return;
        }
    }
  }
}

const updateArray = (param1, param2) => {
  if (param2) {
    findObjectWithValue(ar,param1,param2);
  } else {
    console.log(param2);
    let obj={[param1]:param1}
    ar.push(obj);
  }
};
// updateArray("9159934458");
updateArray("9159934459");
console.log(JSON.stringify(ar));
// console.log(ar);
// updateArray("6379185139");
// console.log(ar);