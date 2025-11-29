var myCal = document.getElementById("adventCal");
var currentDate = new Date();

function Door(calendar, day) {

	this.width = ((calendar.width - 0.1 * calendar.width) / 4) * 0.95;
	this.height = ((calendar.height - 0.1 * calendar.height) / 6) * 0.95;
	this.x = ( 0.04 * calendar.width + ((day- 1) % 4) * (1.1 * this.width) );
	this.y = - ( 0.96 * calendar.height - Math.floor((day - 1) / 4) * (1.1 * this.height) );

	this.content = function() { 
		
		var node = document.createElement("li");
		document.getElementById("adventDoors").appendChild(node);
		node.id = "door" + day;
		node.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";

		var innerNode = document.createElement("a");
		document.getElementById("door" + day).appendChild(innerNode);
		innerNode.innerHTML = day;
		innerNode.href = "#";

		if((currentDate.getMonth() + 1 ) < 12 || currentDate.getDate() < day ) {
			innerNode.className = "disabled";
			innerNode.onclick = function() {
				return false;
			}
		} else {
			innerNode.onclick = function() {
				const elementsToHide = document.querySelectorAll('.a-card');
				elementsToHide.forEach(element => {
					element.classList.add('hidden'); // Assuming a CSS class '.hidden { display: none; }' exists
				});
				const element = document.getElementById("card-container-" + day);
				element.classList.remove('hidden');
			    popupModal.style.display = 'flex'; // Use flex to center content
    		};
			return false;
		}	
	};

}

(function() {
	var doors = [];

	for(var i = 0; i < 24; i++) {

		doors[i] = new Door(myCal, i + 1);
		doors[i].content();

	}

	return doors;
})();

document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the Escape key
    if (event.key === 'Escape') {
        // Get a reference to your modal element
		const popupModal = document.getElementById('popupModal');

        // Check if the modal is currently open or visible
        // This check might vary depending on how your modal's visibility is controlled (e.g., display style, class)
        if (popupModal && popupModal.style.display === 'flex') {
            popupModal.style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const popupModal = document.getElementById('popupModal');
    const closeButtonSpan = document.querySelector('.close-button');

    closeButtonSpan.addEventListener('click', () => {
        popupModal.style.display = 'none';
    });

    // Close the popup if clicked outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            popupModal.style.display = 'none';
        }
    });
});
