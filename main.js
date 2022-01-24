const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "https://project-5492a-default-rtdb.firebaseio.com",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// console.log("QQ")
firebase.initializeApp(firebaseConfig);

//從firebase的資料show在網頁上
let list = document.getElementById("list");
let sort = document.getElementById("sort");
let familyRef = firebase.database().ref().child("family");
render();

//監聽sort value
sort.addEventListener("change", function(e){
  list.innerHTML = "";
  
  if(sort.value !== ""){
    familyRef.orderByChild(sort.value).once("value", function(snapshot){
      let str = "";
      snapshot.forEach(function(item){
        str+= `
        <li class="list-group-item">
        title: ${item.val().title}, age: ${item.val().age}, weight: ${item.val().weight}, height: ${item.val().height}
        </li>
        `
      })
      list.innerHTML = str;
    })
  }
  else{
    render();
  }
});

//render畫面
function render(){
  familyRef.once("value", function(snapshot){
    let str = "";
    let data = snapshot.val();
    for(let key in data){
      str+= `<li class="list-group-item">
      title: ${data[key].title}, age: ${data[key].age}, weight: ${data[key].weight}, height: ${data[key].height}
      </li>
      `
    };
    list.innerHTML = str;
  })
}  


// firebase.database().ref("family").set({
//   "father":{
//       "title": "father",
//       "age": 44,
//       "weight": 88,
//       "height": 178
//   },
//   "mom":{
//       "title": "mom",
//       "age": 42,
//       "weight": 66,
//       "height": 166
//   },
//   "son":{
//       "title": "son",
//       "age": 13,
//       "weight": 40,
//       "height": 133
//   },
//   "daughter":{
//       "title": "daughter",
//       "age": 8,
//       "weight": 35,
//       "height": 110
//   }
// });
