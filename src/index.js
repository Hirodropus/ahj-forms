import './styles.css';
import Popover from './Popover';

const button = document.getElementById('popover-btn');

new Popover(button, {
  title: 'Popover title',
  content: 'And here\'s some amazing content. It\'s very engaging. Right?',
});