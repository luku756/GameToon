
//해당 이벤트에 달린 액션Api 들을 실행하는 함수
//해당 오브젝트, 이벤트명, 오브젝트 원형(이벤트-액션에 대한 정보 지님)
function runActionFunctions(object, eventname, shape) {
//    if (nowRoom.name == "game" && load_complete == false) {
//        return;
//    }
    var result = null;
    var checkFlag = false;
    var paramlist;  //액션 파라미터를 지닌 배열
//    if (object.name == "slime3") {
//        console.log("slime3''s " + eventname);

    //    }
    //    console.log("evname - " + eventname + " shape = " + shape.name);
    var tabcount = 0;
//    console.log("event - " + eventname);
    for (var i = 0; i < shape.event_action_list[eventname].length; i++) {
//        console.log("line "+(i-3)+"번 - " + shape.event_action_list[eventname][i] + " chkflag = " + checkFlag + " result = " + result);
        if (shape.event_action_list[eventname][i] == '{' && checkFlag == true && result == false) {
            i += Number(shape.action_parameter_list[eventname][i][0]);
            checkFlag = false;
            result = null;
            continue;
        }
        else if (shape.event_action_list[eventname][i] == '{') {
            continue;
        }
        else if (shape.event_action_list[eventname][i] == '}') {
            continue;
        }

        if (checkFlag == true) {//체크 플래그가 서 있다. 즉 전 액션이 체크이다
            if (result == true) {//전 체크가 true 일 때만 실행
                paramlist = shape.action_parameter_list[eventname][i].slice(0); //배열 복제
                paramlist.push(object); //본인 추가
                result = window[shape.event_action_list[eventname][i]].apply(this, paramlist); //액션 함수 실행
            }
            else {//전 체크가 false였다.
                if (shape.event_action_list[eventname][i].substring(0, 5) == "check") {//근데 이번껏도 check 라면?
                    continue; //어차피 실패이므로 실패 세팅 이어가기 (중첩 if문)
                }
                result = null;
            }
            checkFlag = false;  //체크 플래그 내림
        }
        else {
            paramlist = shape.action_parameter_list[eventname][i].slice(0);
            paramlist.push(object); //본인 추가
//            if (eventname == 'key_down 32') {
//                console.log(shape.event_action_list[eventname][i]);
//                console.log(paramlist);
//            }
//            try {
//                console.log("try");
                result = window[shape.event_action_list[eventname][i]].apply(this, paramlist);
//                throw new Error(301, "an error");
//            }
//            catch (e) {
//                if (e.message == "Cannot read property 'apply' of undefined")
//                    console.log("err!! action " + shape.event_action_list[eventname][i] + " is undefined action!");
//                else {
//                    console.log("err = " + e.message);
//                    console.log(e);
//                }
//            }

        }

        if (result != undefined) {//true나 false라면 지금 실행한 게 check플래그인 것이다
            checkFlag = true;
        }

        // console.log("i = " + i + " name = " + shape.event_action_list[eventname][i] + " chkflag = " + checkFlag + " result = " + result);

    }


}


//object_creates (생성 이벤트) 처리 함수
//타겟 오브젝트(생성된 오브젝트)
function event_create(target) {
    var eventname = "object_creates";   //이 이벤트의 이름
    var shape = objectResource[target.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

//    console.log("object_creates event for " + target.name);
    //console.log(shape.event_action_list[eventname]);

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(target,eventname,shape);


}

//object_creates (생성 이벤트) 처리 함수
//타겟 오브젝트(생성된 오브젝트)
function event_destroy(target) {
    var eventname = "object_destroy";   //이 이벤트의 이름
    var shape = objectResource[target.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

//    console.log("object_destroy event for " + target.name);
    //console.log(shape.event_action_list[eventname]);
    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(target, eventname, shape);


}

//always 이벤트 처리 함수 콜백함수, 이벤트 리스너
//이벤트 객체가 넘어온다. (event.currentTarget == 이벤트 발생 주체, 즉 해당 오브젝트)
function event_step(object) {
//    console.log("step event = " + object.name);
    var eventname = "always";   //이 이벤트의 이름
    var shape = objectResource[object.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    if (load_complete == true)//스탑에서 키입력 받기 없기
    //이 이벤트에 할당된 액션들을 실행한다.
        runActionFunctions(object, eventname, shape);


}

//timerx (x 번째타이머 이벤트) 처리 함수
//대상 오브젝트, 타이머 번호
function event_timer(target, timerNumber) {
    var eventname = "timer " + timerNumber;
    var shape = objectResource[target.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

//    console.log(eventname + " event for " + target.name + " id : " + target.id);

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(target, eventname, shape);

}

//키 이벤트 (keydown, keypress, keyup) 이벤트 처리 함수
//키 타입(down/press/up), 키 번호, 대상 오브젝트
function event_key(type, keynum, target) {
    var eventname = type + " " + keynum;
    var shape = objectResource[target.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

//        console.log("key event " + eventname + " for " + target.name);
    if (load_complete == true)//스탑에서 키입력 받기 없기
        runActionFunctions(target, eventname, shape);

}

//마우스 누름 이벤트
//이벤트 객체
function event_mousedown(event) {

    var eventname = "mouce_down";   //이 이벤트의 이름
    var shape = objectResource[event.currentTarget.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(event.currentTarget, eventname, shape)

}

//마우스 누르는중 이벤트
//이벤트 객체
function event_mousepress(event) {

    var eventname = "mouce_press";   //이 이벤트의 이름
    var shape = objectResource[event.currentTarget.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//마우스 뗌 이벤트
//이벤트 객체
function event_mouseup(event) {

    var eventname = "mouce_up";   //이 이벤트의 이름
    var shape = objectResource[event.currentTarget.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//마우스 올라감 이벤트
//이벤트 객체
function event_mouseover(event) {

    var eventname = "mouce_over";   //이 이벤트의 이름
    var shape = objectResource[event.currentTarget.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//마우스 벗어남 이벤트
//이벤트 객체
function event_mouseout(event) {

    var eventname = "mouce_out";   //이 이벤트의 이름
    var shape = objectResource[event.currentTarget.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(event.currentTarget, eventname, shape)

}

//충돌 이벤트
//주 오브젝트, 충돌한 대상 오브젝트
function event_collision(object, target, targetname) {

    var eventname = "collision " + targetname;   //이 이벤트의 이름
    var shape = objectResource[object.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님
//    if (object.name == 'obj_monster' || object.name == 'obj_player') {
//        console.log(object.name + "'s collision = " + eventname + " y = " + object.y);
//        
//    }
    //이 이벤트에 할당된 액션들을 실행한다.
    runActionFunctions(object, eventname, shape)



}

function event_drawTime(object) {

//    console.log("draw event + " + object.name);
    var eventname = "drawTime"                  //이 이벤트의 이름
    var shape = objectResource[object.name];    //오브젝트 원형. 이벤트-액션에 대한 정보 지님

    runActionFunctions(object, eventname, shape)
}