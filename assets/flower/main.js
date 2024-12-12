// onload = () => {
//     const c = setTimeout(() => {
//       document.body.classList.remove("not-loaded");
//       clearTimeout(c);
//     }, 1000);
//   };

window.onload = () => {
  const flowerContainer = document.querySelector(".flower-container");

  if (flowerContainer) {
      const c = setTimeout(() => {
          document.body.classList.remove("not-loaded");
          clearTimeout(c);
      }, 1000);
  }

  // Other website-specific onload actions
  console.log("Website loaded");
};
