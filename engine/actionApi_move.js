
//중력 (+Y 방향 가속도) 설정 액션
//상대/절대 (0/1), 중력가속도, 오브젝트
function setGravity(type, gravity,object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    gravity = Number(gravity);

    //상대
    if (type == 0) {
        object.yaccel += gravity;
    }
    else if (type == 1) {
        object.yaccel = gravity;
    }

}


//속도 설정 액션
//상대/절대 (0/1), x속도, y속도, 오브젝트
function setSpeed(type, xSpeed,ySpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    xSpeed = Number(xSpeed);
    ySpeed = Number(ySpeed);

    //상대
    if (type == 0) {
        object.xspeed += xSpeed;
        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        object.xspeed = xSpeed;
        object.yspeed = ySpeed;
    }

}

//x속도 설정 액션
//상대/절대 (0/1), x속도,  오브젝트
function setXSpeed(type, xSpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    xSpeed = Number(xSpeed);
    //    ySpeed = Number(ySpeed);

    //상대
    if (type == 0) {
        object.xspeed += xSpeed;
        //        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        object.xspeed = xSpeed;
        //        object.yspeed = ySpeed;
    }

}
//y속도 설정 액션
//상대/절대 (0/1), y속도, 오브젝트
function setYSpeed(type, ySpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    //    xSpeed = Number(xSpeed);
    ySpeed = Number(ySpeed);

    //상대
    if (type == 0) {
        //        object.xspeed += xSpeed;
        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        //        object.xspeed = xSpeed;
        object.yspeed = ySpeed;
    }

}

//가속도 설정 액션
//상대/절대 (0/1), x가속도, y가속도, 오브젝트
function setAccel(type, xAccel, yAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    xAccel = Number(xAccel);
    yAccel = Number(yAccel);

    //상대
    if (type == 0) {
        object.xaccel += xAccel;
        object.yaccel += yAccel;
    }
    else if (type == 1) {
        object.xaccel = xAccel;
        object.yaccel = yAccel;
    }

}
//x가속도 설정 액션
//상대/절대 (0/1), x가속도, 오브젝트
function setXAccel(type, xAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    xAccel = Number(xAccel);

    //상대
    if (type == 0) {
        object.xaccel += xAccel;
    }
    else if (type == 1) {
        object.xaccel = xAccel;
    }

}
//y가속도 설정 액션
//상대/절대 (0/1), y가속도, 오브젝트
function setYAccel(type,  yAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //숫자화
    type = Number(type);
    yAccel = Number(yAccel);

    //상대
    if (type == 0) {
        object.yaccel += yAccel;
    }
    else if (type == 1) {
        object.yaccel = yAccel;
    }

}


//오브젝트 좌표 이동
//상대/절대 (0/1), x좌표, y좌표, 오브젝트
function moveObject(type, x, y,target) {
//    console.log("action " + y + " do");
//    console.log("moveobject for " + target.name);
//    console.log("type = " + type + " x = " + x + " y = " + y);
    
    //숫자화
    type = Number(type);
    x = toNumber(x);
    y = toNumber(y);
//    console.log("x = " + x  + " y= " +y);

    var old_x = target.x, old_y = target.y;

    var result = solidCollisionChecker(target);
    //움직이기 전에 실패는 아예 겹쳐서 나타난 것. safe
    //근데 성공이었다가 실패로 바뀌면 안되지. 충돌한건데!

    //상대
    if (type == 0) {
        target.x += x;
        target.y += y;
    }
    else if (type == 1) {
        target.x = x;
        target.y = y;
    }

    if (result == true) {
        var result = solidCollisionChecker(target);
        if (result == false) {//움직이긴 전에 괜찮았는데 움직이고 충돌, 즉 이 움직임에 문제있음
            moveForSolid(target,old_x,old_y,x,y,type);
        }
    }


}

//좌표를 향해 이동하도록 설정

function goToObject(type, x, y, speed, object) {
//    console.log("goToObject " + object.name);
//    console.log("xy = " + x + ", " + y);
    type = Number(type);
    x = toNumber(x);
    y = toNumber(y);
    speed = toNumber(speed);

    object.destinationFlag = true;
    if (type == 0) {//상대
        object.destX = object.x + x;
        object.destY = object.y + y;
        object.destSpeed = speed;
    }
    else {//절대
        object.destX = x;
        object.destY = y;
        object.destSpeed = speed;
    }
//    console.log("dest = " + object.destX + " , " + object.destY);
//    console.log(object);

}

//오브젝트에 있는 무브 옵션을 지운다.
//오브젝트
function cleargoToObject(object) {
    delete object.destinationFlag;
    delete object.destX;
    delete object.destY;
    delete object.speed;
}


//타 오브젝트의 속도를 조절한다.
//0/1[상대/절대] 오브젝트명 x속도 y속도 발동오브젝트
function setObjectSpeed(type, objectName, xspeed, yspeed, object) {
//    console.log("setObjectSpeed - for " + objectName);
    xspeed = toNumber(xspeed);
    yspeed = toNumber(yspeed);

    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
           setSpeed(type, xspeed, yspeed, nowRoom.having_objects[i]);    //이렇게도 가능
        }
    }

}

//타 오브젝트의 가속도를 조절한다.
//0/1[상대/절대] 오브젝트명 x가속도 y가속도 발동오브젝트
function setObjectAccel(type, objectName, xaccel, yaccel, object) {
//    console.log("setObjectAccel - for " + objectName);
    xaccel = toNumber(xaccel);
    yaccel = toNumber(yaccel);

    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
            setAccel(type, xaccel, yaccel, nowRoom.having_objects[i]);    //이렇게도 가능
        }
    }

}

//타 오브젝트의 일정 거리 주위로 이동한다.
//x거리, y거리, 대상오브젝트명, 발동오브젝트
function moveObjectAround(x, y, objectName, object) {
    x = toNumber(x);
    y = toNumber(y);
    var target;
//    console.log("movearound for " + object.name + " - " + x + ", " + y + " for " + objectName);
//    console.log("gap = " + (p1.y - f1.y));
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
            target = nowRoom.having_objects[i];
//            console.log(object.x + ", " + object.y + " -> " + (target.x + x) + " , " + (target.y + y));
            object.x = target.x + x;
            object.y = target.y + y;
            break;
            
        }
    }

}