
//�ش� �̺�Ʈ�� �޸� �׼�Api ���� �����ϴ� �Լ�
//�ش� ������Ʈ, �̺�Ʈ��, ������Ʈ ����(�̺�Ʈ-�׼ǿ� ���� ���� ����)
function runActionFunctions(object, eventname, shape) {
//    if (nowRoom.name == "game" && load_complete == false) {
//        return;
//    }
    var result = null;
    var checkFlag = false;
    var paramlist;  //�׼� �Ķ���͸� ���� �迭
//    if (object.name == "slime3") {
//        console.log("slime3''s " + eventname);

    //    }
    //    console.log("evname - " + eventname + " shape = " + shape.name);
    var tabcount = 0;
//    console.log("event - " + eventname);
    for (var i = 0; i < shape.event_action_list[eventname].length; i++) {
//        console.log("line "+(i-3)+"�� - " + shape.event_action_list[eventname][i] + " chkflag = " + checkFlag + " result = " + result);
        if (shape.event_action_list[eventname][i] == '{' && checkFlag == true && result == false) {
            i += Number(shape.action_parameter_list[eventname][i][0]);
            checkFlag = false;
            result = null;
            continue;
        }
        else if (shape.event_action_list[eventname][i] == '{') {
            continue;
        }
        else if (shape.event_action_list[eventname][i] == '}') {
            continue;
        }

        if (checkFlag == true) {//üũ �÷��װ� �� �ִ�. �� �� �׼��� üũ�̴�
            if (result == true) {//�� üũ�� true �� ���� ����
                paramlist = shape.action_parameter_list[eventname][i].slice(0); //�迭 ����
                paramlist.push(object); //���� �߰�
                result = window[shape.event_action_list[eventname][i]].apply(this, paramlist); //�׼� �Լ� ����
            }
            else {//�� üũ�� false����.
                if (shape.event_action_list[eventname][i].substring(0, 5) == "check") {//�ٵ� �̹����� check ���?
                    continue; //������ �����̹Ƿ� ���� ���� �̾�� (��ø if��)
                }
                result = null;
            }
            checkFlag = false;  //üũ �÷��� ����
        }
        else {
            paramlist = shape.action_parameter_list[eventname][i].slice(0);
            paramlist.push(object); //���� �߰�
//            if (eventname == 'key_down 32') {
//                console.log(shape.event_action_list[eventname][i]);
//                console.log(paramlist);
//            }
//            try {
//                console.log("try");
                result = window[shape.event_action_list[eventname][i]].apply(this, paramlist);
//                throw new Error(301, "an error");
//            }
//            catch (e) {
//                if (e.message == "Cannot read property 'apply' of undefined")
//                    console.log("err!! action " + shape.event_action_list[eventname][i] + " is undefined action!");
//                else {
//                    console.log("err = " + e.message);
//                    console.log(e);
//                }
//            }

        }

        if (result != undefined) {//true�� false��� ���� ������ �� check�÷����� ���̴�
            checkFlag = true;
        }

        // console.log("i = " + i + " name = " + shape.event_action_list[eventname][i] + " chkflag = " + checkFlag + " result = " + result);

    }


}


//object_creates (���� �̺�Ʈ) ó�� �Լ�
//Ÿ�� ������Ʈ(������ ������Ʈ)
function event_create(target) {
    var eventname = "object_creates";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[target.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

//    console.log("object_creates event for " + target.name);
    //console.log(shape.event_action_list[eventname]);

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(target,eventname,shape);


}

//object_creates (���� �̺�Ʈ) ó�� �Լ�
//Ÿ�� ������Ʈ(������ ������Ʈ)
function event_destroy(target) {
    var eventname = "object_destroy";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[target.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

//    console.log("object_destroy event for " + target.name);
    //console.log(shape.event_action_list[eventname]);
    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(target, eventname, shape);


}

//always �̺�Ʈ ó�� �Լ� �ݹ��Լ�, �̺�Ʈ ������
//�̺�Ʈ ��ü�� �Ѿ�´�. (event.currentTarget == �̺�Ʈ �߻� ��ü, �� �ش� ������Ʈ)
function event_step(object) {
//    console.log("step event = " + object.name);
    var eventname = "always";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[object.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    if (load_complete == true)//��ž���� Ű�Է� �ޱ� ����
    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
        runActionFunctions(object, eventname, shape);


}

//timerx (x ��°Ÿ�̸� �̺�Ʈ) ó�� �Լ�
//��� ������Ʈ, Ÿ�̸� ��ȣ
function event_timer(target, timerNumber) {
    var eventname = "timer " + timerNumber;
    var shape = objectResource[target.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

//    console.log(eventname + " event for " + target.name + " id : " + target.id);

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(target, eventname, shape);

}

//Ű �̺�Ʈ (keydown, keypress, keyup) �̺�Ʈ ó�� �Լ�
//Ű Ÿ��(down/press/up), Ű ��ȣ, ��� ������Ʈ
function event_key(type, keynum, target) {
    var eventname = type + " " + keynum;
    var shape = objectResource[target.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

//        console.log("key event " + eventname + " for " + target.name);
    if (load_complete == true)//��ž���� Ű�Է� �ޱ� ����
        runActionFunctions(target, eventname, shape);

}

//���콺 ���� �̺�Ʈ
//�̺�Ʈ ��ü
function event_mousedown(event) {

    var eventname = "mouce_down";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[event.currentTarget.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(event.currentTarget, eventname, shape)

}

//���콺 �������� �̺�Ʈ
//�̺�Ʈ ��ü
function event_mousepress(event) {

    var eventname = "mouce_press";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[event.currentTarget.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//���콺 �� �̺�Ʈ
//�̺�Ʈ ��ü
function event_mouseup(event) {

    var eventname = "mouce_up";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[event.currentTarget.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//���콺 �ö� �̺�Ʈ
//�̺�Ʈ ��ü
function event_mouseover(event) {

    var eventname = "mouce_over";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[event.currentTarget.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(event.currentTarget, eventname, shape)

}
//���콺 ��� �̺�Ʈ
//�̺�Ʈ ��ü
function event_mouseout(event) {

    var eventname = "mouce_out";   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[event.currentTarget.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(event.currentTarget, eventname, shape)

}

//�浹 �̺�Ʈ
//�� ������Ʈ, �浹�� ��� ������Ʈ
function event_collision(object, target, targetname) {

    var eventname = "collision " + targetname;   //�� �̺�Ʈ�� �̸�
    var shape = objectResource[object.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����
//    if (object.name == 'obj_monster' || object.name == 'obj_player') {
//        console.log(object.name + "'s collision = " + eventname + " y = " + object.y);
//        
//    }
    //�� �̺�Ʈ�� �Ҵ�� �׼ǵ��� �����Ѵ�.
    runActionFunctions(object, eventname, shape)



}

function event_drawTime(object) {

//    console.log("draw event + " + object.name);
    var eventname = "drawTime"                  //�� �̺�Ʈ�� �̸�
    var shape = objectResource[object.name];    //������Ʈ ����. �̺�Ʈ-�׼ǿ� ���� ���� ����

    runActionFunctions(object, eventname, shape)
}