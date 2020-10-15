
//���� ��Ʈ���� ���ڷ� �ٲ۴�. rand(x~x) �������� ���� �� �ִ�.

function toNumber(num) {
    //console.log(num);
    //console.log(num.substring(0, 4));
    var resultNumber;

    if (num.substring(0, 4) == "rand") { //������ ���
        var splits;
        splits = num.substring(5, num.length - 1).split("~");
        //console.log("input = " +num +" min = " +  Number(splits[0]) + " max = " + Number(splits[1]));
        resultNumber = Math.floor(Math.random() * (Number(splits[1]) - Number(splits[0]))) + Number(splits[0]);
    }
    else {//�Ϲ��� ���
        resultNumber = Number(num);
    }
    //console.log(resultNumber);
    return resultNumber;
}



//n ms �� ����� Ÿ�̸� ����
//Ÿ�̸� ��ȣ, �ð� ����, ������Ʈ
function setTimer(timerNumber, delay, object) {
//    console.log("action setTimer for " + object.name + " id : " + object.id);
//    console.log("timerNumber = " + timerNumber + " delay = " + delay);

    //����ȭ
    delay = Number(delay);

    var time = ((delay + timeCount) % 1000000000).toString(); //���� �ð�

    //console.log("###########time = " + time);

    //�� �ð��� Ÿ�̸Ӱ� ���ٸ�
    if (timerMap[time] == null) {
        var timeArray = new Array();
//        if (timeArray[timerNumber] == null) {//�� �ð��� �� ��ȣ�� Ÿ�̸Ӱ� ���ٸ�
//            var timeNumArray = new Array();
//            timeArray[timerNumber] = timeNumArray;
//        }
//        timeArray[timerNumber].push(object)
        timerMap[time] = timeArray;
    }

    index = timerMap[time].indexOf(timerNumber);
    if (index == -1) {//����� �ֱ�
        timerMap[time].push(timerNumber);
    }


}

//��������Ʈ Ȯ��
//x Ȯ�밪, yȮ�밪, ������Ʈ
function sprite_scale(scaleX, scaleY, object) {
    scaleX = toNumber(scaleX);
    scaleY = toNumber(scaleY);
    object.scaleX = scaleX;
    object.scaleY = scaleY;

}
//��������Ʈ ����
//��������Ʈ��, �����ӹ�ȣ, ������Ʈ
function sprite_select(spriteName, frameNum, object) {
//    console.log("��������Ʈ ���� for " + object.name);
//    console.log(spriteName + " �� "  + frameNum);
    frameNum = toNumber(frameNum);
    changeSprite(object,spriteName,1,frameNum,frameNum);

}

//��������Ʈ�� ����Ѵ�.
//��������Ʈ�� ù�����ӹ�ȣ �����������ӹ�ȣ ����ӵ�(�������)
function sprite_run(spriteName, firstFrame, lastFrame, spriteSpeed, object) {
//    console.log("sprite rum for " + object.name + " " + firstFrame + "~" + lastFrame);
    changeSprite(object, spriteName, spriteSpeed, firstFrame, lastFrame);

}



//��������Ʈ ȸ��
//0/1[���/����] ȸ������ �ߵ�������Ʈ
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

//���ӿ���, ���� ���� �̺�Ʈ
function gameOver() {

    //console.log("game over!");
    alert("Game Over!\nif you want retry, press f5");
    load_complete = false;
}

//���� ������ �̵�
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

//���� ������ �̵�
function prevRoom() {
    var nowRoomNumber = nowRoom.number;
    if (nowRoomNumber -1 >= 0) {
        change_Room(roomResource[roomOrder[nowRoomNumber - 1]]);
    }
    else {
        alert("no prev Room!");
    }

}

//Ư�� ������ �̵�
//�̵��� ���̸�
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

//���� ���� ����
//0/1[���/����] ������ ������
function setGlobalVariable(type, variableName, variableValue, object) {
//    console.log("set globalvariable for " + object.name);
//    console.log("name = " + variableName + " value = " + variableValue);
//    if (object.name == "slime3") {
//        console.log("set globalvariable");
//        console.log("name = " + variableName + " value = " + variableValue);

//    }
    variableValue = toNumber(variableValue);
    if (type == 0) {//���
        if (globalVariableMap[variableName] == null)//���� ������ ������ ��
            globalVariableMap[variableName] = variableValue;
        else
            globalVariableMap[variableName] += variableValue;
    }
    else {
        globalVariableMap[variableName] = variableValue;
    }

    //console.log(globalVariableMap[variableName]);
}

//���� ����
//0/1[���/����] ������ ������
function setVariable(type, variableName, variableValue, object) {
    //    console.log("set variable");
    //    console.log("type = " + type + " value = " +variableValue);
    variableValue = toNumber(variableValue);


    //������ �߰�
    if (object.drawvariables == null) {
        var newArray = new Array();
        object.drawvariables = newArray;
    }

    //���� ������ �߰�
    if (object.variableMap == null) {
        var newArray = new Array();
        object.variableMap = newArray;
    }

    if (type == 0) {//���
        if (object.variableMap[variableName] == null)//���� ������ ������ ��
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


//�� �����̱�
//x,y,����,����,������Ʈ
function move_View(x, y, width, height, object) {
    x = toNumber(x);
    y = toNumber(y);
    width = toNumber(width);
    height = toNumber(height);
    
    moveView(x,y,width,height);


}



//Ÿ ������Ʈ�� ������ �����Ѵ�.
//0/1[���/����] ������Ʈ�� ������ �� �ߵ�������Ʈ
function setObjectVariable(type, objectName, variableName, value, object) {
//    console.log("setObjectVariable - for " + objectName);
    //value = toNumber(value);
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
//            console.log(nowRoom.having_objects[i].name + " is " + objectName + "'s child");
//            console.log(nowRoom.having_objects[i]);
            setVariable(type, variableName, value, nowRoom.having_objects[i]);//�� ���� �� �ٲٱ�

//            console.log( nowRoom.having_objects[i].name + "'s " + variableName+" = " + nowRoom.having_objects[i].variableMap[variableName]);
        }
    }

}
