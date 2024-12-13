onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

// function loadFlowerStyles() {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = "./assets/flower/style.css";
//   document.head.appendChild(link);
// }

// // Load the flower styles dynamically
// window.onload = () => {
//   loadFlowerStyles();
// };
