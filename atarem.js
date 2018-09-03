
//document.getElementById("search-btn").addEventListener("click", searchFunc);

function searchFunc() {
   

    var value1 = document.getElementById("search-input").value;
    var queryString = "?search=" + value1 ;
    document.getElementById('form').action = "sec.html" + queryString;
}
	
function aa(e) {

    var config = {
            apiKey: "AIzaSyDu0cid-tqrD_c5-3WVxYyzV_1rXEVpMoc",
            authDomain: "sites-59ce8.firebaseapp.com",
            databaseURL: "https://sites-59ce8.firebaseio.com",
            projectId: "sites-59ce8",
            storageBucket: "sites-59ce8.appspot.com",
            messagingSenderId: "341492753223"
    };
    firebase.initializeApp(config);


    var Data;
    var UserID = document.getElementById("search-input").value;
    var MyPath = firebase.database().ref('person/' + UserID);
   
    MyPath.once('value')
      .then(function (GetData) {

          Data = GetData.val();
          if (Data) {
              alert('area: ' + Data.area + '\nnature_type: ' + Data.nature_type);
          }
          else {
              alert('No Data');
          }
      });

    alert(UserID + "sd");

}
function personClicked(e) {

	var personID = e.target.getAttribute("child-key");

	const personRef = dbRef.child('person/' + personID);
	const personDetailUI = document.getElementById("personDetail");

	personDetailUI.innerHTML = ""

	personRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		personDetailUI.append($p);


	});

}
function addUserBtnClicked(e) {

const addUserInputsUI = document.getElementsByClassName("user-input");

let newUser = {};

// loop through View to get the data for the model 
for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

let key = addUserInputsUI[i].getAttribute('data-key');
let value = addUserInputsUI[i].value;
newUser[key] = value;
}

 
 var MyPath = firebase.database().ref('person/'+addUserInputsUI[0].value+" "+addUserInputsUI[1].value);
MyPath.set(newUser)
  .then(function() {
    console.log('succeeded');
  })
  .catch(function(error) {
    console.log("failed: " + error.message);
  });

}

