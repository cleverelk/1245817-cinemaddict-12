import FilmPopupView from "../view/site-film-popup.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {mainElement} from "../main.js";

export default class PopupPresenter {
  constructor(changeData, resetPopups) {
    this._mainContainer = mainElement;
    this._changeData = changeData;
    this._resetPopups = resetPopups;

    this._popupComponent = null;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    const prevPopupComponent = this._popupComponent;
    this._popupComponent = new FilmPopupView(this._film);

    this._popupComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._popupComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._popupComponent.setClickBtnClose(this._onCloseBtnClick);
    this._popupComponent.setEscBtnClose(this._onEscKeyDown);

    if (prevPopupComponent === null) {
      render(this._mainContainer, this._popupComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevPopupComponent) {
      replace(this._PopupComponent, prevPopupComponent);
      return;
    }

    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._popupComponent);
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _onEscKeyDown(film) {
    this._changeData(film);
    this.destroy();
  }

  _onCloseBtnClick(film) {
    this._changeData(film);
    this.destroy();
  }
}

