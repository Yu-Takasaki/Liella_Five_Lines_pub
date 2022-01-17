// 東京追加公演専用

// アリーナ記号外部変数
const arena_XA = "L";
const arena_XB = "S";
const arena_XC = "P";
const arena_A = "U";
const arena_B = "E";
const arena_C = "T";
const arena_D = "A";
const arena_E = "O";
const arena_F = "V";

/*
アリーナの配置

   | XA | XB | XC |
 A | A  | B  | C  | C
 D | D  | E  | F  | F

*/

const arenaArray = [
  arena_XA,
  arena_XB,
  arena_XC,
  arena_A,
  arena_B,
  arena_C,
  arena_D,
  arena_E,
  arena_F,
];

$(function () {
  // 画像配列
  const img = new Array();
  img[0] = new Image();
  img[0] = "./img/result_sample.png";
  img[1] = new Image();
  img[1] = "./img/result_sample.png";
  img[2] = new Image();
  img[2] = "./img/result_sample.png";
  img[3] = new Image();
  img[3] = "./img/result_sample.png";
  img[4] = new Image();
  img[4] = "./img/result_sample.png";

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
  function createFloorSelection(maxFloor, baseFloor = 1) {
    deleteTargetOptions("#select-floor");
    const floorArray = _.map([...Array(maxFloor)], (_, i) => {
      return i + baseFloor;
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

  // 東京追加公演選択肢生成
  $("#select-venue").change(function () {
    const venue = $("#select-venue").val();
    console.log("会場：", venue);
    if (venue !== "ariake") {
      deleteOptions();
      displayNone("#input-seat");
      releaseDisplay("#illust-container");
      return;
    } else {
      displayNone("#illust-container");
      releaseDisplay("#input-seat");
      releaseDisplay("#input-zone");
    }
    console.log("有明！！！");

    //ブロック
    const alphabets = [...'ABCDEFGHI'];
    let zoneArray = [];
    for (let index = 0; index < 3; index++) {
      const newArray = _.map(alphabets, x => {
        return index + 1 + x;
      });
      zoneArray = _.concat(zoneArray, newArray);
    }
    // zoneArray.push("上記以外(アリーナ)");
    zoneArray = _.concat(arenaArray, zoneArray); // アリーナの記号がわかったら導入する
    zoneArray.unshift("ブロックを選択")
    createOptions("#select-zone", zoneArray);
    releaseDisplay("#input-zone");

    // 番号
    $("#select-zone").change(function () {
      const nowBlock = $("#select-zone").val();
      console.log("nowBlock: ", nowBlock)
      console.log("arenaArray: ", arenaArray)
      if (arenaArray.includes(nowBlock)) {
        releaseDisplay("#input-number");
        $("#row-number").change(function () {
          const val = $("#row-number").val();
          if (val < 1 || 28 < val) {
            releaseDisplay("#numberTips");
            $("#row-number").val("");
          } else {
            displayNone("#numberTips");
          }
        });
      } else {
        displayNone("#input-number");
      }
    });
  });

  // 東京追加公演用判定
  $("#judge-btn").click(function () {
    const floor = Number($("#select-floor").val());
    const zone = $("#select-zone").val();
    const row = $("#select-row").val();
    const number = Number($("#row-number").val());
    console.log("floor: ", floor, "zone: ", zone, "row: ", row, "number: ", number);

    if (
      // 千砂都㌠
      (zone === arena_A && 1 <= number && number <= 8) || // アリーナのブロックがわかったら反映する
      (zone === "1A" || zone === "2A" || zone === "3A") ||
      (zone === "1B" || zone === "2B" || zone === "3B")
    ) {
      result("chisato");
    } else if (
      // すみれ㌠
      (zone === arena_XA || zone === arena_D || (zone === arena_A && 9 <= number && number <= 28)) || // アリーナのブロックがわかったら反映する
      (zone === "1C" || zone === "2C" || zone === "3C") ||
      (zone === "1D" || zone === "2D" || zone === "3D")
    ) {
      result("sumire");
    } else if (
      // かのん㌠
      (zone === arena_XB || zone === arena_B || zone === arena_E) || // アリーナのブロックがわかったら反映する
      (zone === "1E" || zone === "2E" || zone === "3E")
    ) {
      result("kanon");
    } else if (
      // 可可㌠
      (zone === arena_XC || zone === arena_F || (zone === arena_C && 1 <= number && number <= 20)) || // アリーナのブロックがわかったら反映する
      (zone === "1F" || zone === "2F" || zone === "3F") ||
      (zone === "1G" || zone === "2G" || zone === "3G")
    ) {
      result("keke");
    } else if (
      // 恋㌠
      (zone === arena_C && 21 <= number && number <= 28) || // アリーナのブロックがわかったら反映する
      (zone === "1H" || zone === "2H" || zone === "3H") ||
      (zone === "1I" || zone === "2I" || zone === "3I")
    ) {
      result("ren");
    } else if ( zone === "上記以外(アリーナ)") {
      result("ariake-arena");
    } else {
      result("error");
    }
  });

  // 担当メンバー表示
  function result(member) {
    globalChara = member;
    console.log("担当:", member)
    let src = null, color = null, text = "", width = null;
    releaseDisplay("#share-btn");
    releaseDisplay("#result");
    releaseDisplay(".liella-icon-container");
    displayNone("#extra-button");
    displayNone("#ariake-arena-tips");
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
    } else if (member === "ariake-arena") {
      displayNone(".liella-icon-container");
      releaseDisplay("#ariake-arena-tips");
      color = "#f3200d";
      text = "アリーナ席";
    } else if (member === "error") {
      src = "./img/error.png";
      color = "#f3200d";
      text = "そこには座席が無いYO!!";
      displayNone("#share-btn");
    }
    $('#liella-img').attr("src", src);
    $('#result').css({'color': color, 'width' : width});
    $('#result').html(text);
    $('#modal-options').iziModal('open');
  }

  // モーダル初期化
  $("#modal-options").iziModal();
});