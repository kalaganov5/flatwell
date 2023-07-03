// source https://github.com/amirhosseinrahmati/before-after-comparison-slider/tree/master
export default class BeforeAfter {
  constructor(enteryObject) {
    const beforeAfterContainer = document.querySelector(enteryObject.id);
    const before = beforeAfterContainer.querySelector('.bal-before');
    const beforeText = beforeAfterContainer.querySelector('.bal-beforePosition');
    const afterText = beforeAfterContainer.querySelector('.bal-afterPosition');
    const handle = beforeAfterContainer.querySelector('.bal-handle');
    var widthChange = 0;

    beforeAfterContainer.querySelector('.bal-before-inset')
      .setAttribute('style', 'width: ' + beforeAfterContainer.offsetWidth + 'px;');
    window.onresize = function () {
      beforeAfterContainer.querySelector('.bal-before-inset')
        .setAttribute('style', 'width: ' + beforeAfterContainer.offsetWidth + 'px;');
    };
    before.setAttribute('style', 'width: 50%;');
    handle.setAttribute('style', 'left: 50%;');

    // touch screen event listener
    beforeAfterContainer.addEventListener('touchstart', (e) => {
      beforeAfterContainer.addEventListener('touchmove', (e2) => {
        const containerWidth = beforeAfterContainer.offsetWidth;
        const currentPoint = e2.changedTouches[0].clientX;

        const startOfDiv = beforeAfterContainer.offsetLeft;

        const modifiedCurrentPoint = currentPoint - startOfDiv;

        if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < beforeAfterContainer.offsetWidth - 10) {
          const newWidth = modifiedCurrentPoint * 100 / containerWidth;

          before.setAttribute('style', 'width:' + newWidth + '%;');
          afterText.setAttribute('style', 'z-index: 1;');
          handle.setAttribute('style', 'left:' + newWidth + '%;');
        }
      });
    });

    // mouse move event listener
    beforeAfterContainer.addEventListener('mousemove', (e) => {
      const containerWidth = beforeAfterContainer.offsetWidth;
      widthChange = e.offsetX;
      const newWidth = widthChange * 100 / containerWidth;

      if (e.offsetX > 10 && e.offsetX < beforeAfterContainer.offsetWidth - 10) {
        before.setAttribute('style', 'width:' + newWidth + '%;');
        afterText.setAttribute('style', 'z-index:' + '1;');
        handle.setAttribute('style', 'left:' + newWidth + '%;');
      }
    });
  }
}
