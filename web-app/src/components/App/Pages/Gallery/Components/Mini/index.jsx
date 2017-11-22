import React from 'react';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';
import icons from '../../../../../../icons/_styles.scss';
import { BUCKET_URL } from '../../../../../../../config/aws';

export default connect(({ shotUrl }) => ({
  user: 'user',
  shot: `gallery.shots.${shotUrl}`,
}), {
  shotLikeClicked: 'shots.shotLikeClicked',
}, function Mini(props) {
  const { shot, user, shotLikeClicked } = props;

  const handleLikeClick = () => {
    if (user) {
      shotLikeClicked({
        shotUrl: shot.url,
        shotId: shot.id,
        liked: shot.liked,
      });
    } else {
      alert('Please register first to like a shot ;)');
    }
  };

  return (
    <div className={styles.shot}>
      <a href={`/shots/shot/${shot.url}`}>
        <img
          alt="shot"
          className={styles.shotImg}
          src={`${BUCKET_URL}/shots/${shot.image}`}
        />
      </a>
      <div className={styles.infoCard}>
        <div className={styles.userInfo}>
          <div className={styles.userPhoto}>
            <img
              alt="user"
              className={styles.userPic}
              src={shot.user_image
                ? `${BUCKET_URL}/users/avatars/${shot.user_image}`
                : `/public/user/unnamed.gif`
              }
            />
          </div>
          <div className={styles.paintedByBox}>
            <span>Painted by:</span>
            <span>{shot.username}</span>
          </div>
        </div>
        <div className={styles.statsInfo}>
          <div className={styles.viewsContainer}>
            <span>{shot.views_count}</span>
            <i className={icons.eye} />
            <span className={styles.statsBorder} />
          </div>
          <div
            className={styles.likesContainer}
            onClick={handleLikeClick}
          >
            <span>{shot.likes_count}</span>
            <i className={icons.thumb_up} />
            {/** <span className={styles.statsBorder} /> **/}
          </div>
          {/**
          <div className={styles.commentsContainer}>
            <span>9</span>
            <i className={icons.comment_outline} />
          </div>
          **/}
        </div>
      </div>
    </div>
  );
});
