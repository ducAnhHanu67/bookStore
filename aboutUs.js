const createOdometer = (el, value) => {
  const odometer = new Odometer({
    el: el,
    value: 0,
  });

  let hasRun = false;

  const options = {
    threshold: [0, 0.9],
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasRun) {
          odometer.update(value);
          hasRun = true;
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};
const subscribersOdometer = document.querySelector("h2.client_time-line-title");
createOdometer(subscribersOdometer, 1000);

const subscribersOdometer1 = document.querySelector(".title2");
createOdometer(subscribersOdometer1, 500);

const subscribersOdometer2 = document.querySelector(".title3");
createOdometer(subscribersOdometer2, 200);

const subscribersOdometer3 = document.querySelector(".title4");
createOdometer(subscribersOdometer3, 100);
