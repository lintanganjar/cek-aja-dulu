// //////// Slider 
'use strict';

class slideBanner2 {
  constructor(el) {
    this.el = el;
    this.slideBanner2Options = ['previous', 'add', 'play', 'next'];
    this.slideBanner2Data = [
      {
        'id': '1',
        'src': 'img/Rectangle 27.jpg',
      },
      {
        'id': '2',
        'src': 'img/Rectangle 27 (2).jpg',
      },
      {
        'id': '3',
        'src': 'img/Rectangle 27 (1).jpg',
      },
      {
        'id': '4',
        'src': 'img/Rectangle 103.jpg',
      },
      {
        'id': '5',
        'src': 'http://fakeimg.pl/300/?text=5',
      }
    ];
    this.slideBanner2InView = [1, 2, 3, 4, 5];
    this.slideBanner2Container;
    this.slideBanner2PlayState;
  }

  mounted() {
    this.setupslideBanner2();
  }

  // Build slideBanner2 html
  setupslideBanner2() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // Add container for slideBanner2 items and controls
    this.el.append(container, controls);
    container.className = 'slideBanner2-container';
    controls.className = 'slideBanner2-controls';

    // Take dataset array and append items to container
    this.slideBanner2Data.forEach((item, index) => {
      const slideBanner2Item = item.src ? document.createElement('img') : document.createElement('div');

      container.append(slideBanner2Item);
      
      // Add item attributes
      slideBanner2Item.className = `slideBanner2-item slideBanner2-item-${index + 1}`;
      slideBanner2Item.src = item.src;
      slideBanner2Item.setAttribute('loading', 'lazy');
      // Used to keep track of slideBanner2 items, infinite items possible in slideBanner2 however min 5 items required
      slideBanner2Item.setAttribute('data-index', `${index + 1}`);
    });

    this.slideBanner2Options.forEach((option) => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');

      // Add accessibilty spans to button
      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      // Add button attributes
      btn.className = `slideBanner2-control slideBanner2-control-${option}`;
      btn.setAttribute('data-name', option);

      // Add slideBanner2 control options
      controls.append(btn);
    });

    // After rendering slideBanner2 to our DOM, setup slideBanner2 controls' event listeners
    this.setControls([...controls.children]);

    // Set container property
    this.slideBanner2Container = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        // Manage control actions, update our slideBanner2 data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
    if (control === 'add') return this.add();
    if (control === 'play') return this.play();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in slideBanner2
    this.slideBanner2Data.unshift(this.slideBanner2Data.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.slideBanner2InView.push(this.slideBanner2InView.shift());

    // Update the css class for each slideBanner2 item in view
    this.slideBanner2InView.forEach((item, index) => {
      this.slideBanner2Container.children[index].className = `slideBanner2-item slideBanner2-item-${item}`;
    });

    // Using the first 5 items in data array update content of slideBanner2 items in view
    this.slideBanner2Data.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.slideBanner2-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    // Update order of items in data array to be shown in slideBanner2
    this.slideBanner2Data.push(this.slideBanner2Data.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.slideBanner2InView.unshift(this.slideBanner2InView.pop());

    // Update the css class for each slideBanner2 item in view
    this.slideBanner2InView.forEach((item, index) => {
      this.slideBanner2Container.children[index].className = `slideBanner2-item slideBanner2-item-${item}`;
    });

    // Using the first 5 items in data array update content of slideBanner2 items in view
    this.slideBanner2Data.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.slideBanner2-item-${index + 1}`).src = data.src;
    });
  }

  add() {
    const newItem = {
      'id': '',
      'src': '',
    };
    const lastItem = this.slideBanner2Data.length;
    const lastIndex = this.slideBanner2Data.findIndex(item => item.id == lastItem);
    
    // Assign properties for new slideBanner2 item
    Object.assign(newItem, {
      id: `${lastItem + 1}`,
      src: `http://fakeimg.pl/300/?text=${lastItem + 1}`
    });

    // Then add it to the "last" item in our slideBanner2Data
    this.slideBanner2Data.splice(lastIndex + 1, 0, newItem);

    // Shift slideBanner2 to display new item
    this.next();
  }

  play() {
    const playBtn = document.querySelector('.slideBanner2-control-play');
    const startPlaying = () => this.next();

    if (playBtn.classList.contains('playing')) {
      // Remove class to return to play button state/appearance
      playBtn.classList.remove('playing');

      // Remove setInterval
      clearInterval(this.slideBanner2PlayState); 
      this.slideBanner2PlayState = null; 
    } else {
      // Add class to change to pause button state/appearance
      playBtn.classList.add('playing');

      // First run initial next method
      this.next();

      // Use play state prop to store interval ID and run next method on a 1.5 second interval
      this.slideBanner2PlayState = setInterval(startPlaying, 1500);
    };
  }

}

// Refers to the slideBanner2 root element you want to target, use specific class selectors if using multiple slideBanner2s
const el = document.querySelector('.slideBanner2');
// Create a new slideBanner2 object
const exampleslideBanner2 = new slideBanner2(el);
// Setup slideBanner2 and methods
exampleslideBanner2.mounted();

/// STAR
document.addEventListener('DOMContentLoaded', function() {
  // Mengambil elemen container untuk menempatkan SVG
  const containers = document.querySelectorAll('.svg-container');
  
  // Definisikan ikon SVG
  const svgIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
  `;

  // Loop untuk setiap container dan menambahkan SVG sebanyak 5 kali ke masing-masing
  containers.forEach(container => {
    for (let i = 0; i < 5; i++) {
        // Membuat elemen div baru
        const svgElement = document.createElement('div');
        // Mengatur innerHTML div dengan SVG
        svgElement.innerHTML = svgIcon;
        // Menambahkan SVG ke dalam container
        container.appendChild(svgElement);
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Mengambil elemen container untuk menempatkan SVG
  const containers = document.querySelectorAll('.svg-star');
  
  // Definisikan ikon SVG
  const svgIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" height="10" width="15.75" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
  `;

  // Loop untuk setiap container dan menambahkan SVG sebanyak 5 kali ke masing-masing
  containers.forEach(container => {
    for (let i = 0; i < 5; i++) {
        // Membuat elemen div baru
        const svgElement = document.createElement('div');
        // Mengatur innerHTML div dengan SVG
        svgElement.innerHTML = svgIcon;
        // Menambahkan SVG ke dalam container
        container.appendChild(svgElement);
    }
  });
});

