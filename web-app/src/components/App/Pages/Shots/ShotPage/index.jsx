import React from 'react';
import { connect } from 'cerebral-view-react';
import { ShareButtons } from 'react-share';
import styles from './styles';
import { BUCKET_URL } from '../../../../../../config/aws';
import { hostUrl } from '../../../../../../config/host';
import icons from '../../../../../icons/_styles.scss';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default connect(props => ({
  user: `user`,
  shot: `shotPage.shots.${props.currentQuery}`,
  games: `config.games`,
}), {
  shotLikeClicked: 'shots.shotLikeClicked',
}, function ShotPage(props) {
  const { shot, games, shotLikeClicked, user } = props;

  const game = games.filter(g => g.id === shot.game_id)[0];
  const army = game.armies.filter(a => a.id === shot.army_id)[0];

  const handleLikeClick = () => shotLikeClicked({
    shotUrl: shot.url,
    shotId: shot.id,
    liked: shot.liked,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>

        <div className={styles.leftContent}>
          <img
            alt="shot"
            className={styles.shotImage}
            src={`${BUCKET_URL}/originals/${shot.image}`}
          />

          <div className={styles.thumbnails}>
            { shot.attachments.map((attachmentUrl, index) =>
              <img
                alt="attachment"
                key={index}
                src={`${BUCKET_URL}/thumbnails/${attachmentUrl}`}
              />)
            }
          </div>

          <div className={styles.infoCard}>
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
                {<span className={styles.statsBorder} />}
              </div>

              <div className={styles.commentsContainer}>
              <span>9</span>
              <i className={icons.comment_outline} />
              </div>
            
            </div>

            <div className={styles.userInfo}>
              <div className={styles.userPhoto}>
                <img
                  alt="user"
                  className={styles.userPic}
                  src={user.image
                    ? `${BUCKET_URL}/users/avatars/${user.image}`
                    : `/public/user/unnamed.gif`
                  }
                />
              </div>
              <div className={styles.paintedByBox}>
                <span className={styles.paintedByTitle}>{shot.title}</span>
                <span className={styles.paintedByName}>
                  by&nbsp;
                  <b>{shot.username}&nbsp;</b>
                  on&nbsp;{formatDate(shot.created)}
                </span>
              </div>
            </div>

          </div>

          <div className={styles.description}>
            <span>{shot.description}</span>
          </div>

          <div className={styles.tagSocialContainer}>

            <div className={styles.tagContainer}>
              <span className={styles.tagName}>
                Tagged as <b>{game.name}, {army.name}</b>
              </span>
              <div className={styles.reportImage}>
                <a href="/report">Report this image</a>
              </div>
            </div>

            <div className={styles.shareContainer}>
              <span>Share</span>

              <FacebookShareButton
                url={`${hostUrl}/shots/shot/${shot.url}`}
                title={shot.title}
                description="Check out this awesome mini I found on Ruby Lens!"
                className={styles.facebookButton}
                picture={`${BUCKET_URL}/shots/${shot.image}`}
              >
                <i className={icons.facebook} />
              </FacebookShareButton>

              <TwitterShareButton
                url={`${hostUrl}/shots/shot/${shot.url}`}
                title="Check out this awesome mini I found on Ruby Lens!"
                className={styles.twitterButton}
              >
                <i className={icons.twitter} />
              </TwitterShareButton>
            </div>

          </div>

        </div>

        <div className={styles.rightContent}>
          <div className={styles.moreThumbsContainer}>
            <p>More by <b>{shot.username}</b></p>
            <ol className={styles.moreThumbs}>
              { shot.moreByUser.map(shotThumb =>
                <li key={shotThumb.url} className={styles.moreThumb}>
                  <a href={`${hostUrl}/shots/shot/${shotThumb.url}`}>
                    <img
                      alt="more by user"
                      src={`${BUCKET_URL}/shots/${shotThumb.image}`}
                    />
                  </a>
                </li>)
              }
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
});
