//********************************************************************
		//***************Creating constants***********************
		//********************************************************************

		var arr = ['spades', 'clubs', 'hearts', 'diams'];
		var state = [];

		for (var i of arr) {
			var i = document.getElementById(i)
		}

		spades = spades.innerHTML
		clubs = clubs.innerHTML
		hearts = hearts.innerHTML
		diams = diams.innerHTML

		state.push(spades, clubs, hearts, diams)

		//********************************************************************
		//********************************************************************

		var wrapper = document.querySelector('.wrapper');
		var block;

		for (var k=0; k<42; k++) {
		  block = document.createElement('div');
			wrapper.appendChild(block);
		}



		var div = document.querySelectorAll('.wrapper div');


		for (var i=0, j=div.length; i<j; i++) {
			div[i].innerHTML=state[Math.floor(Math.random()*(3-0+1)) +0];
			div[i].addEventListener('click', f_obtain);
		}

		var order = [-1,5,-7,-6,6,1,-5,7];                           //Search step of neighbours

		function f_obtain(event) {
			var store = [];
			var clickedFigure;                                //Defining figure

			for (var k=0, d=div.length; k<d; k++) {
				if (div[k]==event.target) {
					clickedFigure = div[k].innerHTML;
					store.push(k);
					div[k].style.backgroundColor='grey';
					break;
				}
			}
//******************************************************************************
//*****************************Main algorithm***********************************
//******************************************************************************
			

			var buffer = [...store]
			var bubble=0;
			var counter=0;
			var temp = [];                                                     //In this array we're saving all founded neighbours of clicked square
			var temp2=[];

			function blockHandler(store, buffer) {                             //This function cathes all neighbours of each element in buffer
				counter++;
				temp=[];
				temp2=[];
				buffer.map(function(val) {
					if (val%6==0) {temp2=order.slice(3)}
					else {
						if ((val+1)%6==0) {temp2=order.slice(0,5)}
						else {temp2=[...order]}
					}
					console.log(temp2)
					for (var g=0, h=temp2.length; g<h; g++) {
						nghbr=val+temp2[g];
						if (nghbr<0 || nghbr>=42) {continue;}
						else {
							if (div[nghbr].innerHTML == clickedFigure) {
								if (buffer.find(function(buf){return buf==nghbr})) {continue;}    // Searching for bubble in buffer	
								if (store.find(function(str){return str==nghbr})) {continue;}     // Searching for bubble in store
								
								temp.push(nghbr);
							}	
						}
					}

				})
				buffer=[...temp];                                                                   //Saving in buffer all founded neighbours
				buffer.map(function(buf){ div[buf].style.backgroundColor='grey'; store.push(buf)})  //saving elements from buffer in store
				if (temp.length!=0) {return blockHandler(store, buffer)}                            //Launching recursion function where we're sending last buffer which holds all founded neighbours in the last blockHandler() performance
				else {
					if (counter>1) {                                                                //If we have only 1 blockHandler performance it means that element has neighbours
						store.map(function(str) {
			        		div[str].removeEventListener('click', f_obtain)
			        		setTimeout(function() {
			        			div[str].style.backgroundColor = 'white';
			        			div[str].innerHTML = '';
			        		}, 1000);
						})
					}
					else {
						setTimeout(function() {
			        			div[store[0]].style.backgroundColor = 'white';
			        			window.alert('Element has no group')
			        		}, 50);
					}
				}
			}

            blockHandler(store, buffer)
        }