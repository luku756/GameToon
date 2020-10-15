//if �׼� - X�� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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

//if �׼� - Y�� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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
//if �׼� - X�ӵ��� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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

//if �׼� - Y�ӵ��� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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
//if �׼� - X�ӵ��� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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

//if �׼� - Y�ӵ��� üũ �׼�
//������ true, �ƴϸ� false ����
//���ذ�, �� Ÿ��(0/1/2 �̸�/����/�ʰ�)
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

//if �׼� - �� Ȯ�� �� �̸��� ���� ��������� Ȯ��
//���̸�
function check_Room(roomName) {
    if (nowRoom.name == roomName)
        return true;
    else
        return false;

}

//if �׼� - ����. ���� Ȯ�� �̻��̸� ����
//���̸�
function check_Room(percent) {

    var number = Math.random()*100;
    if (percent > Number)
        return true;
    else
        return false;

}

//if �׼� - ������ ȭ��
//������ �� 0/1/2[�̸�/����/�ʰ�])
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

//if �׼� - ���������� ȭ��
//���������� �� 0/1/2[�̸�/����/�ʰ�])
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


//if �׼�- ��ġ Ȯ�� x,y ���� �ȿ� ������Ʈ�� ���� �� true
//x�ּ� x�ִ� y�ּ� y�ִ� ������Ʈ
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

//if �׼�- ��ġ Ȯ�� x ���� �ȿ� ������Ʈ�� ���� �� true
//x�ּ� x�ִ�  ������Ʈ
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

//if �׼�- ��ġ Ȯ�� y ���� �ȿ� ������Ʈ�� ���� �� true
// y�ּ� y�ִ� ������Ʈ
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

//������Ʈ�� �� ������ �������� true
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

//Ư�� ������Ʈ�� �浹�Ͽ����� üũ�Ѵ�.
//��������Ʈ��, �ߵ�������Ʈ
function check_collisionObject(targetName, object) {
    //    console.log("check_collision - target = " + targetName + " for " + object.name);

    var result;
    //    console.log("collison check");
    var collisionObjects = new Array();
    //���� �뿡 �����ϴ� ��� ������Ʈ�� ���Ͽ� �����ϵ��� �Ѵ�.
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

//�� ������Ʈ�� �浹�Ͽ����� üũ�Ѵ�.
//��������Ʈ1�̸�, ��������Ʈ2�̸�
function check_collisionObject(targetName1, targetName2, object) {
//    console.log("check_collisionObject - target1 = " + targetName1 + " target2 = " + targetName2);

    var result;
    //    console.log("collison check");
    var collisionObjects = new Array();
    //���� �뿡 �����ϴ� ��� ������Ʈ�� ���Ͽ� �����ϵ��� �Ѵ�.
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

//�� ���尡 ��������� Ȯ��

function check_Sound(soundName, object) {
//    console.log("checksound - " + soundName);
//    console.log(soundResource[soundName].sound);
//    console.log(soundPlayMap);
    if (soundPlayMap[soundResource[soundName].sound] != null) {
        return true;
    }
    return false;
}