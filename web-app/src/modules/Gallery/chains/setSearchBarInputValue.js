import {
  copy,
} from 'cerebral/operators';

export default [
  copy('input:value', 'state:gallery.searchBar.value'),
];
