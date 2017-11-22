import React from 'react';
import Select from 'react-select';
import { connect } from 'cerebral-view-react';
import { RadioGroup, Radio } from 'react-radio-group';
import _ from 'lodash';
// import cx from 'classnames';
import styles from './styles.scss';
import Mini from './Components/Mini';
// import formStyles from '../../../../styles/formStyles';

const LOAD_TRIGGER_PX = 800;

export default connect({
  shotsOrder: 'gallery.shotsOrder',
  filters: 'gallery.filters',
  loading: 'gallery.loading',
  loadingMore: 'gallery.loadingMore',
  games: 'config.games',
}, {
  fieldChanged: 'forms.fieldChanged',
  filtersChanged: 'gallery.filtersChanged',
  nextPageTriggered: 'gallery.nextPageTriggered',
}, class Gallery extends React.Component {

  handleScroll = _.throttle(() => {
    const bottomScroll = (document.documentElement.scrollHeight
      - document.documentElement.offsetHeight) - window.scrollY;

    if (!this.props.loadingMore && bottomScroll < LOAD_TRIGGER_PX) {
      this.props.nextPageTriggered();
    }
  }, 100);

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {
      shotsOrder,
      games,
      filters,
      fieldChanged,
      filtersChanged,
      loading,
    } = this.props;

    const handleFiltersChange = () => filtersChanged();

    return (
      <div className={styles.wrapper} ref={(el) => this.wrapper = el}>

        <div className={styles.filtersContainer}>
          <div className={styles.filtersContent}>

            <fieldset>
              <label htmlFor="shotGame">GAMES</label>
              <Select
                id="shotGame"
                value={filters.gameId.value}
                options={
                  games.map(game =>
                    ({ value: game.id, label: game.name }))
                }
                onChange={(selected) => {
                  fieldChanged({
                    field: 'gallery.filters.gameId',
                    value: selected ? selected.value : null,
                  });
                  handleFiltersChange();
                }}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="shotArmy">ARMY</label>
              <Select
                id="shotArmy"
                value={filters.armyId.value}
                options={
                  games
                    .filter(game => game.id === filters.gameId.value)
                    .map(game =>
                      game.armies.map(army =>
                        ({
                          value: army.id,
                          label: army.name,
                        }))
                      )[0]
                }
                onChange={(selected) => {
                  fieldChanged({
                    field: 'gallery.filters.armyId',
                    value: selected ? selected.value : null,
                  });
                  handleFiltersChange();
                }}
              />
            </fieldset>

            <div className={styles.otherFiltersContainer}>
              <h3>TIME FILTERS</h3>

              <RadioGroup
                className={styles.radioButtonsContainer}
                name="timeFilters"
                selectedValue={filters.time.value}
                onChange={(value) => {
                  fieldChanged({
                    field: 'gallery.filters.time',
                    value,
                  });
                  handleFiltersChange();
                }}
              >
                <div className={styles.rButton}>
                  <Radio value="7" type="radio" id="radio1" />
                  <label htmlFor="radio1">This week</label>
                </div>
                <div className={styles.rButton}>
                  <Radio value="30" type="radio" id="radio2" />
                  <label htmlFor="radio2">This month</label>
                </div>
                <div className={styles.rButton}>
                  <Radio value="0" type="radio" id="radio3" />
                  <label htmlFor="radio3">All time</label>
                </div>
              </RadioGroup>

            </div>

            <div className={styles.otherFiltersContainer}>
              <h3>SORT BY</h3>

              <RadioGroup
                className={styles.radioButtonsContainer}
                name="sortFilters"
                selectedValue={filters.sort.value}
                onChange={(value) => {
                  fieldChanged({
                    field: 'gallery.filters.sort',
                    value,
                  });
                  handleFiltersChange();
                }}
              >
                <div className={styles.rButton}>
                  <Radio value="most_recent" type="radio" id="radio4" />
                  <label htmlFor="radio4">Recent</label>
                </div>
                <div className={styles.rButton}>
                  <Radio value="least_recent" type="radio" id="radio5" />
                  <label htmlFor="radio5">Oldest</label>
                </div>
                <div className={styles.rButton}>
                  <Radio value="most_likes" type="radio" id="radio6" />
                  <label htmlFor="radio6">Popular</label>
                </div>
                <div className={styles.rButton}>
                  <Radio value="least_likes" type="radio" id="radio7" />
                  <label htmlFor="radio7">Upopular</label>
                </div>
              </RadioGroup>

            </div>
          </div>
        </div>

        <div className={styles.galleryContainer}>
          { loading
            ? <h2>LOADING...</h2>
            : <ol className={styles.shots}>
              { shotsOrder.map((shotUrl) =>
                <li className={styles.shotListEl} key={shotUrl}>
                  <Mini shotUrl={shotUrl} />
                </li>)
              }
            </ol>
          }
        </div>
      </div>
    );
  }
});
