let jet = document.getElementById("jet");
let board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if ((e.key === "ArrowLeft" && left > 0)) {
    jet.style.left = left - 10 + "px";
  }
  // 460 => board width - jet width 
  else if (e.key === "ArrowRight" && left <= 460) {
    jet.style.left = left + 10 + "px";
  }

  //32 is space key 
  if ((e.key === "ArrowUp" || e.keyCode === 32)) {
    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    let movebullet = setInterval(() => {

      let rocks = document.getElementsByClassName("rocks");

      for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        let rockbound = rock.getBoundingClientRect();
        let bulletbound = bullet.getBoundingClientRect();

        if (
          bulletbound.left >= rockbound.left &&
          bulletbound.right <= rockbound.right && 
          bulletbound.top <= rockbound.top &&
          bulletbound.bottom <= rockbound.bottom
        ) {
          rock.parentElement.removeChild(rock); // removing the rock 
          // score
          document.getElementById("points").innerHTML = 
            parseInt(document.getElementById("points").innerHTML) + 1;
        }
      }

      let bulletbottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));

      // keeps bullet in the games frame
      if(bulletbottom >= 500){
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; // place bullet above jet
      bullet.style.bottom = bulletbottom + 3 + "px";
    }, 50);
  }
});

let makeRocks = setInterval(() => {
  let rock = document.createElement("div");
  rock.classList.add("rocks");
  // placing the asteroids in random positions
  let rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
  // makes value between 0 to 450
  rock.style.left = Math.floor(Math.random() * 450) + "px";
  board.appendChild(rock);
}, 1500);


let moveRocks = setInterval(() => {
  let rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i]; // getting each rock 
      let rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moveRocks);
        window.location.reload();
      }


      rock.style.top = rocktop + 20 + "px";
    }
  }
}, 450);