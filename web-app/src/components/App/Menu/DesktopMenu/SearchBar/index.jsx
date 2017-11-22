import React from 'react';
import { connect } from 'cerebral-view-react';
import InputSearch from './InputSearch';
import styles from './styles.scss';
import icons from '../../../../../icons/_styles.scss';

export default connect({
  searchBar: 'gallery.searchBar',
}, {
  inputChanged: 'gallery.searchBarInputChanged',
  inputSubmited: 'gallery.searchBarInputSubmited',
  tokensClicked: 'gallery.searchBarTokensClicked',
}, function SearchBar(props) {
  const {
    searchBar,
    inputChanged,
    inputSubmited,
    tokensClicked,
  } = props;

  const handleInputChange = e => {
    inputChanged({
      value: e.target.value,
    });
  };

  const handleTokensClick = () => tokensClicked();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      inputSubmited();
      e.preventDefault();
    }
  };

  return (
    <div className={styles.searchBar}>
      { (searchBar.mode === 'input') ?

        // Input mode
        <div className={styles.inputWrapper}>
          <i className={icons.magnify} />
          <InputSearch
            name="search"
            value={searchBar.value}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
          />
        </div>

        :

        // Tokens mode
        <div className={styles.tokenizedWrapper}>
          <i className={icons.magnify} />
          <ul onClick={handleTokensClick}>
            { searchBar.value.split(' ').map((term) =>
              <li key={term}>
                <span>{term}</span>
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  );
});
