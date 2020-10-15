//if 액션 - X값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_X(value, type, object) {

//        console.log("action check_X for " + object.name);
//        console.log("value : " + value + " type = " + type);

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.x)
            return true;
    }
    else if (type == 1) {
        if (value == object.x)
            return true;
    }
    else if (type == 2) {
        if (value < object.x)
            return true;
    }

    return false;

}

//if 액션 - Y값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_Y(value, type, object) {

//    console.log("action check_Y for " + object.name);
//    console.log("value : " + value + " type = " + type);

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.y)
            return true;
    }
    else if (type == 1) {
        if (value == object.y)
            return true;
    }
    else if (type == 2) {
        if (value < object.y)
            return true;
    }
    
    return false;

}
//if 액션 - X속도값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_Xspeed(value, type, object) {

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.xspeed)
            return true;
    }
    else if (type == 1) {
        if (value == object.xspeed)
            return true;
    }
    else if (type == 2) {
        if (value < object.xspeed)
            return true;
    }

    return false;

}

//if 액션 - Y속도값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_Yspeed(value, type, object) {

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.yspeed)
            return true;
    }
    else if (type == 1) {
        if (value == object.yspeed)
            return true;
    }
    else if (type == 2) {
        if (value < object.yspeed)
            return true;
    }

    return false;

}
//if 액션 - X속도값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_Xaccel(value, type, object) {

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.xaccel)
            return true;
    }
    else if (type == 1) {
        if (value == object.xaccel)
            return true;
    }
    else if (type == 2) {
        if (value < object.xaccel)
            return true;
    }

    return false;

}

//if 액션 - Y속도값 체크 액션
//맞으면 true, 아니면 false 리턴
//기준값, 비교 타입(0/1/2 미만/같음/초과)
function check_Yaccel(value, type, object) {

    value = Number(value);
    type = Number(type);

    if (type == 0) {
        if (value > object.yaccel)
            return true;
    }
    else if (type == 1) {
        if (value == object.yaccel)
            return true;
    }
    else if (type == 2) {
        if (value < object.yaccel)
            return true;
    }

    return false;

}

//if 액션 - 룸 확인 이 이름의 룸이 현재룸인지 확인
//룸이름
function check_Room(roomName) {
    if (nowRoom.name == roomName)
        return true;
    else
        return false;

}

//if 액션 - 랜덤. 일정 확률 이상이면 리턴
//룸이름
function check_Room(percent) {

    var number = Math.random()*100;
    if (percent > Number)
        return true;
    else
        return false;

}

//if 액션 - 변수값 화긴
//변수명 값 0/1/2[미만/같음/초과])
function check_Variable(variableName, value, type, object) {
//    console.log("name : " + variableName + " value : " + object.variableMap[variableName]);
    value = Number(value);
    type = Number(type);

//    if (variableName == "boss") {
//        console.log("boss flag = " + object.variableMap[variableName]);
//        //console.log("id : " + object.id + " 's hp = " + object.variableMap[variableName]);
//    }
    if (object.variableMap == null || object.variableMap[variableName] == null) {
        console.log(object.name + " has no " + variableName);
        return false;
    }
    if (type == 0) {
        if (value > object.variableMap[variableName])
            return true;
    }
    else if (type == 1) {
        if (value == object.variableMap[variableName])
            return true;
    }
    else if (type == 2) {
        if (value < object.variableMap[variableName])
            return true;
    }

    return false;
}

//if 액션 - 전역변수값 화긴
//전역변수명 값 0/1/2[미만/같음/초과])
function check_GlobalVariable(variableName, value, type, object) {
//    console.log(globalVariableMap);
//    console.log(globalVariableMap[variableName]);
//    console.log("value = " + value);
    //value = Number(value);
    type = Number(type);
    //console.log(type);

//    if (variableName == "score") {
//        console.log("score = " + globalVariableMap[variableName]);
//        //console.log("id : " + object.id + " 's hp = " + object.variableMap[variableName]);
//    }
    if (type == 0) {
        if (value > globalVariableMap[variableName])
            return true;
    }
    else if (type == 1) {
        if (value == globalVariableMap[variableName])
            //console.log("true");
            return true;
    }
    else if (type == 2) {
        if (value < globalVariableMap[variableName])
            return true;
    }

    //console.log("false");
    return false;
}


//if 액션- 위치 확인 x,y 범위 안에 오브젝트가 있을 때 true
//x최소 x최대 y최소 y최대 오브젝트
function check_coordinate(xmin, xmax, ymin, ymax, object) {
//    console.log("check_coordinate for " + object.name);
//    console.log("xmin = " + xmin + " xmax = " + xmax + " ymin = " + ymin + " ymax = " + ymax + " x= "+ object.x + " y= " + object.y);
    xmin = toNumber(xmin);
    ymin = toNumber(ymin);
    xmax = toNumber(xmax);
    ymax = toNumber(ymax);

    if (xmin <= object.x && object.x <= xmax && ymin <= object.y && object.y <= ymax) {
//        console.log("coordinate pass!");
        return true;
    }
    return false;
}

//if 액션- 위치 확인 x 범위 안에 오브젝트가 있을 때 true
//x최소 x최대  오브젝트
function check_coordinate_x(xmin, xmax,object) {
//    console.log("check_coordinate x for " + object.name);
//    console.log(object);
//    console.log("xmin = " + xmin + " xmax = " + xmax +" x= " + object.x );
    xmin = toNumber(xmin);
//    ymin = toNumber(ymin);
    xmax = toNumber(xmax);
//    ymax = toNumber(ymax);

    if (xmin <= object.x && object.x <= xmax ) {
//        console.log("coordinate pass!");
        return true;
    }
    return false;
}

//if 액션- 위치 확인 y 범위 안에 오브젝트가 있을 때 true
// y최소 y최대 오브젝트
function check_coordinate_y(ymin, ymax, object) {
//    console.log("check_coordinate y for " + object.name);
//    console.log( " ymin = " + ymin + " ymax = " + ymax + " y= " + object.y);
//    xmin = toNumber(xmin);
    ymin = toNumber(ymin);
//    xmax = toNumber(xmax);
    ymax = toNumber(ymax);

    if ( ymin <= object.y && object.y <= ymax) {
//        console.log("coordinate pass!");
        return true;
    }
    return false;
}

//오브젝트가 룸 밖으로 나갔으면 true
function check_outRoom(object) {
//    console.log("check out - " + object.name);
//    console.log("x = " + object.x + " y= " + object.y + " minx = " + (object.x + object.sprite.width * object.scaleX) + " miny = " + (object.y + object.sprite.height * object.scaleY));
//    console.log("jump - " + globalVariableMap["jump"]);
    if (object.x > nowRoom.width)
        return true;
    else if (object.y > nowRoom.height)
        return true;
    if (object.spriteflag == true) {
        if (object.x + object.sprite.width * object.scaleX < 0)
            return true;
        else if (object.y + object.sprite.height * object.scaleY < 0)
            return true;

    }


    return false;
}

//특정 오브젝트와 충돌하였는지 체크한다.
//대상오브젝트명, 발동오브젝트
function check_collisionObject(targetName, object) {
    //    console.log("check_collision - target = " + targetName + " for " + object.name);

    var result;
    //    console.log("collison check");
    var collisionObjects = new Array();
    //현재 룸에 존재하는 모든 오브젝트에 대하여 실행하도록 한다.
    for (var t = 0; t < nowRoom.having_objects.length; t++) {
        if (check_targetObject(targetName1, nowRoom.having_objects[t]) == true) {
            result = check_collision(nowRoom.having_objects[t], object);
            if (result == true) {
                return true;
            }
        }
    }
    return false;
}

//두 오브젝트가 충돌하였는지 체크한다.
//대상오브젝트1이름, 대상오브젝트2이름
function check_collisionObject(targetName1, targetName2, object) {
//    console.log("check_collisionObject - target1 = " + targetName1 + " target2 = " + targetName2);

    var result;
    //    console.log("collison check");
    var collisionObjects = new Array();
    //현재 룸에 존재하는 모든 오브젝트에 대하여 실행하도록 한다.
    for (var t = 0; t < nowRoom.having_objects.length; t++) {
        for (var p = 0; p < nowRoom.having_objects.length; p++) {
            if (t != p) {
                if (check_targetObject(targetName1, nowRoom.having_objects[t]) == true && check_targetObject(targetName2, nowRoom.having_objects[p]) == true) {
                    result = check_collision(nowRoom.having_objects[t], nowRoom.having_objects[p]);
                    if (result == true) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

//이 사운드가 재생중인지 확인

function check_Sound(soundName, object) {
//    console.log("checksound - " + soundName);
//    console.log(soundResource[soundName].sound);
//    console.log(soundPlayMap);
    if (soundPlayMap[soundResource[soundName].sound] != null) {
        return true;
    }
    return false;
}