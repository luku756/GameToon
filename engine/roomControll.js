
//���� �ʱ�ȭ�ϰ� �� ������ �����Ѵ�.
//�� ��
function change_Room(newroom) {

    load_complete = false;
    clear_Room(true);
    load_Room(newroom);
    load_complete = true;
}

//������ �ִ� ���� �ʱ�ȭ�Ͽ� �����Ѵ�.
//true - ������Ʈ ���� ����
//false - ������Ʈ ����, ȭ�鿡���� ����
function clear_Room(type) {
    //���� ����Ǹ� ����ϴ�

    if (type == true) {

        //��׶��� ���� �����
        for (var i = 0; i < nowBackgrounds.length; i++) {
            stage.removeChild(nowBackgrounds[i]);
        }
        nowBackgrounds = [];    //�������

        //������Ʈ Ŭ����.
        var length = nowRoom.having_objects.length;
//        console.log("len - " + length);
        for (var i = length - 1; i >= 0; i--) {   // ���� �ε����� �������ϱ� �ڿ������� ����
//            console.log("remove for roomclear - " + nowRoom.having_objects[i].name);
            removeObjects(nowRoom.having_objects[i]);
        }


    }
    else {
        console.log("sorry, i can't fin this");
    }

}

//�� �о���̱�
function load_Room(newroom) {

//    console.log("@load Room! new room = " + newroom.name);
//    console.log("roomnum = " + newroom.number);
//console.log(newroom);
    nowRoom = newroom;  //�� ���� �̰Ŵ�!

    newroom.having_objects.length = 0; //�迭 ����, ������Ʈ �ʱ�ȭ�ϱ�
    //���ÿ� ���� �̰� �ϰ� ���ϰ� �� ���� ���� �� ����.

    //���ȭ���� ������Ʈ���� �ڿ� �־�� �ϹǷ� ���� �׸���. �̰� �ڿ� ������ ������Ʈ�� ���� �Ⱥ��̰� ��
    //���ȭ�� ����. ���ȭ���� bitmap���� �����ϰ� ȭ��� �׸���.
    var backimage;
    newroom.backgroundList = new Array();

    for (var i = 0; i < newroom.backgrounds.length; i++) {
//        console.log();
        if (newroom.backgrounds_type[i] == "scale")
            backimage = draw_background_scale(newroom.backgrounds[i],newroom, 0, 0);
        else
            backimage = draw_background_repeat(newroom.backgrounds[i], newroom, 0, 0);
    }

    //console.log("obj list");
    //�ʱ� ��ġ ������Ʈ���� ��ġ�Ѵ�
    for (var i = 0; i < newroom.objects.length; i++) {

        create_object(newroom.objects[i], newroom.object_coordinate[i].x, newroom.object_coordinate[i].y);
    }
    //���� �� ũ�⿡ ���� �� ����. �� ��ǥ�� ũ�⸦ ���� ���Ѵ�
    moveView_fix(newroom.view_coordinate_x, newroom.view_coordinate_y, newroom.viewwidth, newroom.viewheight);

    //�� ���� Ÿ��
    if (newroom.viewtype == "tracking") {
        viewTrakingFlag = true;
    }
    else {
        viewTrakingFlag = false;
    }
}
