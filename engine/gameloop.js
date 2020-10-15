//�̰� false�̸� ���ӷ����� ���� �ʴ´�.
var load_complete = false;

//���� �� ������ �����͵��� �ε��Ѵ�.
function loadcomplete() {
    console.log("load complete");
    // handleComplete();

    stage.removeAllChildren();
//    console.log("size = " + (size)/20);

    //�̹��� �ε尡 �Ϸ�� �Ŀ� ���� �ҷ��� �׸����� �Ѵ�
    load_Room(roomResource[roomOrder[0]]);
    //for_test();
    load_complete = true;
}
function loadfail(event) {
    console.log("fail - " + event.item.id);

}
var size = 20;
var loadcount = 0;
//���� �� ������ �����͵��� �ϳ� �ε��Ѵ�.
function loadfile(event) {
//    console.log("load file - " + event.item.id + " num = " + (size/20));
    loadcount++;
    stage.children[0].text = "now loading... " + loadcount + "/" + (size)/20;
//    var loadtext = new createjs.Text("", "bold " + 20 + "px monospace", "#000");
//    loadtext.x = 100;
//    loadtext.y = 120 + size;
//    size += 20;
//    loadtext.text = "load " + event.item.id;
//    stage.addChildAt(loadtext, 1);

//    console.log(event.item.id);
    // handleComplete();

//    stage.removeChildAt(0);

//    //�̹��� �ε尡 �Ϸ�� �Ŀ� ���� �ҷ��� �׸����� �Ѵ�
//    load_Room(roomResource[roomOrder[0]]);
//    //for_test();
    //    load_complete = true;
    if (loaingtextMap[event.item.id] != null) {
        loaingtextMap[event.item.id].text += " complete";
    }

}


//���� ��������Ʈ�� ��׶����� �̹������� �о���δ�. 
//�о���� �̹����� �����ε带 �̿��� imageLoader �� ����
function load_images() {
    //var image;

    imageLoader.loadFile("nullimage.png");//�⺻�̹���
    //��������Ʈ �б�
    var sp;
    for (var spname in spriteResource) {
        sp = spriteResource[spname];

        var loadtext = new createjs.Text("", "bold " + 20 + "px monospace", "#000");
        loadtext.x = 100;
        loadtext.y = 120 + size;
        size += 20;
        loadtext.text = "load " + sp.images;
        loaingtextMap[sp.images] = loadtext;
        stage.addChildAt(loadtext, 1);

        imageLoader.loadFile(sp.images);
    }

    //��׶��� �б�
    var bg;
    for (var bgname in backgroundResource) {
        bg = backgroundResource[bgname];

        var loadtext = new createjs.Text("", "bold " + 20 + "px monospace", "#000");
        loadtext.x = 100;
        loadtext.y = 120 + size;
        size += 20;
        loadtext.text = "load " + bg.image;
        loaingtextMap[bg.image] = loadtext;
        stage.addChildAt(loadtext, 1);

        imageLoader.loadFile(bg.image);
    }

}

//���� ���ϵ��� �̸� �о���δ�.
//���嵵 �̹����� ���� imageLoader �� ����
function load_sound() {

    imageLoader.installPlugin(createjs.Sound); 
    createjs.Sound.alternateExtensions = ["mp3"]; // add other extensions to try loading if the src file extension is not supported
           
    var so;
    for (var soname in soundResource) {
        so = soundResource[soname];
        //console.log("audio/"+so.sound);

        var loadtext = new createjs.Text("", "bold " + 20 + "px monospace", "#000");
        loadtext.x = 100;
        loadtext.y = 120 + size;
        size += 20;
        loadtext.text = "load " + so.sound;
        loaingtextMap[so.sound] = loadtext;
        stage.addChildAt(loadtext, 1);

        imageLoader.loadFile({id:so.sound,src:"audio/"+so.sound});
    }
}

//�� ƽ���� ����Ǵ� ���� ����. ������ ó���ؾ� �ϴ� �͵��� ó���Ѵ�.
function tick(event) {

    if (load_complete == true) {
        //��������
        physics();
        //���� �̺�Ʈ ó���ϱ�
        update_stepEvent();
        //Ÿ�̸�
        timerCounter();
        //�浹ó��
        collisionChecker();
        //���� �׸��� ������Ʈ
        update_drawVariables();
        //Ű ������ �̺�Ʈ�� �Ź� ������Ʈ
        keypress_update();
        //���� �̵�
        destinationMoveUpdate();
        //���� �� Ȱ��ȭ�� �̵�
        if (viewTrakingFlag == true) {
            trakingView();
        }
    }
    stage.update(event);
}

function update_stepEvent() {
    var doings = new Array();

    for (var i = 0; i < stepEventBox.length; i++) {
        doings[i] = stepEventBox[i];
    }

    for (var i = 0; i < doings.length; i++) {
        event_step(doings[i]);
    }

}

var viewTrakingFlag = false;
var trakingTarget = null;

function trakingView() {
    var target = nowRoom.viewtarget;
    var targetobject;

    if (trakingTarget == null) {
//        console.log("first");
//        console.log(nowRoom.having_objects[0].parentflag);
        //������ ������Ʈ �˻�
        for (var i = 0; i < nowRoom.having_objects.length; i++) {
            var obj = nowRoom.having_objects[i];
//            console.log("i = " + i);
            if (check_targetObject(target,obj) == true) {
                targetobject = obj;
                trakingTarget = targetobject;
                obj.trak = true;
//                console.log("traking target = " + trakingTarget.name);
                break;
            }
        }
    }
    else {
        targetobject = trakingTarget;
    }
    if (targetobject == null) {//Ÿ���� ������
        return;
    }

    var x, y;
    x = targetobject.x - (nowRoom.viewwidth / 2);
    y = targetobject.y - (nowRoom.viewheight / 2);
    if (x < 0)
        x = 0;
    if (x + nowRoom.viewwidth > nowRoom.width)
        x = nowRoom.width - nowRoom.viewwidth ;
    if (y < 0)
        y = 0;
    if (y + nowRoom.viewheight > nowRoom.height)
        y = nowRoom.height - nowRoom.viewheight;

    moveView_fix(x,y);

}


function destinationMoveUpdate() {
    var obj;
    for (var t = 0; t < nowRoom.having_objects.length; t++) {
        if (nowRoom.having_objects[t].destinationFlag == true) {
            obj = nowRoom.having_objects[t];
//            console.log(nowRoom.having_objects[t].name + " has dest xy = " + obj.destX + " , " + obj.destY + " xy = " + obj.x + " , " + obj.y);

            var old_x = obj.x, old_y = obj.y,x,y;
            var result = solidCollisionChecker(obj);

            if (obj.x > obj.destX) {//�������� ������ ��
                if (obj.x - obj.destSpeed > obj.destX) {//������ �� ��
                    obj.x -= obj.destSpeed;
                    x = -obj.destSpeed;
                }
                else {//�ٿ��� ��
                    obj.x = obj.destX;
                    x = 0;
                }
            }
            else if (obj.x < obj.destX) {
                if (obj.x + obj.destSpeed < obj.destX) {//������ �� ��
                    obj.x += obj.destSpeed;
                    x = obj.destSpeed;
                }
                else {//�ٿ��� ��
                    obj.x = obj.destX;
                    x = 0;
                }
            }

            if (obj.y > obj.destY) {//�������� ������ ��
                if (obj.y - obj.destSpeed > obj.destY) {//������ �� ��
                    obj.y -= obj.destSpeed;
                    y = -obj.destSpeed;
                }
                else {//�ٿ��� ��
                    obj.y = obj.destY;
                    y = 0;
                }
            }
            else if (obj.y < obj.destY) {
                if (obj.y + obj.destSpeed < obj.destY) {//������ �� ��
                    obj.y += obj.destSpeed;
                    y = obj.destSpeed;
                }
                else {//�ٿ��� ��
                    obj.y = obj.destY;
                    y = 0;
                }
            }

            //�ָ��� �浹ó��
            if (result == true) {
                var result = solidCollisionChecker(obj);
                if (result == false) {//�����̱� ���� �����Ҵµ� �����̰� �浹, �� �� �����ӿ� ��������
                    moveForSolid(obj, old_x, old_y, x, y, 0);
                }
            }

            if (obj.x == obj.destX && obj.y == obj.destY) {//����
//                console.log("dest fin!");
                delete obj.destinationFlag;
                delete obj.destX;
                delete obj.destY;
                delete obj.speed;
            }
        }
    }

}


//Ű������ �̺�Ʈ ������Ʈ
function keypress_update() {
    for (var keycode in keypressChecker) {//üĿ�� �ִ� �͵��� ���� ������ ������ ��
        keypressListener(keycode);
    }

}

//������ �������� �׸��� ������Ʈ
function update_drawVariables() {

    for (var t = 0; t < nowRoom.having_objects.length; t++) {
        if (nowRoom.having_objects[t].drawglobals != null) {
            var arr;
            for (var i = 0; i < nowRoom.having_objects[t].drawglobals.length; i++) {
                arr = nowRoom.having_objects[t].drawglobals[i];
                arr[0].text = globalVariableMap[arr[1]];
            }
        }

        if (nowRoom.having_objects[t].drawvariables != null && nowRoom.having_objects[t].variableMap != null) {
            var arr;
            for (var i = 0; i < nowRoom.having_objects[t].drawvariables.length; i++) {
                arr = nowRoom.having_objects[t].drawvariables[i];
                arr[0].text = nowRoom.having_objects[t].variableMap[arr[1]];
            }
        }
    }

}



var timerMap = new Array(); //Ÿ�̸Ӱ� ���õ� ������Ʈ���� �����ϴ� ��. �ð�-������Ʈ �迭 �� ���ϰ� �ִ�.

//�� ƽ���� ����Ǵ� Ÿ�̸� ī����. �� �ȿ��� Ÿ�̸� �̺�Ʈ�� ����ȴ�
var timeCount = 0;  //�ð� ��� ����, �ð�
function timerCounter() {
    timeCount++;
//    console.log("time = " + timeCount);
//    console.log(timerMap);
    if (timeCount > 1000000000) {
        timeCount %= 1000000000;
    }
    var eventtime;
    if (timerMap[timeCount.toString()] != null) {//�� �ð��� Ÿ�̸Ӱ� �ִٸ�?
        var time = timeCount.toString();
//        console.log(timerMap);
        for (timeNum in timerMap[time]) {
            eventtime = timerMap[time][timeNum];
//            console.log("timenum = " + eventtime);
//            console.log(timerHaverMap);
//            console.log(timerHaverMap[eventtime]);
            if (timerHaverMap[eventtime] != null) {
                var length = timerHaverMap[eventtime].length;
                for (var i = length - 1; i >= 0; i--) {   //Ÿ�̸��� �׼��� ������� ��� �迭�� ���̹Ƿ� �������� �ؾ���
                    if (nowRoom.having_objects.indexOf(timerHaverMap[eventtime][i]) >= 0)//�� ������Ʈ�� ���� Ȱ��ȭ��(�����ϴ�) ������Ʈ�� ���� �����Ѵ�.
                        event_timer(timerHaverMap[eventtime][i], eventtime);
                }
            }
            else {
                console.log(time + " �� timer " + eventtime + " ������ �ϼ̴µ� �� Ÿ�̸� ���°� ���׿�");
            }
        }
        delete timerMap[time]; //�� ������ ������
    }

}

//�� ƽ���� ����Ǵ� ���� ����. �ӵ�/���ӵ��� ���� ������Ʈ�� ��ġ�� �����Ѵ�.
function physics() {
    var old_x, old_y;
    //���� �뿡 �����ϴ� ��� ������Ʈ�� ���Ͽ� �����ϵ��� �Ѵ�.
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        old_x = nowRoom.having_objects[i].x;
        old_y = nowRoom.having_objects[i].y;
        var result = solidCollisionChecker(nowRoom.having_objects[i]);
        var obj = nowRoom.having_objects[i];
//        if(obj.name == 'obj_player')
//        console.log(obj.name+" 's xy = " + obj.x + ", " + obj.y + " speed = " + obj.xspeed + ", " + obj.yspeed +  " accel = " + obj.xaccel + ", " + obj.yaccel);

        //�̵�, �ӵ� ����
        nowRoom.having_objects[i].x += nowRoom.having_objects[i].xspeed;
        nowRoom.having_objects[i].y += nowRoom.having_objects[i].yspeed;

        if (result == true) {
            var result = solidCollisionChecker(nowRoom.having_objects[i]);
            if (result == false) {//�����̱� ���� �����Ҵµ� �����̰� �浹, �� �� �����ӿ� ��������
//                console.log("solid crash - " + nowRoom.having_objects[i].name);
                moveForSolid(nowRoom.having_objects[i], old_x, old_y, nowRoom.having_objects[i].xspeed, nowRoom.having_objects[i].yspeed, 0);
            }
        }


        nowRoom.having_objects[i].xspeed += nowRoom.having_objects[i].xaccel;
        nowRoom.having_objects[i].yspeed += nowRoom.having_objects[i].yaccel;

    }

}
