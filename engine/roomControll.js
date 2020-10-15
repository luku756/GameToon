
//룸을 초기화하고 새 룸으로 변경한다.
//새 룸
function change_Room(newroom) {

    load_complete = false;
    clear_Room(true);
    load_Room(newroom);
    load_complete = true;
}

//이전에 있던 룸을 초기화하여 정리한다.
//true - 오브젝트 전부 삭제
//false - 오브젝트 보존, 화면에서만 삭제
function clear_Room(type) {
    //지금 진행되면 곤란하다

    if (type == true) {

        //백그라운드 전부 지우기
        for (var i = 0; i < nowBackgrounds.length; i++) {
            stage.removeChild(nowBackgrounds[i]);
        }
        nowBackgrounds = [];    //비워야제

        //오브젝트 클리어.
        var length = nowRoom.having_objects.length;
//        console.log("len - " + length);
        for (var i = length - 1; i >= 0; i--) {   // 비우면 인덱스가 내려가니까 뒤에서부터 비우기
//            console.log("remove for roomclear - " + nowRoom.having_objects[i].name);
            removeObjects(nowRoom.having_objects[i]);
        }


    }
    else {
        console.log("sorry, i can't fin this");
    }

}

//룸 읽어들이기
function load_Room(newroom) {

//    console.log("@load Room! new room = " + newroom.name);
//    console.log("roomnum = " + newroom.number);
//console.log(newroom);
    nowRoom = newroom;  //새 룸은 이거다!

    newroom.having_objects.length = 0; //배열 비우기, 오브젝트 초기화하기
    //세팅에 따라서 이걸 하고 안하고 할 수도 있을 것 같다.

    //배경화면은 오브젝트보다 뒤에 있어야 하므로 먼저 그린다. 이게 뒤에 있으면 오브젝트가 전부 안보이게 됨
    //배경화면 설정. 배경화면을 bitmap으로 제작하고 화면상에 그린다.
    var backimage;
    newroom.backgroundList = new Array();

    for (var i = 0; i < newroom.backgrounds.length; i++) {
//        console.log();
        if (newroom.backgrounds_type[i] == "scale")
            backimage = draw_background_scale(newroom.backgrounds[i],newroom, 0, 0);
        else
            backimage = draw_background_repeat(newroom.backgrounds[i], newroom, 0, 0);
    }

    //console.log("obj list");
    //초기 배치 오브젝트들을 배치한다
    for (var i = 0; i < newroom.objects.length; i++) {

        create_object(newroom.objects[i], newroom.object_coordinate[i].x, newroom.object_coordinate[i].y);
    }
    //룸의 뷰 크기에 따라 뷰 조정. 뷰 좌표와 크기를 보고 정한다
    moveView_fix(newroom.view_coordinate_x, newroom.view_coordinate_y, newroom.viewwidth, newroom.viewheight);

    //뷰 추적 타입
    if (newroom.viewtype == "tracking") {
        viewTrakingFlag = true;
    }
    else {
        viewTrakingFlag = false;
    }
}
