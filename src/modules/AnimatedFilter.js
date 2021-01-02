export default {
  mounted(el, binding, vnode) {
    let i = -1;
    let position = 0;
    let transform = 'transform' in document.body.style ? 'transform' : 'webkitTransform';
    let items = el.querySelectorAll(':scope > *');
    let itemHeight = items.length ? items[0].offsetHeight : '';
    while (++i < items.length) {
      const item = items[i];
      const style = item.currentStyle || window.getComputedStyle(item);
      item.style.position = 'absolute';
      item.style.opacity = 1;
      item.style[transform] = 'translateY(' + position++ * (itemHeight + parseInt(style.marginBottom)) + 'px)';
    }
  },
  updated(el, binding) {
    let i = -1;
    let position = 0;
    let transform = 'transform' in document.body.style ? 'transform' : 'webkitTransform';
    let items = el.querySelectorAll(':scope > *');
    let itemHeight = items.length ? items[0].offsetHeight : '';
    while (++i < items.length) {
        const item = items[i];
        const style = item.currentStyle || window.getComputedStyle(item);
        if (item.className.includes('show')) {
            item.style[transform] = 'translateY(' + position++ * (itemHeight + parseInt(style.marginBottom)) + 'px)';
            item.style.opacity = 1;
        } else {
            item.style.opacity = 0;
        }
    }
  }
};