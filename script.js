function handleClick_1(){
    let side_menu = document.getElementById('side_menu');
    let nav_menu = document.getElementById('conditionalNav')
    if(side_menu.style.display == 'none'){
      side_menu.style.display = 'flex';
      nav_menu.style.height = '100vh';

      console.log("onClick - open")
    } else {
        side_menu.style.display = 'none';
        nav_menu.style.height = '32px';

        console.log("onClick - close")

    }
  }