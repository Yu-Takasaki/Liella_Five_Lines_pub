// 宮城公演専用
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
  const seat_map = "https://www.livewalker.com/web/detail/9525"

  // モーメントリンク
  const tweet_moment = "";


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
    $("#select-zone").empty();
  }

  // 特定の選択肢をアンマウントする
  function deleteTargetOptions(target) {
    $(target).empty();
  }

  // 階層選択肢生成
  function createFloorSelection(maxFloor) {
    deleteTargetOptions("#select-floor");
    const floorArray = _.map([...Array(maxFloor)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-floor", floorArray);
    releaseDisplay("#input-floor");
  }

  // 番号選択肢生成
  function createNumberSelection(maxNumber) {
    deleteTargetOptions("#select-number");
    const numberArray = _.map([...Array(maxNumber)], (_, i) => {
      return i + 1;
    });
    createOptions("#select-number", numberArray);
    releaseDisplay("#input-number");
  }

  // 宮城公演選択肢生成
  $("#select-venue").change(function () {
    const venue = $("#select-venue").val();
    console.log("会場：", venue);
    if (venue !== "miyagi") {
      deleteOptions();
      displayNone("#input-seat");
      releaseDisplay("#illust-container");
      return;
    } else {
      displayNone("#illust-container");
      releaseDisplay("#input-seat");


      releaseDisplay("#input-row");
      releaseDisplay("#input-number");
    }
    console.log("宮城！！！");
    //選択肢生成
    // 階
    createFloorSelection(3);

    //ゾーン
    displayNone("#input-zone");
    const zoneArray = ["F", "C", "L", "R"];
    createOptions("#select-zone", zoneArray);
    releaseDisplay("#input-zone");

    // 列
    displayNone("#input-row");
    const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    createOptions("#select-row", alphabets);
    releaseDisplay("#input-row");

    // 番号
    $("#row-number").change(function () {
      const val = $("#row-number").val();
      if (val < 1 || 146 < val) {
        releaseDisplay("#numberTips");
        $("#row-number").val("");
      } else {
        displayNone("#numberTips");
      }
    });

    ticket();
  });

  // チケットプレビュー
  function ticket() {
    $("#judge-btn").attr("disabled", true);
    let floor = $("#select-floor").val();
    let zone = $("#select-zone").val();
    let row = $("#select-row").val();
    let number = $("#row-number").val();
    $("#input-seat").change(function () {
      floor = $("#select-floor").val();
      zone = $("#select-zone").val();
      row = $("#select-row").val();
      number = $("#row-number").val();
      console.log(floor, zone, row, number);
      $("#preview-floor").text(floor);
      $("#preview-zone").text(zone);
      $("#preview-row").text(row);
      $("#preview-number").text(number);
      if (!floor || !zone || !row || !number) {
        $("#judge-btn").attr("disabled", true);
      } else {
        $("#judge-btn").removeAttr("disabled");
      }
    })
  }

  // 仙台公演用判定
  $("#judge-btn").click(function () {
    const floor = Number($("#select-floor").val());
    const zone = $("#select-zone").val();
    const row = $("#select-row").val();
    const number = Number($("#row-number").val());
    console.log("floor: ", floor, "zone: ", zone, "row: ", row, "number: ", number);

    if (
      // 千砂都㌠
      // 1階
      (floor === 1 && zone === "F" && ("I" <= row && row <= "N") && (28 <= number && number <= 33)) || // Fブロック
      (floor === 1 && zone === "L" && row === "A" && (22 <= number && number <= 33)) || // LブロックA列
      (floor === 1 && zone === "L" && row === "B" && (21 <= number && number <= 32)) || // LブロックB列
      (floor === 1 && zone === "L" && row === "C" && (19 <= number && number <= 30)) || // LブロックC列
      (floor === 1 && zone === "L" && row === "D" && (16 <= number && number <= 28)) || // LブロックD列
      (floor === 1 && zone === "L" && row === "E" && (13 <= number && number <= 26)) || // LブロックE列
      (floor === 1 && zone === "L" && row === "F" && (10 <= number && number <= 24)) || // LブロックF列
      (floor === 1 && zone === "L" && row === "G" && (7 <= number && number <= 22)) || // LブロックG列
      (floor === 1 && zone === "L" && row === "H" && (4 <= number && number <= 20)) || // LブロックH列
      (floor === 1 && zone === "L" && row === "I" && (1 <= number && number <= 18)) || // LブロックI列
      (floor === 1 && zone === "L" && row === "J" && (2 <= number && number <= 16)) || // LブロックJ列
      (floor === 1 && zone === "L" && row === "K" && (2 <= number && number <= 14)) || // LブロックK列
      (floor === 1 && zone === "L" && row === "L" && (2 <= number && number <= 12)) || // LブロックL列
      (floor === 1 && zone === "L" && row === "M" && (7 <= number && number <= 13)) || // LブロックM列

      // 2階
      (floor === 2 && zone === "L" && row === "A" && (8 <= number && number <= 35)) || // LブロックA列
      (floor === 2 && zone === "L" && row === "B" && (4 <= number && number <= 31)) || // LブロックB列
      (floor === 2 && zone === "L" && row === "C" && (1 <= number && number <= 28)) || // LブロックC列
      (floor === 2 && zone === "L" && row === "D" && (24 <= number && number <= 41)) || // LブロックD列

      // 3階
      (floor === 3 && zone === "L" && row === "A" && (6 <= number && number <= 34)) || // LブロックA列
      (floor === 3 && zone === "L" && row === "B" && (1 <= number && number <= 31)) || // LブロックB列
      (floor === 3 && zone === "L" && row === "C" && (2 <= number && number <= 31)) || // LブロックC列
      (floor === 3 && zone === "L" && row === "D" && (1 <= number && number <= 31)) || // LブロックD列
      (floor === 3 && zone === "L" && row === "E" && (16 <= number && number <= 32)) || // LブロックE列
      (floor === 3 && zone === "L" && row === "F" && (17 <= number && number <= 31)) || // LブロックF列
      (floor === 3 && zone === "L" && row === "G" && (28 <= number && number <= 29)) // LブロックG列
    ) {
      result("chisato");
    } else if (
      // すみれ㌠
      // 1階
      (floor === 1 && zone === "L" && row === "C" && number === 31) || // LブロックC列
      (floor === 1 && zone === "L" && row === "D" && (29 <= number && number <= 30)) || // LブロックD列
      (floor === 1 && zone === "L" && row === "E" && (27 <= number && number <= 29)) || // LブロックE列
      (floor === 1 && zone === "L" && row === "F" && (25 <= number && number <= 28)) || // LブロックF列
      (floor === 1 && zone === "L" && row === "G" && (23 <= number && number <= 27)) || // LブロックG列
      (floor === 1 && zone === "L" && row === "H" && (21 <= number && number <= 26)) || // LブロックH列
      (floor === 1 && zone === "L" && row === "I" && (19 <= number && number <= 25)) || // LブロックI列
      (floor === 1 && zone === "L" && row === "J" && (17 <= number && number <= 24)) || // LブロックJ列
      (floor === 1 && zone === "L" && row === "K" && (15 <= number && number <= 23)) || // LブロックK列
      (floor === 1 && zone === "L" && row === "L" && (13 <= number && number <= 22)) || // LブロックL列
      (floor === 1 && zone === "L" && row === "M" && (14 <= number && number <= 22)) || // LブロックM列

      // 2階
      (floor === 2 && zone === "L" && row === "A" && (36 <= number && number <= 45)) || // LブロックA列
      (floor === 2 && zone === "L" && row === "B" && (32 <= number && number <= 42)) || // LブロックB列
      (floor === 2 && zone === "L" && row === "C" && (29 <= number && number <= 40)) || // LブロックC列
      (floor === 2 && zone === "L" && row === "D" && (42 <= number && number <= 51)) || // LブロックD列

      (floor === 2 && zone === "C" && row === "A" && (46 <= number && number <= 55)) || // CブロックA列
      (floor === 2 && zone === "C" && row === "B" && (43 <= number && number <= 53)) || // CブロックB列
      (floor === 2 && zone === "C" && row === "C" && (41 <= number && number <= 52)) || // CブロックC列
      (floor === 2 && zone === "C" && row === "D" && (52 <= number && number <= 57)) || // CブロックD列

      // 3階
      (floor === 3 && zone === "L" && row === "A" && (35 <= number && number <= 45)) || // LブロックA列
      (floor === 3 && zone === "L" && row === "B" && (32 <= number && number <= 43)) || // LブロックB列
      (floor === 3 && zone === "L" && row === "C" && (32 <= number && number <= 43)) || // LブロックC列
      (floor === 3 && zone === "L" && row === "D" && (32 <= number && number <= 43)) || // LブロックD列
      (floor === 3 && zone === "L" && row === "E" && (33 <= number && number <= 42)) || // LブロックE列
      (floor === 3 && zone === "L" && row === "F" && (32 <= number && number <= 41)) || // LブロックF列
      (floor === 3 && zone === "L" && row === "G" && (30 <= number && number <= 40)) || // LブロックG列
      (floor === 3 && zone === "L" && row === "H" && (35 <= number && number <= 40)) || // LブロックH列

      (floor === 3 && zone === "C" && row === "A" && (46 <= number && number <= 56)) || // CブロックA列
      (floor === 3 && zone === "C" && row === "B" && (44 <= number && number <= 55)) || // CブロックB列
      (floor === 3 && zone === "C" && row === "C" && (44 <= number && number <= 55)) || // CブロックC列
      (floor === 3 && zone === "C" && row === "D" && (44 <= number && number <= 55)) || // CブロックD列
      (floor === 3 && zone === "C" && row === "E" && (43 <= number && number <= 52)) || // CブロックE列
      (floor === 3 && zone === "C" && row === "F" && (42 <= number && number <= 52)) || // CブロックF列
      (floor === 3 && zone === "C" && row === "G" && (41 <= number && number <= 52)) || // CブロックG列
      (floor === 3 && zone === "C" && row === "H" && (41 <= number && number <= 46)) // CブロックH列
    ) {
      result("sumire");
    } else if (
      // かのん㌠
      // 1階
      (floor === 1 && zone === "F" && ("I" <= row && row <= "N") && (34 <= number && number <= 45)) || // Fブロック
      (floor === 1 && zone === "C" && row === "A" && (34 <= number && number <= 45)) || // CブロックA列
      (floor === 1 && zone === "C" && row === "B" && (33 <= number && number <= 46)) || // CブロックB列
      (floor === 1 && zone === "C" && row === "C" && (32 <= number && number <= 47)) || // CブロックC列
      (floor === 1 && zone === "C" && row === "D" && (31 <= number && number <= 48)) || // CブロックD列
      (floor === 1 && zone === "C" && row === "E" && (30 <= number && number <= 49)) || // CブロックE列
      (floor === 1 && zone === "C" && row === "F" && (29 <= number && number <= 50)) || // CブロックF列
      (floor === 1 && zone === "C" && row === "G" && (28 <= number && number <= 51)) || // CブロックG列
      (floor === 1 && zone === "C" && row === "H" && (27 <= number && number <= 52)) || // CブロックH列
      (floor === 1 && zone === "C" && row === "I" && (26 <= number && number <= 53)) || // CブロックI列
      (floor === 1 && zone === "C" && row === "J" && (25 <= number && number <= 54)) || // CブロックJ列
      (floor === 1 && zone === "C" && row === "K" && (24 <= number && number <= 55)) || // CブロックK列
      (floor === 1 && zone === "C" && row === "L" && (23 <= number && number <= 56)) || // CブロックL列
      (floor === 1 && zone === "C" && row === "M" && (23 <= number && number <= 56)) || // CブロックM列
      (floor === 1 && zone === "C" && row === "N" && (26 <= number && number <= 52)) || // CブロックN列
      (floor === 1 && zone === "C" && row === "O" && (29 <= number && number <= 50)) || // CブロックO列
      (floor === 1 && zone === "C" && row === "P" && (34 <= number && number <= 45)) || // CブロックP列

      // 2階
      (floor === 2 && zone === "C" && row === "A" && (56 <= number && number <= 85)) || // CブロックA列
      (floor === 2 && zone === "C" && row === "B" && (54 <= number && number <= 86)) || // CブロックB列
      (floor === 2 && zone === "C" && row === "C" && (53 <= number && number <= 88)) || // CブロックC列
      (floor === 2 && zone === "C" && row === "D" && (58 <= number && number <= 83)) || // CブロックD列

      // 3階
      (floor === 3 && zone === "C" && row === "A" && (57 <= number && number <= 89)) || // CブロックA列
      (floor === 3 && zone === "C" && row === "B" && (56 <= number && number <= 91)) || // CブロックB列
      (floor === 3 && zone === "C" && row === "C" && (56 <= number && number <= 91)) || // CブロックC列
      (floor === 3 && zone === "C" && row === "D" && (56 <= number && number <= 91)) || // CブロックD列
      (floor === 3 && zone === "C" && row === "E" && (53 <= number && number <= 93)) || // CブロックE列
      (floor === 3 && zone === "C" && row === "F" && (53 <= number && number <= 93)) || // CブロックF列
      (floor === 3 && zone === "C" && row === "G" && (53 <= number && number <= 94)) // CブロックG列
    ) {
      result("kanon");
    } else if (
      // 可可㌠
      // 1階
      (floor === 1 && zone === "R" && row === "C" && number === 48) || // RブロックC列
      (floor === 1 && zone === "R" && row === "D" && (49 <= number && number <= 50)) || // RブロックD列
      (floor === 1 && zone === "R" && row === "E" && (50 <= number && number <= 52)) || // RブロックE列
      (floor === 1 && zone === "R" && row === "F" && (51 <= number && number <= 54)) || // RブロックF列
      (floor === 1 && zone === "R" && row === "G" && (52 <= number && number <= 56)) || // RブロックG列
      (floor === 1 && zone === "R" && row === "H" && (53 <= number && number <= 58)) || // RブロックH列
      (floor === 1 && zone === "R" && row === "I" && (54 <= number && number <= 60)) || // RブロックI列
      (floor === 1 && zone === "R" && row === "J" && (55 <= number && number <= 62)) || // RブロックJ列
      (floor === 1 && zone === "R" && row === "K" && (56 <= number && number <= 64)) || // RブロックK列
      (floor === 1 && zone === "R" && row === "L" && (57 <= number && number <= 66)) || // RブロックL列
      (floor === 1 && zone === "R" && row === "M" && (57 <= number && number <= 65)) || // RブロックM列

      // 2階
      (floor === 2 && zone === "C" && row === "A" && (86 <= number && number <= 95)) || // CブロックA列
      (floor === 2 && zone === "C" && row === "B" && (87 <= number && number <= 97)) || // CブロックB列
      (floor === 2 && zone === "C" && row === "C" && (89 <= number && number <= 100)) || // CブロックC列
      (floor === 2 && zone === "C" && row === "D" && (84 <= number && number <= 89)) || // CブロックD列

      (floor === 2 && zone === "R" && row === "A" && (96 <= number && number <= 105)) || // RブロックA列
      (floor === 2 && zone === "R" && row === "B" && (98 <= number && number <= 108)) || // RブロックB列
      (floor === 2 && zone === "R" && row === "C" && (101 <= number && number <= 112)) || // RブロックC列
      (floor === 2 && zone === "R" && row === "D" && (90 <= number && number <= 99)) || // RブロックD列

      // 3階

      (floor === 3 && zone === "C" && row === "A" && (90 <= number && number <= 100)) || // CブロックA列
      (floor === 3 && zone === "C" && row === "B" && (92 <= number && number <= 103)) || // CブロックB列
      (floor === 3 && zone === "C" && row === "C" && (92 <= number && number <= 103)) || // CブロックC列
      (floor === 3 && zone === "C" && row === "D" && (92 <= number && number <= 103)) || // CブロックD列
      (floor === 3 && zone === "C" && row === "E" && (94 <= number && number <= 103)) || // CブロックE列
      (floor === 3 && zone === "C" && row === "F" && (94 <= number && number <= 104)) || // CブロックF列
      (floor === 3 && zone === "C" && row === "G" && (95 <= number && number <= 106)) || // CブロックG列
      (floor === 3 && zone === "C" && row === "H" && (101 <= number && number <= 106)) || // CブロックH列

      (floor === 3 && zone === "R" && row === "A" && (101 <= number && number <= 111)) || // RブロックA列
      (floor === 3 && zone === "R" && row === "B" && (104 <= number && number <= 115)) || // RブロックB列
      (floor === 3 && zone === "R" && row === "C" && (104 <= number && number <= 115)) || // RブロックC列
      (floor === 3 && zone === "R" && row === "D" && (104 <= number && number <= 115)) || // RブロックD列
      (floor === 3 && zone === "R" && row === "E" && (104 <= number && number <= 113)) || // RブロックE列
      (floor === 3 && zone === "R" && row === "F" && (105 <= number && number <= 114)) || // RブロックF列
      (floor === 3 && zone === "R" && row === "G" && (107 <= number && number <= 117)) || // RブロックG列
      (floor === 3 && zone === "R" && row === "H" && (107 <= number && number <= 112)) // RブロックH列
    ) {
      result("keke");
    } else if (
      // 恋㌠
      // 1階
      (floor === 1 && zone === "F" && ("I" <= row && row <= "N") && (46 <= number && number <= 51)) || // Fブロック
      (floor === 1 && zone === "R" && row === "A" && (46 <= number && number <= 57)) || // RブロックA列
      (floor === 1 && zone === "R" && row === "B" && (47 <= number && number <= 58)) || // RブロックB列
      (floor === 1 && zone === "R" && row === "C" && (49 <= number && number <= 60)) || // RブロックC列
      (floor === 1 && zone === "R" && row === "D" && (51 <= number && number <= 63)) || // RブロックD列
      (floor === 1 && zone === "R" && row === "E" && (53 <= number && number <= 66)) || // RブロックE列
      (floor === 1 && zone === "R" && row === "F" && (55 <= number && number <= 69)) || // RブロックF列
      (floor === 1 && zone === "R" && row === "G" && (57 <= number && number <= 72)) || // RブロックG列
      (floor === 1 && zone === "R" && row === "H" && (59 <= number && number <= 75)) || // RブロックH列
      (floor === 1 && zone === "R" && row === "I" && (61 <= number && number <= 78)) || // RブロックI列
      (floor === 1 && zone === "R" && row === "J" && (63 <= number && number <= 77)) || // RブロックJ列
      (floor === 1 && zone === "R" && row === "K" && (65 <= number && number <= 77)) || // RブロックK列
      (floor === 1 && zone === "R" && row === "L" && (67 <= number && number <= 77)) || // RブロックL列
      (floor === 1 && zone === "R" && row === "M" && (66 <= number && number <= 72)) || // RブロックM列

      // 2階
      (floor === 2 && zone === "R" && row === "A" && (106 <= number && number <= 133)) || // RブロックA列
      (floor === 2 && zone === "R" && row === "B" && (109 <= number && number <= 136)) || // RブロックB列
      (floor === 2 && zone === "R" && row === "C" && (113 <= number && number <= 140)) || // RブロックC列
      (floor === 2 && zone === "R" && row === "D" && (100 <= number && number <= 117)) || // RブロックD列

      // 3階
      (floor === 3 && zone === "R" && row === "A" && (112 <= number && number <= 140)) || // RブロックA列
      (floor === 3 && zone === "R" && row === "B" && (116 <= number && number <= 146)) || // RブロックB列
      (floor === 3 && zone === "R" && row === "C" && (116 <= number && number <= 145)) || // RブロックC列
      (floor === 3 && zone === "R" && row === "D" && (116 <= number && number <= 146)) || // RブロックD列
      (floor === 3 && zone === "R" && row === "E" && (114 <= number && number <= 130)) || // RブロックE列
      (floor === 3 && zone === "R" && row === "F" && (115 <= number && number <= 129)) || // RブロックF列
      (floor === 3 && zone === "R" && row === "G" && (118 <= number && number <= 119)) // RブロックG列
    ) {
      result("ren");
    } else {
      result("error");
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