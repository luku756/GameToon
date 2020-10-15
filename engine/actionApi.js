
//들어온 스트링을 숫자로 바꾼다. rand(x~x) 형식으로 들어올 수 있다.

function toNumber(num) {
    //console.log(num);
    //console.log(num.substring(0, 4));
    var resultNumber;

    if (num.substring(0, 4) == "rand") { //랜덤일 경우
        var splits;
        splits = num.substring(5, num.length - 1).split("~");
        //console.log("input = " +num +" min = " +  Number(splits[0]) + " max = " + Number(splits[1]));
        resultNumber = Math.floor(Math.random() * (Number(splits[1]) - Number(splits[0]))) + Number(splits[0]);
    }
    else {//일반일 경우
        resultNumber = Number(num);
    }
    //console.log(resultNumber);
    return resultNumber;
}



//n ms 후 실행될 타이머 세팅
//타이머 번호, 시간 간격, 오브젝트
function setTimer(timerNumber, delay, object) {
//    console.log("action setTimer for " + object.name + " id : " + object.id);
//    console.log("timerNumber = " + timerNumber + " delay = " + delay);

    //숫자화
    delay = Number(delay);

    var time = ((delay + timeCount) % 1000000000).toString(); //예약 시간

    //console.log("###########time = " + time);

    //이 시간에 타이머가 없다면
    if (timerMap[time] == null) {
        var timeArray = new Array();
//        if (timeArray[timerNumber] == null) {//이 시간에 이 번호의 타이머가 없다면
//            var timeNumArray = new Array();
//            timeArray[timerNumber] = timeNumArray;
//        }
//        timeArray[timerNumber].push(object)
        timerMap[time] = timeArray;
    }

    index = timerMap[time].indexOf(timerNumber);
    if (index == -1) {//없어야 넣기
        timerMap[time].push(timerNumber);
    }


}

//스프라이트 확대
//x 확대값, y확대값, 오브젝트
function sprite_scale(scaleX, scaleY, object) {
    scaleX = toNumber(scaleX);
    scaleY = toNumber(scaleY);
    object.scaleX = scaleX;
    object.scaleY = scaleY;

}
//스프라이트 선택
//스프라이트명, 프레임번호, 오브젝트
function sprite_select(spriteName, frameNum, object) {
//    console.log("스프라이트 선택 for " + object.name);
//    console.log(spriteName + " 의 "  + frameNum);
    frameNum = toNumber(frameNum);
    changeSprite(object,spriteName,1,frameNum,frameNum);

}

//스프라이트를 재생한다.
//스프라이트명 첫프레임번호 마지막프레임번호 재생속도(재생간격)
function sprite_run(spriteName, firstFrame, lastFrame, spriteSpeed, object) {
//    console.log("sprite rum for " + object.name + " " + firstFrame + "~" + lastFrame);
    changeSprite(object, spriteName, spriteSpeed, firstFrame, lastFrame);

}



//스프라이트 회전
//0/1[상대/절대] 회전각도 발동오브젝트
function sprite_rotate(type, degree,object) {
    type = toNumber(type);
    degree = toNumber(degree);

    if (type == 0) {
//        object.regX = object.sprite.width * object.scaleX / 2;
//        object.regY = object.sprite.height * object.scaleY / 2;
        object.rotation += degree;
    }
    else {
//        object.regX = object.sprite.width * object.scaleX / 2;
//        object.regY = object.sprite.height * object.scaleY / 2;
        object.rotation = degree;
    }


}

//게임오버, 게임 종료 이벤트
function gameOver() {

    //console.log("game over!");
    alert("Game Over!\nif you want retry, press f5");
    load_complete = false;
}

//다음 룸으로 이동
function nextRoom() {
//    console.log("nextroom");
    var nowRoomNumber = nowRoom.number;
//    console.log("roomsize = " + roomOrder.length);
//    console.log(roomOrder);
//    console.log("nowroom = " + roomResource[roomOrder[nowRoomNumber]].name);
    if (nowRoomNumber + 1 < roomOrder.length) {
        change_Room(roomResource[roomOrder[nowRoomNumber + 1]]);
    }
    else {
        alert("no next Room!");
    }
//    console.log("nextroom = " + roomResource[roomOrder[nowRoomNumber + 1]].name);

}

//이전 룸으로 이동
function prevRoom() {
    var nowRoomNumber = nowRoom.number;
    if (nowRoomNumber -1 >= 0) {
        change_Room(roomResource[roomOrder[nowRoomNumber - 1]]);
    }
    else {
        alert("no prev Room!");
    }

}

//특정 룸으로 이동
//이동할 룸이름
function moveRoom(newRoom) {
//    console.log("moveroom - " + newRoom);
    if (roomResource[newRoom] != null) {
//        console.log(roomResource[newRoom]);
        change_Room(roomResource[newRoom]);
    }
    else {
        alert("you have no " + newRoom + " Room!");
    }

}

//전역 변수 세팅
//0/1[상대/절대] 변수명 변수값
function setGlobalVariable(type, variableName, variableValue, object) {
//    console.log("set globalvariable for " + object.name);
//    console.log("name = " + variableName + " value = " + variableValue);
//    if (object.name == "slime3") {
//        console.log("set globalvariable");
//        console.log("name = " + variableName + " value = " + variableValue);

//    }
    variableValue = toNumber(variableValue);
    if (type == 0) {//상대
        if (globalVariableMap[variableName] == null)//상대라도 없으면 절대지 뭐
            globalVariableMap[variableName] = variableValue;
        else
            globalVariableMap[variableName] += variableValue;
    }
    else {
        globalVariableMap[variableName] = variableValue;
    }

    //console.log(globalVariableMap[variableName]);
}

//변수 세팅
//0/1[상대/절대] 변수명 변수값
function setVariable(type, variableName, variableValue, object) {
    //    console.log("set variable");
    //    console.log("type = " + type + " value = " +variableValue);
    variableValue = toNumber(variableValue);


    //없으면 추가
    if (object.drawvariables == null) {
        var newArray = new Array();
        object.drawvariables = newArray;
    }

    //맵이 없으면 추가
    if (object.variableMap == null) {
        var newArray = new Array();
        object.variableMap = newArray;
    }

    if (type == 0) {//상대
        if (object.variableMap[variableName] == null)//상대라도 없으면 절대지 뭐
            object.variableMap[variableName] = variableValue;
        else
            object.variableMap[variableName] += variableValue;
    }
    else {
        object.variableMap[variableName] = variableValue;
    }
    //console.log(object.variableMap[variableName]);
    //console.log(globalVariableMap[variableName]);
}


//뷰 움직이기
//x,y,가로,세로,오브젝트
function move_View(x, y, width, height, object) {
    x = toNumber(x);
    y = toNumber(y);
    width = toNumber(width);
    height = toNumber(height);
    
    moveView(x,y,width,height);


}



//타 오브젝트의 변수를 조절한다.
//0/1[상대/절대] 오브젝트명 변수명 값 발동오브젝트
function setObjectVariable(type, objectName, variableName, value, object) {
//    console.log("setObjectVariable - for " + objectName);
    //value = toNumber(value);
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
//            console.log(nowRoom.having_objects[i].name + " is " + objectName + "'s child");
//            console.log(nowRoom.having_objects[i]);
            setVariable(type, variableName, value, nowRoom.having_objects[i]);//걔 변수 값 바꾸기

//            console.log( nowRoom.having_objects[i].name + "'s " + variableName+" = " + nowRoom.having_objects[i].variableMap[variableName]);
        }
    }

}
