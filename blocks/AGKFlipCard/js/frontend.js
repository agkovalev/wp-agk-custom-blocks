(function ($) {
  $(document).ready(function () {
    var Cards = {};
    var $body = $("body");

    function AGKFlipCard(card) {
      var $card = $(card);

      function _setupEventsHandlers() {
        $card
          .on("click", ".agkcb-flipcard-switcher", _onClickSwitcher)
          .on("click", ".agkcb-flipcard-close", _onClickClose)
          .on("click", ".agkcb-flipcard-backdrop", _onClickClose);
      }

      function _onClickSwitcher(e) {
        _flip();
      }

      function _onClickClose(e) {
        _close();
      }

      function _open() {
        $card.addClass("is--open");
        $body.addClass("modal-open");
        $("html,body").animate({ scrollTop: $card.find(".agkcb-flipcard-inner").offset().top }, 1000);
      }
      function _close() {
        $card.removeClass("is--open");
        $body.removeClass("modal-open");
      }
      function _flip() {
        var isFlipped = $card.hasClass("is--flipped");
        $card.addClass("is--flipping");
        if (!isFlipped) {
          $card.addClass("is--flipped");
          var timeOutFlipIn = window.setTimeout(function () {
            $card.removeClass("is--flipping");
            window.clearTimeout(timeOutFlipIn);
          }, 1000);
        } else {
          $card.removeClass("is--flipped");
          var timeOutFlipOut = window.setTimeout(function () {
            $card.removeClass("is--flipping");
            window.clearTimeout(timeOutFlipOut);
          }, 1000);
        }
      }

      function _moveSwitcherAndCloseBtnIntoCardSides() {
        var $switcher = $card.find(".agkcb-flipcard-switcher");
        var $switcherClone = $switcher.clone();
        var $close = $card.find(".agkcb-flipcard-close");
        var $closeClone = $close.clone();

        $switcher.appendTo($card.find(".agkcb-flipcard-side--front"));
        $switcherClone.appendTo($card.find(".agkcb-flipcard-side--back"));
        $close.appendTo($card.find(".agkcb-flipcard-side--front"));
        $closeClone.appendTo($card.find(".agkcb-flipcard-side--back"));
      }

      function _getId() {
        var idAttr = $card.attr("id");
        if (idAttr && idAttr.length) {
        } else {
          idAttr = "flipCard" + Math.floor(Math.random() * (1000 - 1));
          $card.attr("id", idAttr);
        }
        return idAttr;
      }

      _moveSwitcherAndCloseBtnIntoCardSides();
      _setupEventsHandlers();

      this.id = _getId();
      this.el = card;
      this.open = _open;
      this.close = _close;
      this.flip = _flip;
    }

    AGKFlipCard.init = function () {
      $cards = $(".agkcb-flipcard-wrapper");
      if ($cards.length) {
        $cards.each(function (index, card) {
          var FlipCard = new AGKFlipCard(card);
          Cards["#" + FlipCard.id] = FlipCard;
        });

        $cards.appendTo($body);
      }
    };
    AGKFlipCard.init();

    $(".agkcb-flipcard-triggers-list").on("click", "li > a", function (e) {
      e.preventDefault();
      var $link = $(e.currentTarget);
      var targetSelector = $link.attr("href");
      var card = Cards[targetSelector];

      if (card instanceof AGKFlipCard) {
        card.open();
      }
    });
  });
})(jQuery);
