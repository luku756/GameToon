

//������Ʈ ���� �׼�
//������ ������Ʈ��, x, y, x�ӵ�, y�ӵ�, x���ӵ�, y���ӵ�, ���� ��ü ������Ʈ
function createObject(targetObjectName, x, y, xspeed, yspeed, xaccel, yaccel, object) {
    //console.log("action createObject for " + object.name);
    //console.log("target : " + targetObjectName + " x,y = " + x + " " + y + " x,y speed = " + xspeed + " " + yspeed + " x,y accel = " + xaccel + " " + yaccel);

   // console.log("tonum " + toNumber(x));


    //�̰� �⺻���� �� ��Ʈ���̳� ���� �������;
    x = toNumber(x);
    y = toNumber(y);
    xspeed = toNumber(xspeed);
    yspeed = toNumber(yspeed);
    xaccel = toNumber(xaccel);
    yaccel = toNumber(yaccel);

    var createdObject = create_object(objectResource[targetObjectName], x, y, xspeed, yspeed, xaccel, yaccel);

}

//������Ʈ ���� �׼� - �����ǥ
//������ ������Ʈ��, x, y, x�ӵ�, y�ӵ�, x���ӵ�, y���ӵ�, ���� ��ü ������Ʈ
function createObject_around(targetObjectName, x, y, xspeed, yspeed, xaccel, yaccel, object) {
//    console.log("action createObject for " + object.name);
//    console.log("target : " + targetObjectName + " x,y = " + x + " " + y + " x,y speed = " + xspeed + " " + yspeed + " x,y accel = " + xaccel + " " + yaccel);

    // console.log("tonum " + toNumber(x));

    //�̰� �⺻���� �� ��Ʈ���̳� ���� �������;
    x = toNumber(x);
    y = toNumber(y);
    xspeed = toNumber(xspeed);
    yspeed = toNumber(yspeed);
    xaccel = toNumber(xaccel);
    yaccel = toNumber(yaccel);

    x += object.x;
    y += object.y;

    var createdObject = create_object(objectResource[targetObjectName], x, y, xspeed, yspeed, xaccel, yaccel);

}

//������Ʈ �Ҹ� �׼�. ������Ʈ �Ҹ�� �̺�Ʈ�� �߻��ؾ� �Ѵ�
//�Ҹ��ϴ� ������Ʈ
function deleteInstance_self(object) {
    removeObjects(object);
}


//������Ʈ ���� �׼�. ������Ʈ �Ҹ�� �̺�Ʈ�� �߻��ؾ� �Ѵ�
//������Ʈ��, ���
function removeObject(objectName, object) {
    var dels = new Array();
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
            dels.push(nowRoom.having_objects[i]);
        }
    }
    for (var i = 0; i < dels.length; i++) {
        removeObjects(dels[i]);
    }
}


//�� ������Ʈ�� �ٸ� ������Ʈ�� �����Ѵ�.
//�� ������Ʈ��, �ߵ�������Ʈ
function changeObject(objectName, object) {

//    console.log("change obj - " + objectName);
//    console.log(object);

    var newobj;

    newobj = create_object(objectResource[objectName], object.x, object.y, object.xspeed, object.yspeed, object.xaccel, object.yaccel);
    newobj.variableMap = object.variableMap;
    newobj.scaleX = object.scaleX;
    newobj.scaleY = object.scaleY;

    //���ִ°� ����� ���� �� �� ��ġ��
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (nowRoom.having_objects[i] == newobj) {
            nowRoom.having_objects.splice(i, 1);
        }
    }

    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (nowRoom.having_objects[i] == object) {
            removeObjects(object);
            nowRoom.having_objects.splice(i, 0,newobj);
            event_create(newobj);
            break;
        }

    }


}


////������Ʈ�� �ָ��� �Ӽ��� �����Ѵ�.
////������ �ɼ�, ������Ʈ
//function setSolidOption(option, object) {

//    if (option == 'true')
//        object.solid = true;
//    else
//        object.solid = false;

//}

function changeAnotherObject(objectName, targetName, object) {
//    console.log("changeAnotherObject - " + objectName + " -> " + targetName + " for " + object.name);
//    console.log(nowRoom.having_objects);
//    console.log("len = " + nowRoom.having_objects.length);
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
//        console.log(i + " -> " + nowRoom.having_objects[i].name);
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
//            console.log(nowRoom.having_objects[i]);
//            console.log("change!");
            changeObject(targetName, nowRoom.having_objects[i]);
            //            console.log(nowRoom.having_objects[i].name + " is " + objectName + "'s child");
            //            console.log(nowRoom.having_objects[i]);
//            setVariable(type, variableName, value, nowRoom.having_objects[i]); //�� ���� �� �ٲٱ�

            //            console.log( nowRoom.having_objects[i].name + "'s " + variableName+" = " + nowRoom.having_objects[i].variableMap[variableName]);
        }
    }
}