import gsap from "gsap";

export const parallaxEffect = (e, target, reference, movement) => {
  const container = reference.current;

  const x = e.pageX - container.offsetLeft;
  const y = e.pageY - container.offsetTop;

  gsap.to(target, {
    x: ((x - container.offsetWidth / 2) / container.offsetWidth) * movement,
    y: ((y - container.offsetHeight / 2) / container.offsetHeight) * movement,
    duration: 2,
  });
};
