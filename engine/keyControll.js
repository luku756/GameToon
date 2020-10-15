
var keypressMap = new Array();          //keypress 이벤트가 걸린 오브젝트들의 맵. (키번호:오브젝트 배열)
var keydownMap = new Array();           //keydown 이벤트가 걸린 오브젝트들의 맵. (키번호:오브젝트 배열)
var keyupMap = new Array();             //keyup 이벤트가 걸린 오브젝트들의 맵. (키번호:오브젝트 배열)



//키 프레스 여부를 체크해 준다
var keypressChecker = new Array();

//키 다운 리스너, 이 안에서 키다운 이벤트를 감지하여 실행해 준다
function keydownListener(event) {
    var keynum = event.keyCode;
//   console.log(keynum);
//    if (keynum == 37) {
//        prevRoom();
////        circle2.x--;
//        //        circle4.x--;
//    }
//    else if (keynum == 39) {
//        nextRoom();
//        //        circle2.x++;
//        //        circle4.x++;
//    }
//    if (keynum == 38) {
//        moveRoom("game");
////        circle2.y--;
////        circle4.y--;
//    }
//    else if (keynum == 40) {
//    moveRoom("ga");
////        circle2.y++;
////        circle4.y++;
    //    }

//   console.log(keypressChecker);
//   for (var key in keypressChecker) {
//       console.log("key = " + key);
//       if (key != keynum) {
//           console.log("dif");
//            keypressChecker[key] = null;
//        }
//    }


    //누르고 있을 때가 아니면
    if (keypressChecker[keynum] == null) {
        keypressChecker[keynum] = true;
        //console.log("keydown - " + keynum);
        if (keydownMap[keynum] != null) {
            for (var i = 0; i < keydownMap[keynum].length; i++) {
                event_key("key_down", keynum, keydownMap[keynum][i]);
                //console.log("key - " + keydownMap[keynum][i].name);
            }
        }
    }
    
}

//키 업 리스너. 이 안에서 키 업 이벤트를 받아 실행해 준다.
function keyupListener(event) {

    var keynum = event.keyCode;
    delete keypressChecker[keynum];

    if (keyupMap[keynum] != null) {
        for (var i = 0; i < keyupMap[keynum].length; i++) {
            event_key("key_up", keynum, keyupMap[keynum][i]);
        }
    }

}

//키 프레스 리스너. 키 다운/키업 리스너를 통해 얻은 결과로서 키 프레스 형태일때 
function keypressListener(keyCode) {
    var keynum =keyCode;

    if (keypressMap[keynum] != null) {
        for (var i = 0; i < keypressMap[keynum].length; i++) {
            event_key("key_press", keynum, keypressMap[keynum][i]);
        }
    }
}