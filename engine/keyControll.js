
var keypressMap = new Array();          //keypress �̺�Ʈ�� �ɸ� ������Ʈ���� ��. (Ű��ȣ:������Ʈ �迭)
var keydownMap = new Array();           //keydown �̺�Ʈ�� �ɸ� ������Ʈ���� ��. (Ű��ȣ:������Ʈ �迭)
var keyupMap = new Array();             //keyup �̺�Ʈ�� �ɸ� ������Ʈ���� ��. (Ű��ȣ:������Ʈ �迭)



//Ű ������ ���θ� üũ�� �ش�
var keypressChecker = new Array();

//Ű �ٿ� ������, �� �ȿ��� Ű�ٿ� �̺�Ʈ�� �����Ͽ� ������ �ش�
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


    //������ ���� ���� �ƴϸ�
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

//Ű �� ������. �� �ȿ��� Ű �� �̺�Ʈ�� �޾� ������ �ش�.
function keyupListener(event) {

    var keynum = event.keyCode;
    delete keypressChecker[keynum];

    if (keyupMap[keynum] != null) {
        for (var i = 0; i < keyupMap[keynum].length; i++) {
            event_key("key_up", keynum, keyupMap[keynum][i]);
        }
    }

}

//Ű ������ ������. Ű �ٿ�/Ű�� �����ʸ� ���� ���� ����μ� Ű ������ �����϶� 
function keypressListener(keyCode) {
    var keynum =keyCode;

    if (keypressMap[keynum] != null) {
        for (var i = 0; i < keypressMap[keynum].length; i++) {
            event_key("key_press", keynum, keypressMap[keynum][i]);
        }
    }
}