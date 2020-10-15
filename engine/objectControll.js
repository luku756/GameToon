
var nullsprite = null;
//오브젝트 생성하기.
//오브젝트 원형, x좌표, y좌표
function create_object(objectShape, x, y, xspeed, yspeed, xaccel, yaccel) {
//    console.log(objectShape);
    //console.log("***object - create! now creating " + objectShape.name);
//                console.log("obj shape");
    //                console.log(objectShape);
//    console.log(objectShape);
    var object;
    if (objectShape.spriteflag == false) {//스프라이트가 없는 오브젝트
        if (nullsprite == null) {//처음일 경우
            nullsprite = createSpriteData("nullimage.png",1,1,0,0,1);
        }
        object = createSprite(nullsprite, 1, 1, x, y);//널스프라이트를 붙인다
    }
    //TODO
    else {//스프라이트 생성
        //console.log("name = " + objectShape.sprite.images);
        //console.log(objectShape.sprite.spriteData);
        object = createSprite( objectShape.sprite.spriteData,1,1,x,y);
        //object = drawImage_preload(image, 1, 1, x, y);
    }

    //z-order 를 보고 stage.children에서 스프라이트 위치 변경을 해야할 것


    //오브젝트 속성 쓰기
    for (var status in objectShape) {
        if (status != "action_parameter_list" && status != "event_action_list" && status != "event_list") {
            object[status] = objectShape[status];
        }
    }
    //오브젝트 좌표 적기 (좌표는 뒤에 있어야 제대로 인식된다. 덮어씌워지니까)
    object.x = x;
    object.y = y;

    //속도, 가속도는 있을 때만 넣는다
    if (xspeed != null)
        object.xspeed = xspeed;
    if (yspeed != null)
        object.yspeed = yspeed;
    if (xaccel != null)
        object.xaccel = xaccel;
    if (yaccel != null)
        object.yaccel = yaccel;

    addEventToObject(object);

    nowRoom.having_objects.push(object);
    if (object.name == 'obj_player')
        p1 = object;
    if (object.name == 'obj_foot')
        f1 = object;
//    object.regX = object.sprite.width * object.scaleX / 2;
//    object.regY = object.sprite.height * object.scaleY / 2;
    //console.log(nowRoom.having_objects);
    return object;

}

//오브젝트에 이벤트-액션을 보고 리스너 등을 붙인다. 오브젝트 생성과정의 일부
//오브젝트
function addEventToObject(object) {

    var shape = objectResource[object.name]; //오브젝트 원형. 이벤트-액션에 대한 정보 지님
    var eventname;
    for (var i = 0; i < shape.event_list.length; i++) {
        eventname = shape.event_list[i];
        
        if (eventname == "always") {//'언제나' 이벤트는 tick 타입 리스너를 붙인다
            stepEventBox.push(object);
            //object.addEventListener("tick", event_always);
        }
        else if (eventname == "object_creates") {//'생성시' 이벤트는 생성하는 시점에서 바로 실행해 준다
            event_create(object);
        }
        else if (eventname.substring(0, 5) == "timer") {    //timer 이벤트. 이벤트 배열에 등록을 해 준다.
            //console.log(object.name + " - " + eventname);
            var timernum = Number(eventname.substring(6));
            //console.log(timernum);

            if (timerHaverMap[timernum] == null) {
                var newarray = new Array();
                newarray.push(object);
                timerHaverMap[timernum] = newarray;
            }
            else {
                timerHaverMap[timernum].push(object);
            }
        }
        else if (eventname.substring(0, 9) == "key_press") {    //keypress 이벤트. 이벤트 배열에 등록을 해 준다.
            //console.log(object.name + " - " + eventname);
            var keynum = Number(eventname.substring(10));
            //console.log(keynum);

            if (keypressMap[keynum] == null) {
                var newarray = new Array();
                newarray.push(object);
                keypressMap[keynum] = newarray;
            }
            else {
                keypressMap[keynum].push(object);
            }
        }
        else if (eventname.substring(0, 8) == "key_down") {    //keydown 이벤트. 이벤트 배열에 등록을 해 준다.
            //console.log(object.name + " - " + eventname);
            var keynum = Number(eventname.substring(9));
            //console.log(keynum);

            if (keydownMap[keynum] == null) {
                var newarray = new Array();
                newarray.push(object);
                keydownMap[keynum] = newarray;
            }
            else {
                keydownMap[keynum].push(object);
            }
        }
        else if (eventname.substring(0, 6) == "key_up") {    //keyup 이벤트. 이벤트 배열에 등록을 해 준다.
            //console.log(object.name + " - " + eventname);
            var keynum = Number(eventname.substring(7));
            //console.log(keynum);

            if (keyupMap[keynum] == null) {
                var newarray = new Array();
                newarray.push(object);
                keyupMap[keynum] = newarray;
            }
            else {
                keyupMap[keynum].push(object);
            }
        }
        //마우스 입력 5가지 이벤트 구현
        else if (eventname == "mouce_down") {
            object.on("mousedown", event_mousedown);
        }
        else if (eventname == "mouce_press") {
            object.on("pressmove", event_mousepress);
        }
        else if (eventname == "mouce_up") {
            object.on("pressup", event_mouseup);
        }
        else if (eventname == "mouce_over") {
            object.on("mouseover", event_mouseover);
        }
        else if (eventname == "mouce_out") {
            object.on("mouseout", event_mouseout);
        }
        else if (eventname.substring(0,9) == "collision") { //충돌 이벤트
            //console.log("event " + eventname + " for " + object.name);

            if (object.collision == null) {//충돌대상 배열이 없으면 새로 생성
                var newarray = new Array();
                object.collision = newarray;
            }
            object.collision.push(eventname.substring(10));
        }
        //draw 이벤트
        else if(eventname == "drawTime"){
            event_drawTime(object);//draw 이벤트는 한 번 발동하게 되어 있다.
        }
        else if (eventname == "object_destroy") {
        //여기서 하지 않고 오브젝트 소멸시에 처리한다
        }
        else {
            console.log("non setting event - " + eventname);
        }
    }
}

//오브젝트 삭제하기
//삭제할 오브젝트
function removeObjects(target) {
//    console.log("remove object - number " + target.id + " : " + target.name);

//    if (target.name == "slime1") {
//        console.log("king's die");
    //    }
    var named = target.name;

    if (target.destroyed != true) {//무한루프 방지
        //object_destroy 이벤트를 가질 때 그 이벤트를 먼저 발생시킨다.
        var shape = objectResource[target.name]
//        console.log(target);
        index = shape.event_list.indexOf("object_destroy");
        if (index >= 0) {//존재할 때만 삭제 처리
            target.destroyed = true;
            event_destroy(target);
        }
    }
    if (target.trak == true) {
        trakingTarget = null;
    }

    var index = nowRoom.having_objects.indexOf(target); //해당 오브젝트를 오브젝트배열에서 뺴기 위해 검색
//    console.log("target = " + nowRoom.having_objects.indexOf(target));

    if (index >= 0) {//존재할 때만 삭제 처리
        nowRoom.having_objects.splice(index, 1);
    }


    var index = stepEventBox.indexOf(target); //스텝 이벤트에서 정리하기

    if (index >= 0) {//존재할 때만 삭제 처리
        stepEventBox.splice(index, 1);
    }

    //draw 오브젝트 클리어. 단 없을수 있으니 있을 때만 지우기
    if (target.draws != null) {
        var length = target.draws.length;
        for (var i = 0; i < target.draws.length; i++) {
            stage.removeChild(target.draws[i]);
        }
        target.draws = [];
    }
    //draw - 변수 오브젝트 클리어. 단 없을수 있으니 있을 때만 지우기
    if (target.drawvariables != null) {
        var length = target.drawvariables.length;
        for (var i = 0; i < target.drawvariables.length; i++) {
            stage.removeChild(target.drawvariables[i][0]);
        }
        target.drawvariables = [];
    }
    //draw - 전역변수 오브젝트 클리어. 단 없을수 있으니 있을 때만 지우기
    if (target.drawglobals != null) {
        var length = target.drawglobals.length;
        for (var i = 0; i < target.drawglobals.length; i++) {
            stage.removeChild(target.drawglobals[i][0]);
        }
        target.drawglobals = [];
    }

    //timerHaverMap 에서 해당 데이터 전부 삭제
    for (var name in timerHaverMap) {
        index = timerHaverMap[name].indexOf(target);
        if (index >= 0) {//존재할 때만 삭제 처리
            timerHaverMap[name].splice(index, 1);
        }
    }

    //keypressMap 에서 해당 데이터 전부 삭제
    for (var name in keypressMap) {
        index = keypressMap[name].indexOf(target);
        if (index >= 0) {//존재할 때만 삭제 처리
            keypressMap[name].splice(index, 1);
        }
    }

    //keydownMap 에서 해당 데이터 전부 삭제
    for (var name in keydownMap) {
        index = keydownMap[name].indexOf(target);
        if (index >= 0) {//존재할 때만 삭제 처리
            keydownMap[name].splice(index, 1);
        }
    }

    //keyupMap 에서 해당 데이터 전부 삭제
    for (var name in keyupMap) {
        index = keyupMap[name].indexOf(target);
        if (index >= 0) {//존재할 때만 삭제 처리
            keyupMap[name].splice(index, 1);
        }
    }

//    console.log("target = " + target.id);
    stage.removeChild(target);          //화면에서 제거
    target.removeAllEventListeners();   //리스너(이벤트) 제거
//    delete target;
//    console.log("target = " + nowRoom.having_objects.indexOf(target));
//    console.log(named + " removed");

}

//오브젝트가 원하는 대상이 맞는지를 확인해 준다. 부모까지 포함한다.
//원하는 오브젝트명, 확인할 대상 오브젝트
function check_targetObject(name, object) {
    
    if (name == object.name)
        return true;
    var obj = objectResource[object.name];
    //console.log(obj);
    try {
        while (obj.parentflag == true) {

            obj = obj.parent;
            if (obj.name == name)
                return true;

        }
    }
    catch (e) {
        console.log("err - name = " + name + " obj name = " + object.name);
        console.log(obj);
        console.log(e);
    }
    return false;
}