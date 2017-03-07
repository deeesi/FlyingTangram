document.addEventListener("DOMContentLoaded", function() { 
	cloneTangram();
	initListener();
});

function cloneTangram(){
	var tangramTemplateString = document.getElementById('tangramTemplate').childNodes[0].nodeValue; //gibt nur den Template Inhalt als "Text" zurück. Deshalb Hilfs-DIV:
	var div = document.createElement('div');
	div.innerHTML = tangramTemplateString.trim(); //trim entfernt Leerzeichen
	var tangramContainer = div.firstChild;
	var buttons = document.getElementsByClassName('button');
	var tangramTemplate = document.getElementsByClassName('tangram--template');

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].appendChild(tangramContainer.cloneNode(true));
		tangramTemplate[i].classList.add('tangram--'+ buttons[i].dataset.tangram);
	}
}




function initListener() {
	var buttons = document.getElementsByClassName('button');
	var tangram = document.getElementsByClassName("tangram")[0];

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function() {
			tangram.className = tangram.className.replace(/tangram--(\S*)/,'tangram--' + this.dataset.tangram);
		};
	}

}