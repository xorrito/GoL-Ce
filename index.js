function start(){
	var min = 1;
  var max = 50;
  var select = document.getElementById('limitrange');
	for (var i = min; i<=max; i++){
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		if (i == 12){
			opt.selected = true;
		}
    select.appendChild(opt);
	}
	min = 1;
  max = 100;
  select = document.getElementById('chancerange');
	for (i = min; i<=max; i++){
		var opt_c = document.createElement('option');
		opt_c.value = i;
		opt_c.innerHTML = i;
		if (i == 50){
			opt_c.selected = true;
		}
    select.appendChild(opt_c);
	}
	limitchange();
}
function limitchange(){
	document.getElementById('auto').checked = false;
	document.body.removeChild(document.getElementById("workshop"));
	var ws = document.createElement("div");
	ws.id = "workshop";
	document.body.appendChild(ws);
	var ncell = document.createElement("span");
	ncell.id = "cell";
	lives = document.getElementById("limitrange").value;
	ncell.innerHTML = lives;
	ws.appendChild(ncell);
	document.getElementById("generation").innerHTML = "1";
	document.getElementById("record").innerHTML = "1";
	document.getElementById("total").innerHTML = "1";
	
	var possible = 2;
	for (i = lives; i>1; i--){
		possible = possible * 2;
	}
	
	document.getElementById("possible").innerHTML = possible + "<br>(100.00%)";
}
function devide_random(lock){
	var pop=document.getElementById("workshop");
	var all_span_tags = document.getElementsByTagName("span");
	var possible = parseInt(document.getElementById("possible").innerHTML);
	var alive = document.getElementById("total").innerHTML;
	random_selected_cell = Math.floor(Math.random() * (alive - 0 + 1)) + 0;
	if(typeof all_span_tags[random_selected_cell] !== 'undefined'){
		counter = all_span_tags[random_selected_cell].innerHTML;
		if (counter < 1){
			pop.removeChild(all_span_tags[random_selected_cell]);
			alive--;
		} else {
			generation = parseInt(document.getElementById("generation").innerHTML) + 1;
			generation_percentage = (generation / possible * 100).toFixed(2);
			document.getElementById("bar").style.height = generation_percentage + "%";
			document.getElementById("generation").innerHTML = generation + "<br>(" + generation_percentage + "%)";
			newcounter = counter - 1;
			if (newcounter === 0){
				all_span_tags[random_selected_cell].className = "zero";
			}
			all_span_tags[random_selected_cell].innerHTML = newcounter;
			newcell = all_span_tags[random_selected_cell].cloneNode(true);
			pop.insertBefore(newcell, all_span_tags[random_selected_cell]);
			alive++;
		}
		alive_percentage =  (alive / possible * 100).toFixed(2);
		document.getElementById("total").innerHTML = alive;
		document.getElementById("alive_bar").style.height = alive_percentage + "%";
		if (document.getElementById("record").innerHTML < alive){
			record_var = alive;
			record_percentage = (record_var / possible * 100).toFixed(2);
			document.getElementById("record").innerHTML = record_var;
			document.getElementById("rec_bar").style.height = "calc(" + record_percentage + "% - 1px)";
		}
		if (lock !== true){
			chance = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
			chance_selected = document.getElementById("chancerange").value;
			if (chance < chance_selected){
				devide_random("true");
			}
		}
	} else {
		devide_random();
	}
}
setInterval (function(){
	if (document.getElementById('auto').checked) {
		var all_span_tags = document.getElementsByTagName("span");
		if (all_span_tags.length > 0){
	    devide_random();
		} else {
			document.getElementById('auto').checked = false;
		}
  }
}, 250);