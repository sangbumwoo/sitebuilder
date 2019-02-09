import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

function Avatar({ hash }) {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  // console.log('avatar hash', hash);
  // console.log('avatar url', url);
  return <img src={url} className="avatar" alt="avatar" />;
}
Avatar.propTypes = {
  hash: PropTypes.string.isRequired
};

const Message = ({ text }) => (
  <div className="message">
    {text}
  </div>
);
Message.propTypes = {
  text: PropTypes.string.isRequired
};

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <span className="name-with-handle">
      <span className="name">
        {name}
      </span>
      {' '}
      <span className="handle">
        @
        {handle}
      </span>
    </span>
  );
}
NameWithHandle.propTypes = {
  author: PropTypes.instanceOf(Object).isRequired
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return (
    <span className="time">
      {timeString}
    </span>
  );
};
Time.propTypes = {
  time: PropTypes.string.isRequired
};

const ReplyButton = () => <i className="fa fa-reply reply-button" />;

function Count({ count }) {
  if (count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
    );
  }
  return null;
}
Count.propTypes = {
  count: PropTypes.number.isRequired
};

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    <Count count={count} />
    {' '}
  </span>
);
RetweetButton.propTypes = {
  count: PropTypes.number.isRequired
};

const LikeButton = ({ count }) => (
  <span className="like-button">
    <i className="fa fa-heart" />
    <span className="like-count">
      {' '}
      {count || null}
    </span>
  </span>
);
LikeButton.propTypes = {
  count: PropTypes.number.isRequired
};

const MoreOptionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);

function Tweet({ tweet }) {
  // console.log('tweet', tweet);
  return (
    <div className="tweet">
      {' '}
      <Avatar hash={tweet.gravatar} />
      <div className="content">
        <NameWithHandle author={tweet.author} />
        {' '}
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          {' '}
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.instanceOf(Object).isRequired
};

export default Tweet;
