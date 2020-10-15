
var nullsprite = null;
//������Ʈ �����ϱ�.
//������Ʈ ����, x��ǥ, y��ǥ
function create_object(objectShape, x, y, xspeed, yspeed, xaccel, yaccel) {
//    console.log(objectShape);
    //console.log("***object - create! now creating " + objectShape.name);
//                console.log("obj shape");
    //                console.log(objectShape);
//    console.log(objectShape);
    var object;
    if (objectShape.spriteflag == false) {//��������Ʈ�� ���� ������Ʈ
        if (nullsprite == null) {//ó���� ���
            nullsprite = createSpriteData("nullimage.png",1,1,0,0,1);
        }
        object = createSprite(nullsprite, 1, 1, x, y);//�ν�������Ʈ�� ���δ�
    }
    //TODO
    else {//��������Ʈ ����
        //console.log("name = " + objectShape.sprite.images);
        //console.log(objectShape.sprite.spriteData);
        object = createSprite( objectShape.sprite.spriteData,1,1,x,y);
        //object = drawImage_preload(image, 1, 1, x, y);
    }

    //z-order �� ���� stage.children���� ��������Ʈ ��ġ ������ �ؾ��� ��


    //������Ʈ �Ӽ� ����
    for (var status in objectShape) {
        if (status != "action_parameter_list" && status != "event_action_list" && status != "event_list") {
            object[status] = objectShape[status];
        }
    }
    //������Ʈ ��ǥ ���� (��ǥ�� �ڿ� �־�� ����� �νĵȴ�. ��������ϱ�)
    object.x = x;
    object.y = y;

    //�ӵ�, ���ӵ��� ���� ���� �ִ´�
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

//������Ʈ�� �̺�Ʈ-�׼��� ���� ������ ���� ���δ�. ������Ʈ ���������� �Ϻ�
//������Ʈ
function addEventToObject(object) {

    var shape = objectResource[object.name]; //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����
    var eventname;
    for (var i = 0; i < shape.event_list.length; i++) {
        eventname = shape.event_list[i];
        
        if (eventname == "always") {//'������' �̺�Ʈ�� tick Ÿ�� �����ʸ� ���δ�
            stepEventBox.push(object);
            //object.addEventListener("tick", event_always);
        }
        else if (eventname == "object_creates") {//'������' �̺�Ʈ�� �����ϴ� �������� �ٷ� ������ �ش�
            event_create(object);
        }
        else if (eventname.substring(0, 5) == "timer") {    //timer �̺�Ʈ. �̺�Ʈ �迭�� ����� �� �ش�.
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
        else if (eventname.substring(0, 9) == "key_press") {    //keypress �̺�Ʈ. �̺�Ʈ �迭�� ����� �� �ش�.
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
        else if (eventname.substring(0, 8) == "key_down") {    //keydown �̺�Ʈ. �̺�Ʈ �迭�� ����� �� �ش�.
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
        else if (eventname.substring(0, 6) == "key_up") {    //keyup �̺�Ʈ. �̺�Ʈ �迭�� ����� �� �ش�.
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
        //���콺 �Է� 5���� �̺�Ʈ ����
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
        else if (eventname.substring(0,9) == "collision") { //�浹 �̺�Ʈ
            //console.log("event " + eventname + " for " + object.name);

            if (object.collision == null) {//�浹��� �迭�� ������ ���� ����
                var newarray = new Array();
                object.collision = newarray;
            }
            object.collision.push(eventname.substring(10));
        }
        //draw �̺�Ʈ
        else if(eventname == "drawTime"){
            event_drawTime(object);//draw �̺�Ʈ�� �� �� �ߵ��ϰ� �Ǿ� �ִ�.
        }
        else if (eventname == "object_destroy") {
        //���⼭ ���� �ʰ� ������Ʈ �Ҹ�ÿ� ó���Ѵ�
        }
        else {
            console.log("non setting event - " + eventname);
        }
    }
}

//������Ʈ �����ϱ�
//������ ������Ʈ
function removeObjects(target) {
//    console.log("remove object - number " + target.id + " : " + target.name);

//    if (target.name == "slime1") {
//        console.log("king's die");
    //    }
    var named = target.name;

    if (target.destroyed != true) {//���ѷ��� ����
        //object_destroy �̺�Ʈ�� ���� �� �� �̺�Ʈ�� ���� �߻���Ų��.
        var shape = objectResource[target.name]
//        console.log(target);
        index = shape.event_list.indexOf("object_destroy");
        if (index >= 0) {//������ ���� ���� ó��
            target.destroyed = true;
            event_destroy(target);
        }
    }
    if (target.trak == true) {
        trakingTarget = null;
    }

    var index = nowRoom.having_objects.indexOf(target); //�ش� ������Ʈ�� ������Ʈ�迭���� ���� ���� �˻�
//    console.log("target = " + nowRoom.having_objects.indexOf(target));

    if (index >= 0) {//������ ���� ���� ó��
        nowRoom.having_objects.splice(index, 1);
    }


    var index = stepEventBox.indexOf(target); //���� �̺�Ʈ���� �����ϱ�

    if (index >= 0) {//������ ���� ���� ó��
        stepEventBox.splice(index, 1);
    }

    //draw ������Ʈ Ŭ����. �� ������ ������ ���� ���� �����
    if (target.draws != null) {
        var length = target.draws.length;
        for (var i = 0; i < target.draws.length; i++) {
            stage.removeChild(target.draws[i]);
        }
        target.draws = [];
    }
    //draw - ���� ������Ʈ Ŭ����. �� ������ ������ ���� ���� �����
    if (target.drawvariables != null) {
        var length = target.drawvariables.length;
        for (var i = 0; i < target.drawvariables.length; i++) {
            stage.removeChild(target.drawvariables[i][0]);
        }
        target.drawvariables = [];
    }
    //draw - �������� ������Ʈ Ŭ����. �� ������ ������ ���� ���� �����
    if (target.drawglobals != null) {
        var length = target.drawglobals.length;
        for (var i = 0; i < target.drawglobals.length; i++) {
            stage.removeChild(target.drawglobals[i][0]);
        }
        target.drawglobals = [];
    }

    //timerHaverMap ���� �ش� ������ ���� ����
    for (var name in timerHaverMap) {
        index = timerHaverMap[name].indexOf(target);
        if (index >= 0) {//������ ���� ���� ó��
            timerHaverMap[name].splice(index, 1);
        }
    }

    //keypressMap ���� �ش� ������ ���� ����
    for (var name in keypressMap) {
        index = keypressMap[name].indexOf(target);
        if (index >= 0) {//������ ���� ���� ó��
            keypressMap[name].splice(index, 1);
        }
    }

    //keydownMap ���� �ش� ������ ���� ����
    for (var name in keydownMap) {
        index = keydownMap[name].indexOf(target);
        if (index >= 0) {//������ ���� ���� ó��
            keydownMap[name].splice(index, 1);
        }
    }

    //keyupMap ���� �ش� ������ ���� ����
    for (var name in keyupMap) {
        index = keyupMap[name].indexOf(target);
        if (index >= 0) {//������ ���� ���� ó��
            keyupMap[name].splice(index, 1);
        }
    }

//    console.log("target = " + target.id);
    stage.removeChild(target);          //ȭ�鿡�� ����
    target.removeAllEventListeners();   //������(�̺�Ʈ) ����
//    delete target;
//    console.log("target = " + nowRoom.having_objects.indexOf(target));
//    console.log(named + " removed");

}

//������Ʈ�� ���ϴ� ����� �´����� Ȯ���� �ش�. �θ���� �����Ѵ�.
//���ϴ� ������Ʈ��, Ȯ���� ��� ������Ʈ
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