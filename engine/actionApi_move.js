
//�߷� (+Y ���� ���ӵ�) ���� �׼�
//���/���� (0/1), �߷°��ӵ�, ������Ʈ
function setGravity(type, gravity,object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    gravity = Number(gravity);

    //���
    if (type == 0) {
        object.yaccel += gravity;
    }
    else if (type == 1) {
        object.yaccel = gravity;
    }

}


//�ӵ� ���� �׼�
//���/���� (0/1), x�ӵ�, y�ӵ�, ������Ʈ
function setSpeed(type, xSpeed,ySpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    xSpeed = Number(xSpeed);
    ySpeed = Number(ySpeed);

    //���
    if (type == 0) {
        object.xspeed += xSpeed;
        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        object.xspeed = xSpeed;
        object.yspeed = ySpeed;
    }

}

//x�ӵ� ���� �׼�
//���/���� (0/1), x�ӵ�,  ������Ʈ
function setXSpeed(type, xSpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    xSpeed = Number(xSpeed);
    //    ySpeed = Number(ySpeed);

    //���
    if (type == 0) {
        object.xspeed += xSpeed;
        //        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        object.xspeed = xSpeed;
        //        object.yspeed = ySpeed;
    }

}
//y�ӵ� ���� �׼�
//���/���� (0/1), y�ӵ�, ������Ʈ
function setYSpeed(type, ySpeed, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    //    xSpeed = Number(xSpeed);
    ySpeed = Number(ySpeed);

    //���
    if (type == 0) {
        //        object.xspeed += xSpeed;
        object.yspeed += ySpeed;
    }
    else if (type == 1) {
        //        object.xspeed = xSpeed;
        object.yspeed = ySpeed;
    }

}

//���ӵ� ���� �׼�
//���/���� (0/1), x���ӵ�, y���ӵ�, ������Ʈ
function setAccel(type, xAccel, yAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    xAccel = Number(xAccel);
    yAccel = Number(yAccel);

    //���
    if (type == 0) {
        object.xaccel += xAccel;
        object.yaccel += yAccel;
    }
    else if (type == 1) {
        object.xaccel = xAccel;
        object.yaccel = yAccel;
    }

}
//x���ӵ� ���� �׼�
//���/���� (0/1), x���ӵ�, ������Ʈ
function setXAccel(type, xAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    xAccel = Number(xAccel);

    //���
    if (type == 0) {
        object.xaccel += xAccel;
    }
    else if (type == 1) {
        object.xaccel = xAccel;
    }

}
//y���ӵ� ���� �׼�
//���/���� (0/1), y���ӵ�, ������Ʈ
function setYAccel(type,  yAccel, object) {

    //console.log("action setGravity for " + object.name);
    //console.log("type = " + type + " gravity = " + gravity);

    //����ȭ
    type = Number(type);
    yAccel = Number(yAccel);

    //���
    if (type == 0) {
        object.yaccel += yAccel;
    }
    else if (type == 1) {
        object.yaccel = yAccel;
    }

}


//������Ʈ ��ǥ �̵�
//���/���� (0/1), x��ǥ, y��ǥ, ������Ʈ
function moveObject(type, x, y,target) {
//    console.log("action " + y + " do");
//    console.log("moveobject for " + target.name);
//    console.log("type = " + type + " x = " + x + " y = " + y);
    
    //����ȭ
    type = Number(type);
    x = toNumber(x);
    y = toNumber(y);
//    console.log("x = " + x  + " y= " +y);

    var old_x = target.x, old_y = target.y;

    var result = solidCollisionChecker(target);
    //�����̱� ���� ���д� �ƿ� ���ļ� ��Ÿ�� ��. safe
    //�ٵ� �����̾��ٰ� ���з� �ٲ�� �ȵ���. �浹�Ѱǵ�!

    //���
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
        if (result == false) {//�����̱� ���� �����Ҵµ� �����̰� �浹, �� �� �����ӿ� ��������
            moveForSolid(target,old_x,old_y,x,y,type);
        }
    }


}

//��ǥ�� ���� �̵��ϵ��� ����

function goToObject(type, x, y, speed, object) {
//    console.log("goToObject " + object.name);
//    console.log("xy = " + x + ", " + y);
    type = Number(type);
    x = toNumber(x);
    y = toNumber(y);
    speed = toNumber(speed);

    object.destinationFlag = true;
    if (type == 0) {//���
        object.destX = object.x + x;
        object.destY = object.y + y;
        object.destSpeed = speed;
    }
    else {//����
        object.destX = x;
        object.destY = y;
        object.destSpeed = speed;
    }
//    console.log("dest = " + object.destX + " , " + object.destY);
//    console.log(object);

}

//������Ʈ�� �ִ� ���� �ɼ��� �����.
//������Ʈ
function cleargoToObject(object) {
    delete object.destinationFlag;
    delete object.destX;
    delete object.destY;
    delete object.speed;
}


//Ÿ ������Ʈ�� �ӵ��� �����Ѵ�.
//0/1[���/����] ������Ʈ�� x�ӵ� y�ӵ� �ߵ�������Ʈ
function setObjectSpeed(type, objectName, xspeed, yspeed, object) {
//    console.log("setObjectSpeed - for " + objectName);
    xspeed = toNumber(xspeed);
    yspeed = toNumber(yspeed);

    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
           setSpeed(type, xspeed, yspeed, nowRoom.having_objects[i]);    //�̷��Ե� ����
        }
    }

}

//Ÿ ������Ʈ�� ���ӵ��� �����Ѵ�.
//0/1[���/����] ������Ʈ�� x���ӵ� y���ӵ� �ߵ�������Ʈ
function setObjectAccel(type, objectName, xaccel, yaccel, object) {
//    console.log("setObjectAccel - for " + objectName);
    xaccel = toNumber(xaccel);
    yaccel = toNumber(yaccel);

    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        if (check_targetObject(objectName, nowRoom.having_objects[i]) == true) {
            setAccel(type, xaccel, yaccel, nowRoom.having_objects[i]);    //�̷��Ե� ����
        }
    }

}

//Ÿ ������Ʈ�� ���� �Ÿ� ������ �̵��Ѵ�.
//x�Ÿ�, y�Ÿ�, ��������Ʈ��, �ߵ�������Ʈ
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