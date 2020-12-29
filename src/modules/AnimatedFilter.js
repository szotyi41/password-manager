export default {
  mounted(el, binding, vnode) {
    let i = -1;
    let position = 0;
    let transform = 'transform' in document.body.style ? 'transform' : 'webkitTransform';
    let items = el.querySelectorAll(':scope > *');
    let itemHeight = items.length ? items[0].offsetHeight : '';
    while (++i < items.length) {
      const item = items[i];
      item.style.position = 'absolute';
      item.style.opacity = 1;
      item.style[transform] = 'translateY(' + position++ * itemHeight + 'px)';
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
        if (item.className.includes('show')) {
            item.style[transform] = 'translateY(' + position++ * itemHeight + 'px)';
            item.style.opacity = 1;
        } else {
            item.style.opacity = 0;
        }
    }
  }
};