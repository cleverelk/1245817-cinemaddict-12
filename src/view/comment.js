import AbstractView from "../abstract.js";
import {getDateInComment} from "../utils/common.js";
import he from "he";

const createCommentTemplate = (commentData) => {
  const {comment, emotion, author, date, id} = commentData;
  return (
    `<li class="film-details__comment" data-id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDateInComment(date)} </span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export default class Comment extends AbstractView {
  constructor(comment) {

    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
