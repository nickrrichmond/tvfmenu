var ALERT_TITLE = "MUST BE OF LEGAL AGE TO ENTER";
var ALERT_BUTTON_TEXT = "Yes I am over 18.";
var PUNT_BUTTON_TEXT = "No I am under 18.";
var ALERT_TEXT = "WARNING: E-liquid products may contain nicotine, which is poisonous and addictive. These products are intended only for adults of legal smoking age who are committed smokers and is not intended for use by women who are pregnant, may become pregnant, children, or anyone with a pre-existing medical condition without first consulting your physician. If you do experience any side effects stop using our products immediately and consult your physician. Our pruducts are not made for ingestion. Our products have not been evaluated by the food and drug administration and they are not intended to cure, treat, or prevent any disease or condition.  For safety, please keep all of our products out of reach of childreen and pets. Use as directed.";

if(document.getElementById) {
	window.alert = function(txt) {
		createCustomAlert(txt);
	}
}

function createCustomAlert(txt) {
	d = document;

	if(d.getElementById("modalContainer")) return;

	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	mObj.style.height = d.documentElement.scrollHeight + "px";

	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	alertObj.style.visiblity="visible";

	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));

	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;

	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	btn.focus();
	btn.onclick = function() { removeCustomAlert();return false; }

    btn2 = alertObj.appendChild(d.createElement("a"));
	btn2.id = "puntBtn";
	btn2.appendChild(d.createTextNode(PUNT_BUTTON_TEXT));
	btn2.href = "error/punt.htm";
	btn2.focus();


	alertObj.style.display = "block";

}

function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
alert(ALERT_TEXT);
}