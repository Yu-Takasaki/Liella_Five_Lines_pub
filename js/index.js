$(function () {
  // 画像配列
  const img = new Array();
  img[0] = new Image();
  // img[0] = "./img/icon/new/kanon.png";
  img[0] = "./img/icon/starlight/kanon.png";
  img[1] = new Image();
  img[1] = "./img/icon/starlight/keke.png";
  img[2] = new Image();
  img[2] = "./img/icon/starlight/chisato.png";
  img[3] = new Image();
  img[3] = "./img/icon/starlight/sumire.png";
  img[4] = new Image();
  img[4] = "./img/icon/starlight/ren.png";

  // 座席表リンク
  const seat_map = new Array();
  seat_map[0] = "https://www.livewalker.com/web/detail/7703"; //岡山
  seat_map[1] = "https://www.livewalker.com/web/detail/25097"; //北海道 
  seat_map[2] = "https://www.livewalker.com/web/detail/14929"; //大阪
  seat_map[3] = "https://www.livewalker.com/web/detail/8779"; //東京
  seat_map[4] = "https://www.livewalker.com/web/detail/13608"; //福岡
  seat_map[5] = "https://zaseki.music-mdata.com/21585/1"; //愛知
  seat_map[6] = "https://zaseki.music-mdata.com/8765/1"; //千葉
  seat_map[7] = "https://zaseki.music-mdata.com/18604/1"; //福井
  seat_map[8] = "https://www.livewalker.com/web/detail/9525"; //宮城
  seat_map[9] = "https://www.livewalker.com/web/detail/27706"; //東京追加

  // モーメントリンク
  const tweet_moment = new Array();
  tweet_moment[0] = "https://twitter.com/i/events/1464582234631979010"; //福岡公演
  tweet_moment[1] = "https://twitter.com/i/events/1464584738123911176"; //愛知公演
  tweet_moment[2] = "https://twitter.com/i/events/1464729208555737089"; //千葉公演
  tweet_moment[3] = "https://twitter.com/i/events/1464730826239733761"; //福井公演
  tweet_moment[4] = ""; //宮城公演
  tweet_moment[5] = ""; //東京追加公演


  // 指定した要素を表示させる
  function releaseDisplay(target) {
    $(target).removeClass("d-none");
    $(target).css({
      display: "block",
    });
  }
  // 指定した要素を隠す
  function displayNone(target) {
    $(target).addClass("d-none");
    $(target).css({
      display: "none",
    });
  }

  // 指定したリンクボタンをdisable
  function anchorDisable(target) {
    $(target).addClass("disabled");
    $(target).attr("aria-disabled", "true");
  }

  // 指定したリンクボタンをable
  function anchorUndisable(target) {
    $(target).removeClass("disabled");
    $(target).attr("aria-disabled", "false");
  }

  // すべて隠す
  function displayNoneAll() {
    $("#input-floor").css({ display: "none" });
    $("#input-row").css({ display: "none" });
    $("#input-lr").css({ display: "none" });
    $("#input-number").css({ display: "none" });
  }

  // 選択肢を生成する
  function createOptions(target, val) {
    _.map(val, (item) => {
      let op = $("<option>");
      if (typeof item === "string") {
        op.val(item);
      } else {
        op.val(String(item));
      }

      if (typeof item === "string") {
        op.html(item);
      } else {
        op.html(String(item));
      }
      $(target).append(op);
    });
  }

  // 選択肢をアンマウントする(selectの子要素をemptyにする)
  function deleteOptions() {
    $("#select-floor").empty();
    $("#select-row").empty();
    $("#select-number").empty();
    $("#select-lr").empty();
  }

  // 特定の選択肢をアンマウントする
  function deleteTargetOptions(target) {
    $(target).empty();
  }

  // 会場が選択されたら座席を入力できるようにする
  $("#select-venue").change(function () {
    displayNoneAll();
    deleteOptions();
    const venue = $("#select-venue").val();
    if (_.isEmpty(venue)) {
      displayNone("#input-seat");
      releaseDisplay("#illust-container");
    } else {
      displayNone("#illust-container");
      releaseDisplay("#input-seat");
      releaseDisplay("#input-floor");
    }
    // 会場ごとのユニーク関数に飛ばす
    if (venue === "gunma") {
      gunma();
    } else if (venue === "okayama") {
      okayama();
      $('#seat-map-link').attr("href", seat_map[0]);
      $('#seat-map-link').html("岡山公演座席表");
      anchorDisable("#tweet-moment");
      $('#tweet-moment-text').html("岡山公演モーメント");
      console.log($('#seat-map-link'))
    } else if (venue === "hokkaido") {
      hokkaido();
      $('#seat-map-link').attr("href", seat_map[1]);
      $('#seat-map-link').html("北海道公演座席表");
      anchorDisable("#tweet-moment");
      $('#tweet-moment-text').html("北海道公演モーメント");
    } else if (venue === "osaka") {
      osaka();
      $('#seat-map-link').attr("href", seat_map[2]);
      $('#seat-map-link').html("大阪公演座席表");
      anchorDisable("#tweet-moment");
      $('#tweet-moment-text').html("大阪公演モーメント");
    } else if (venue === "tokyo") {
      tokyo();
      $('#seat-map-link').attr("href", seat_map[3]);
      $('#seat-map-link').html("東京公演座席表");
      anchorDisable("#tweet-moment");
      $('#tweet-moment-text').html("東京公演モーメント");
    } else if (venue === "fukuoka") {
      fukuoka();
      $('#seat-map-link').attr("href", seat_map[4]);
      $('#seat-map-link').html("福岡公演座席表");
      anchorUndisable("#tweet-moment");
      $('#tweet-moment').attr("href", tweet_moment[0]);
      $('#tweet-moment-text').html("福岡公演モーメント");
    } else if (venue === "aichi") {
      aichi();
      $('#seat-map-link').attr("href", seat_map[5]);
      $('#seat-map-link').html("愛知公演座席表");
      anchorUndisable("#tweet-moment");
      $('#tweet-moment').attr("href", tweet_moment[1]);
      $('#tweet-moment-text').html("愛知公演モーメント");
    } else if (venue === "chiba") {
      chiba();
      $('#seat-map-link').attr("href", seat_map[6]);
      $('#seat-map-link').html("千葉公演座席表");
      anchorUndisable("#tweet-moment");
      $('#tweet-moment').attr("href", tweet_moment[2]);
      $('#tweet-moment-text').html("千葉公演モーメント");
    } else if (venue === "fukui") {
      fukui();
      $('#seat-map-link').attr("href", seat_map[7]);
      $('#seat-map-link').html("福井公演座席表");
      anchorUndisable("#tweet-moment");
      $('#tweet-moment').attr("href", tweet_moment[3]);
      $('#tweet-moment-text').html("福井公演モーメント");
    }
  });

  // 岡山公演入力欄生成
  function okayama() {
    console.log("岡山!!!");
    deleteTargetOptions("#select-floor");
    // 階選択肢生成
    const floor = ["1階", "2階"];
    createOptions("#select-floor", floor);
    releaseDisplay("input-floor");
    const floor_value = $("#select-floor").val();

    // 列選択肢生成
    if (floor_value === "1階") { // 1FL
      deleteTargetOptions("#select-row");
      const rowArray = _.map([...Array(29)], (_, i) => {
        return i + 1;
      });
      createOptions("#select-row", rowArray);
    } else if (floor_value === "2階") { //2FR
      deleteTargetOptions("#select-row");
      const rowArray = _.map([...Array(9)], (_, i) => {
        return i + 9;
      });
      createOptions("#select-row", rowArray);
    }

    // 列入力欄生成
    releaseDisplay("#input-row");
    const row_value = $("#select-row").val();

    // 岡山のみ左右入力
    if (row_value) {
      const lr = ["左", "右"];
      createOptions("#select-lr", lr);
      releaseDisplay("#input-lr")
      const lr_value = $("#select-lr").val();
    } else {
      deleteTargetOptions("#select-lr");
      displayNone("#input-lr")
    }

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(43)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 北海道公演入力欄生成
  function hokkaido() {
    console.log("北海道!!!");
    deleteTargetOptions("#select-floor");
    // 階選択肢生成
    const floor = ["1,2階", "3階"];
    createOptions("#select-floor", floor);
    releaseDisplay("#input-floor");

    // 特殊列選択
    $("#select-floor").change(function () {
      const venue = $("#select-venue").val();
      if (venue === "hokkaido") {
        const floor_value = $("#select-floor").val();
        if (floor_value === "3階") { //2FR
          deleteTargetOptions("#select-row");
          const rowArray = (_.map([...Array(6)], (_, i) => {
            const num = i + 1;
            return "B" + num;
          }));
          rowArray.unshift("B列以外");
          releaseDisplay("#input-row");
          createOptions("#select-row", rowArray);
        } else {
          deleteTargetOptions("#select-row");
          displayNone("#input-row");
        }
      }
    });

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(36)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 大阪公演入力欄生成
  function osaka() {
    console.log("大阪!!!");
    displayNoneAll();

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(72)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 東京公演入力欄生成
  function tokyo() {
    console.log("東京!!!");
    displayNoneAll();

    // 階選択肢生成
    const floor = ["1階", "2階", "3階"];
    createOptions("#select-floor", floor);
    releaseDisplay("#input-floor");

    // 特殊列選択
    $("#select-floor").change(function () {
      const venue = $("#select-venue").val();
      if (venue === "tokyo") {
        const floor_value = $("#select-floor").val();
        if (floor_value === "2階" || floor_value === "3階") { //2FR
          deleteTargetOptions("#select-row");
          const rowArray = ["L列", "R列"]
          rowArray.unshift("L列R列以外");
          releaseDisplay("#input-row");
          createOptions("#select-row", rowArray);
        } else {
          deleteTargetOptions("#select-row");
          displayNone("#input-row");
        }
      }
    });

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(44)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 福岡公演入力欄生成
  function fukuoka() {
    console.log("福岡!!!");
    displayNoneAll();

    // 階選択肢生成
    const floor = ["1階", "2階"];
    createOptions("#select-floor", floor);
    releaseDisplay("#input-floor");

    // 特殊列選択
    $("#select-floor").change(function () {
      const venue = $("#select-venue").val();
      if (venue === "fukuoka") {
        const floor_value = $("#select-floor").val();
        if (floor_value === "2階") { //2F S列
          deleteTargetOptions("#select-row");
          const rowArray = ["S列"]
          rowArray.unshift("S列以外");
          releaseDisplay("#input-row");
          createOptions("#select-row", rowArray);
        } else {
          deleteTargetOptions("#select-row");
          displayNone("#input-row");
        }
      }
    });

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(55)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 愛知公演入力欄生成
  function aichi() {
    console.log("愛知!!!");
    displayNoneAll();

    // 階選択肢生成
    const floor = ["1階", "2階", "3階"];
    createOptions("#select-floor", floor);
    releaseDisplay("#input-floor");
    const floor_value = $("#select-floor").val();
    // 列選択肢生成
    if (floor_value === "1階") { // 1FL
      deleteTargetOptions("#select-row");
      const rowArray = _.map([...Array(29)], (_, i) => {
        return i + 1;
      });
      createOptions("#select-row", rowArray);
    } else if (floor_value === "2階") { //2FR
      deleteTargetOptions("#select-row");
      const rowArray = _.map([...Array(9)], (_, i) => {
        return i + 9;
      });
      createOptions("#select-row", rowArray);
    }

    // 列入力欄生成
    releaseDisplay("#input-row");
    const row_value = $("#select-row").val();

    // 特殊列選択
    $("#select-floor").change(function () {
      const venue = $("#select-venue").val();
      if (venue === "chiba") {
        const floor_value = $("#select-floor").val();
        if (floor_value === "2階" || floor_value === "3階") { //バルコニー席
          deleteTargetOptions("#select-row");
          const rowArray = ["L列"]
          rowArray.unshift("S列以外");
          releaseDisplay("#input-row");
          createOptions("#select-row", rowArray);
        } else {
          deleteTargetOptions("#select-row");
          displayNone("#input-row");
        }
      }
    });

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(58)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 千葉公演入力欄生成
  function chiba() {
    console.log("千葉!!!");
    displayNoneAll();

    // 階選択肢生成
    const floor = ["1階", "2階", "3階"];
    createOptions("#select-floor", floor);
    releaseDisplay("#input-floor");

    // 特殊列選択
    const venue = $("#select-venue").val();
    if (venue === "chiba") {
      const rowLeft = (_.map([...Array(4)], (_, i) => {
        const num = i + 1;
        return "バルコニー席 L" + num;
      }));
      const rowRight = (_.map([...Array(4)], (_, i) => {
        const num = i + 1;
        return "バルコニー席 R" + num;
      }));
      const rowArray = rowLeft.concat(rowRight);
      rowArray.unshift("L列, R列(バルコニー)以外");
      releaseDisplay("#input-row");
      createOptions("#select-row", rowArray);
    }

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(45)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // 福井公演入力欄生成
  function fukui() {
    console.log("福井!!!");
    displayNoneAll();

    // 番号入力欄表示
    releaseDisplay("#input-number");
    const rowArray = _.map([...Array(60)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", rowArray);
  }

  // -------判定--------
  $("#judge-btn").click(function () {
    const venue = $("#select-venue").val();
    const floor = $("#select-floor").val();
    const row = $("#select-row").val();
    const lr = $("#select-lr").val();
    const number = Number($("#select-number").val());

    console.log("場所：", venue)
    console.log("階：", floor)
    console.log("列：", row)
    if (venue === "okayama") console.log("左右：", lr)
    console.log("番号：", number)

    // 判定
    // 岡山
    if (venue === "okayama") {
      // 千砂都グループ
      if (
        ((floor === "1階") && (1 <= Number(row) && Number(row) <= 29) && (lr === "左") && (19 <= number && number <= 29)) ||
        ((floor === "2階") && (1 <= Number(row) && Number(row) <= 8) && (lr === "左") && (1 <= number && number <= 8)) ||
        ((floor === "2階") && (9 <= Number(row) && Number(row) <= 12) && (lr === "左") && (23 <= number && number <= 43))
      ) {
        result("chisato");
        return;
      } else if (
        // すみれグループ
        ((floor === "1階") && (1 <= Number(row) && Number(row) <= 29) && (lr === "左") && (7 <= number && number <= 18)) ||
        ((floor === "2階") && (9 <= Number(row) && Number(row) <= 17) && (lr === "左") && (7 <= number && number <= 22))
      ) {
        result("sumire");
        return;
      } else if (
        // かのんグループ
        ((floor === "1階") && (1 <= Number(row) && Number(row) <= 29) && (lr === "左" || "右") && (1 <= number && number <= 6)) ||
        ((floor === "2階") && (9 <= Number(row) && Number(row) <= 17) && (lr === "左" || "右") && (1 <= number && number <= 6))
      ) {
        result("kanon");
        return;
      } else if (
        // 可可グループ
        ((floor === "1階") && (1 <= Number(row) && Number(row) <= 29) && (lr === "右") && (7 <= number && number <= 18)) ||
        ((floor === "2階") && (9 <= Number(row) && Number(row) <= 17) && (lr === "右") && (7 <= number && number <= 22))
      ) {
        result("keke");
        return;
      } else if (
        // 恋グループ
        ((floor === "1階") && (1 <= Number(row) && Number(row) <= 29) && (lr === "右") && (19 <= number && number <= 29)) ||
        ((floor === "2階") && (1 <= Number(row) && Number(row) <= 8) && (lr === "右") && (1 <= number && number <= 8)) ||
        ((floor === "2階") && (9 <= Number(row) && Number(row) <= 12) && (lr === "右") && (23 <= number && number <= 43))
      ) {
        result("ren");
        return;
      } else {
        result("error");
      }
    }

    // 北海道
    if (venue === "hokkaido") {
      if (
        (floor === "3階") &&
        (row === ("B1" || "B2" || "B3" || "B4" || "B5" || "B6")) &&
        (4 < number)
      ) {
        console.log("dfss")
        result("error");
        return;
      }
      // 千砂都㌠
      if (
        ((floor === "1,2階") && (row === null) && ((1 <= number && number <= 7))) ||
        ((floor === "3階") && (row === "B列以外") && ((1 <= number && number <= 7))) ||
        ((floor === "3階") && (row === "B1" || "B2" || "B3" || "B4" || "B5" || "B6") && (1 <= number && number <= 2))
      ) {
        result("chisato");
        return;
      } else if (
        // すみれ㌠
        ((floor === "1,2階") && (row === null) && ((8 <= number) && (number <= 14))) ||
        ((floor === "3階") && (row === "B列以外") && ((8 <= number) && (number <= 14)))
      ) {
        result("sumire");
        return;
      } else if (
        // かのん㌠
        ((floor === "1,2階") && (row === null) && ((15 <= number && number <= 22))) ||
        ((floor === "3階") && (row === "B列以外") && ((15 <= number && number <= 22)))
      ) {
        result("kanon");
        return;
      } else if (
        // 可可㌠
        ((floor === "1,2階") && (row === null) && ((23 <= number && number <= 29))) ||
        ((floor === "3階") && (row === "B列以外") && ((23 <= number && number <= 29)))
      ) {
        result("keke");
        return;
      } else if (
        // 恋㌠
        ((floor === "1,2階") && (row === null) && ((30 <= number && number <= 36))) ||
        ((floor === "3階") && (row === "B列以外") && ((30 <= number && number <= 36))) ||
        ((floor === "3階") && (row === "B1" || "B2" || "B3" || "B4" || "B5" || "B6") && (3 <= number && number <= 4))
      ) {
        result("ren");
        return;
      } else {
        console.log("ddddd")
        result("error");
        return;
      }
    }

    // 大阪
    if (venue === "osaka") {
      // 千砂都㌠
      if (1 <= number && number <= 18) {
        result("chisato");
        return;
      }
      // すみれ㌠
      if (19 <= number && number <= 30) {
        result("sumire");
        return;
      }
      // かのん㌠
      if (31 <= number && number <= 42) {
        result("kanon");
        return;
      }
      // 可可㌠
      if (43 <= number && number <= 54) {
        result("keke");
        return;
      }
      //　恋㌠
      if (55 <= number && number <= 72) {
        result("ren");
        return;
      }
    }

    // 東京
    if (venue === "tokyo") {
      if (
        (floor === "2階" || floor === "3階") &&
        (row === "L列" || row === "R列") &&
        (17 < number)
      ) {
        result("error");
        return;
      }
      // 千砂都㌠
      if (
        ((floor === "1階") && (row === null) && ((1 <= number && number <= 9))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列R列以外") && ((1 <= number && number <= 9))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列") && (1 <= number && number <= 17))
      ) {
        result("chisato");
        return;
      } else if (
        // すみれ㌠
        ((floor === "1階") && (row === null) && ((10 <= number) && (number <= 18))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列R列以外") && ((10 <= number) && (number <= 18)))
      ) {
        result("sumire");
        return;
      } else if (
        // かのん㌠
        ((floor === "1階") && (row === null) && ((19 <= number) && (number <= 26))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列R列以外") && ((19 <= number) && (number <= 26)))
      ) {
        result("kanon");
        return;
      } else if (
        // 可可㌠
        ((floor === "1階") && (row === null) && ((27 <= number) && (number <= 35))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列R列以外") && ((27 <= number) && (number <= 35)))
      ) {
        result("keke");
        return;
      } else if (
        // 恋㌠
        ((floor === "1階") && (row === null) && ((36 <= number && number <= 44))) ||
        ((floor === "2階" || floor === "3階") && (row === "L列R列以外") && ((36 <= number && number <= 44))) ||
        ((floor === "2階" || floor === "3階") && (row === "R列") && (1 <= number && number <= 17))

      ) {
        result("ren");
        return;
      } else {
        result("error");
        return;
      }
    }

    // 福岡
    if (venue === "fukuoka") {
      // 千砂都㌠
      if (
        ((floor === "1階") && (row === null) && ((1 <= number && number <= 11))) ||
        ((floor === "2階") && (row === "S列以外") && ((1 <= number && number <= 11))) ||
        ((floor === "2階") && (row === "S列") && (3 <= number && number <= 9))
      ) {
        result("chisato");
        return;
      } else if (
        // すみれ㌠
        ((floor === "1階") && (row === null) && ((12 <= number && number <= 22))) ||
        ((floor === "2階") && (row === "S列以外") && ((12 <= number && number <= 22))) ||
        ((floor === "2階") && (row === "S列") && (10 <= number && number <= 21))
      ) {
        result("sumire");
        return;
      } else if (
        // かのん㌠
        ((floor === "1階") && (row === null) && ((23 <= number && number <= 33))) ||
        ((floor === "2階") && (row === "S列以外") && ((23 <= number && number <= 33))) ||
        ((floor === "2階") && (row === "S列") && (22 <= number && number <= 35))
      ) {
        result("kanon");
        return;
      } else if (
        // 可可㌠
        ((floor === "1階") && (row === null) && ((34 <= number && number <= 44))) ||
        ((floor === "2階") && (row === "S列以外") && ((34 <= number && number <= 44))) ||
        ((floor === "2階") && (row === "S列") && (36 <= number && number <= 47))
      ) {
        result("keke");
        return;
      } else if (
        // 恋㌠
        ((floor === "1階") && (row === null) && ((45 <= number && number <= 55))) ||
        ((floor === "2階") && (row === "S列以外") && ((45 <= number && number <= 55))) ||
        ((floor === "2階") && (row === "S列") && (48 <= number && number <= 54))
      ) {
        result("ren");
        return;
      } else {
        result("error");
        return;
      }
    }

    // 愛知
    if (venue === "aichi") {
      // 千砂都㌠
      if (1 <= number && number <= 11) {
        result("chisato");
        return;
      } else if (12 <= number && number <= 23) {
        // すみれ㌠
        result("sumire");
        return;
      } else if (24 <= number && number <= 35) {
        // かのん㌠
        result("kanon");
        return;
      } else if (36 <= number && number <= 47) {
        // 可可㌠
        result("keke");
        return;
      } else if (48 <= number && number <= 58) {
        //　恋㌠
        result("ren");
        return;
      } else {
        result("error");
        return;
      }
    }

    // 千葉
    if (venue === "chiba") {
      // イルミネーションチーム
      if (row !== "L列, R列(バルコニー)以外") {
        if (floor === "1階") {
          if (
            ((row === "バルコニー席 L1" || row === "バルコニー席 R1") && 1 <= number && number <= 10) ||
            ((row === "バルコニー席 L2" || row === "バルコニー席 R2" || row === "バルコニー席 L3" || row === "バルコニー席 R3") && 1 <= number && number <= 14) ||
            ((row === "バルコニー席 L4" || row === "バルコニー席 R4") && 1 <= number && number <= 9)
          ) {
            result("kanon_chiba");
            return;
          }
        }
        if (floor === "2階") {
          if (
            ((row === "バルコニー席 L1" || row === "バルコニー席 R1") && 1 <= number && number <= 10) ||
            ((row === "バルコニー席 L2" || row === "バルコニー席 R2") && 1 <= number && number <= 8) ||
            ((row === "バルコニー席 L3" || row === "バルコニー席 R3") && 1 <= number && number <= 7)
          ) {
            result("kanon_chiba");
            return;
          }
        }
        if (floor === "3階") {
          if (
            ((row === "バルコニー席 L1" || row === "バルコニー席 R1") && 1 <= number && number <= 10) ||
            ((row === "バルコニー席 L2" || row === "バルコニー席 R2") && 1 <= number && number <= 10) ||
            ((row === "バルコニー席 L3" || row === "バルコニー席 R3") && 1 <= number && number <= 9)
          ) {
            result("kanon_chiba");
            return;
          }
        }
      }
      // 千砂都㌠
      if (
        (floor === "1階" && row === "L列, R列(バルコニー)以外" && 1 <= number && number <= 7) ||
        (floor === "2階" && row === "L列, R列(バルコニー)以外" && 1 <= number && number <= 10) ||
        (floor === "3階" && row === "L列, R列(バルコニー)以外" && 1 <= number && number <= 10)
      ) {
        result("chisato");
        return;
      } else if (
        (floor === "1階" && row === "L列, R列(バルコニー)以外" && 8 <= number && number <= 14) ||
        (floor === "2階" && row === "L列, R列(バルコニー)以外" && 11 <= number && number <= 17) ||
        (floor === "3階" && row === "L列, R列(バルコニー)以外" && 11 <= number && number <= 17)
      ) {
        // すみれ㌠
        result("sumire");
        return;
      } else if (
        (floor === "1階" && row === "L列, R列(バルコニー)以外" && 15 <= number && number <= 25) ||
        (floor === "2階" && row === "L列, R列(バルコニー)以外" && 18 <= number && number <= 28) ||
        (floor === "3階" && row === "L列, R列(バルコニー)以外" && 18 <= number && number <= 28)
      ) {
        // かのん㌠
        result("kanon");
        return;
      } else if (
        (floor === "1階" && row === "L列, R列(バルコニー)以外" && 26 <= number && number <= 32) ||
        (floor === "2階" && row === "L列, R列(バルコニー)以外" && 29 <= number && number <= 35) ||
        (floor === "3階" && row === "L列, R列(バルコニー)以外" && 29 <= number && number <= 35)
      ) {
        // 可可㌠
        result("keke");
        return;
      } else if (
        (floor === "1階" && row === "L列, R列(バルコニー)以外" && 33 <= number && number <= 39) ||
        (floor === "2階" && row === "L列, R列(バルコニー)以外" && 36 <= number && number <= 45) ||
        (floor === "3階" && row === "L列, R列(バルコニー)以外" && 36 <= number && number <= 45)
      ) {
        //　恋㌠
        result("ren");
        return;
      } else {
        result("error");
        return;
      }
    }

    // 福井
    if (venue === "fukui") {
      // 千砂都㌠
      if (1 <= number && number <= 12) {
        result("chisato");
        return;
      }
      // すみれ㌠
      if (13 <= number && number <= 24) {
        result("sumire");
        return;
      }
      // かのん㌠
      if (25 <= number && number <= 36) {
        result("kanon");
        return;
      }
      // 可可㌠
      if (37 <= number && number <= 48) {
        result("keke");
        return;
      }
      //　恋㌠
      if (49 <= number && number <= 60) {
        result("ren");
        return;
      }
    }

  });

  // 担当メンバー表示
  function result(member) {
    globalChara = member;
    console.log("担当:", member)
    let src, color, text = null
    releaseDisplay("#share-btn");
    displayNone("#extra-button");
    if (member === "kanon") {
      src = img[0];
      color = "#ff8c2e";
      text = "マリーゴールド";
    } else if (member === "keke") {
      src = img[1];
      color = "#34d2ee";
      text = "パステルブルー";
    } else if (member === "chisato") {
      src = img[2];
      color = "#f666cb";
      text = "ピーチピンク";
    } else if (member === "sumire") {
      src = img[3];
      color = "#3edf3e";
      text = "メロングリーン";
    } else if (member === "ren") {
      src = img[4];
      color = "#190586";
      text = "サファイアブルー";
    } else if (member === "kanon_chiba") {
      releaseDisplay("#extra-button");
      $("#extra-button").attr("href", "https://twitter.com/Liella5lines_PJ/status/1465244442646835203?s=20")
      $(".extra-button-message").html("イルミネーションチームについて")
      src = img[0];
      color = "#ff8c2e";
      text = "マリーゴールド(イルミネーションチーム)";
    } else if (member === "error") {
      src = "./img/error.png";
      color = "#f3200d";
      text = "そこには座席が無いYO!!";
      displayNone("#share-btn");
    }

    $('#liella-img').attr("src", src);
    $('#result').css('color', color);
    $('#result').html(text);
    $('#modal-options').iziModal('open');
  }

  // モーダル初期化
  $("#modal-options").iziModal();
});