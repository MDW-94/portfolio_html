      // Smooth scroll function
      function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
    
        // Easing function for smooth animation
        function ease(t, b, c, d) {
          t /= d / 2; // compound assignment operator - divide result and assign it to variable
          // take current value of t, divide it by d/2 and then reassign it to t
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }
    
        requestAnimationFrame(animation);
      }
    
      // Smooth scroll links
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const target = this.getAttribute('href');
          const duration = 50000; // Adjust as needed
          smoothScroll(target, duration);
        });
      });


//       const container = document.getElementById('container');

// container.addEventListener('scroll', () => {
//     const scrollPosition = container.scrollTop + container.clientHeight / 2;
//     const sections = document.querySelectorAll('section');
    
//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionBottom = sectionTop + section.offsetHeight;
        
//         if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
//             container.scrollTo({
//                 top: sectionTop - container.clientHeight / 2,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });