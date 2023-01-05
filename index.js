// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='t-notifications'>
    <h2 class='title'>Toast Notification</h2>
    <ul data-notifications></ul>
    <div class='t-notifications__buttons'>
      ${['success', 'error', 'warning', 'info'].map(i => `<button class='button button--${i}' data-type='${i}'>${i[0].toUpperCase() + i.substring(1)}</button>`).join('')}
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      notifications: document.querySelector('[data-notifications]'),
      buttons: document.querySelectorAll('[data-type]'),
    };

    this.PROPS = {
      timer: 5000,
      success: {
        icon: 'check-circle',
        text: 'Success: This is a success toast.',
        color: 'rgb(10, 191, 48)',
      },
      error: {
        icon: 'x-circle',
        text: 'Error: This is an error toast.',
        color: 'rgb(226, 77, 76)',
      },
      warning: {
        icon: 'alert-triangle',
        text: 'Warning: This is a warning toast.',
        color: 'rgb(233, 189, 12)',
      },
      info: {
        icon: 'alert-circle',
        text: 'Info: This is an information toast.',
        color: 'rgb(52, 152, 219)',
      },
    };

    this.DOM.buttons.forEach(btn => btn.addEventListener('click', this.createToast));
  }

  /**
   * @function createToast - Create toast
   * @param type
   */
  createToast = ({ target: { dataset: { type } } }) => {
    // Get config name
    const { icon, text, color } = this.PROPS[type];
    // Create HTML element
    const toast = document.createElement('li');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div style='color:${color}'>${feather.icons[icon].toSvg()}</div>
      <span>${text}</span>
      <button data-delete=''>${feather.icons.x.toSvg()}</button>`;
    // Append element
    this.DOM.notifications.appendChild(toast);
    // Close toast
    const close = toast.querySelector('[data-delete]');
    close.addEventListener('click', () => this.removeToast(toast));
    // Remove after time
    toast.timeoutId = setTimeout(() => this.removeToast(toast), this.PROPS.timer);
  };

  /**
   * @function removeToast - Remove toast
   * @param toast
   */
  removeToast = (toast) => {
    toast.classList.add('hide');
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
  };
}

// ⚡️Class instance
new App();
