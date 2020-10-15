

//오브젝트 생성 액션
//생성할 오브젝트명, x, y, x속도, y속도, x가속도, y가속도, 실행 주체 오브젝트
function createObject(targetObjectName, x, y, xspeed, yspeed, xaccel, yaccel, object) {
    //console.log("action createObject for " + object.name);
    //console.log("target : " + targetObjectName + " x,y = " + x + " " + y + " x,y speed = " + xspeed + " " + yspeed + " x,y accel = " + xaccel + " " + yaccel);

   // console.log("tonum " + toNumber(x));


    //이거 기본값이 다 스트링이네 ㅁㅊ 개고생함;
    x = toNumber(x);
    y = toNumber(y);
    xspeed = toNumber(xspeed);
    yspeed = toNumber(yspeed);
    xaccel = toNumber(xaccel);
    yaccel = toNumber(yaccel);

    var createdObject = create_object(objectResource[targetObjectName], x, y, xspeed, yspeed, xaccel, yaccel);

}

//오브젝트 생성 액션 - 상대좌표
//생성할 오브젝트명, x, y, x속도, y속도, x가속도, y가속도, 실행 주체 오브젝트
function createObject_around(targetObjectName, x, y, xspeed, yspeed, xaccel, yaccel, object) {
//    console.log("action createObject for " + object.name);
//    console.log("target : " + targetObjectName + " x,y = " + x + " " + y + " x,y speed = " + xspeed + " " + yspeed + " x,y accel = " + xaccel + " " + yaccel);

    // console.log("tonum " + toNumber(x));

    //이거 기본값이 다 스트링이네 ㅁㅊ 개고생함;
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

//오브젝트 소멸 액션. 오브젝트 소멸시 이벤트도 발생해야 한다
//소명하는 오브젝트
function deleteInstance_self(object) {
    removeObjects(object);
}


//오브젝트 삭제 액션. 오브젝트 소멸시 이벤트도 발생해야 한다
//오브젝트명, 대상
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


//이 오브젝트를 다른 오브젝트로 변경한다.
//새 오브젝트명, 발동오브젝트
function changeObject(objectName, object) {

//    console.log("change obj - " + objectName);
//    console.log(object);

    var newobj;

    newobj = create_object(objectResource[objectName], object.x, object.y, object.xspeed, object.yspeed, object.xaccel, object.yaccel);
    newobj.variableMap = object.variableMap;
    newobj.scaleX = object.scaleX;
    newobj.scaleY = object.scaleY;

    //들어가있는거 지우고 순서 전 꺼 위치로
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


////오브젝트의 솔리드 속성을 변경한다.
////변경할 옵션, 오브젝트
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
//            setVariable(type, variableName, value, nowRoom.having_objects[i]); //걔 변수 값 바꾸기

            //            console.log( nowRoom.having_objects[i].name + "'s " + variableName+" = " + nowRoom.having_objects[i].variableMap[variableName]);
        }
    }
}