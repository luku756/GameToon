function Sprite() {//sprite class
    var name;                   //���ҽ� �̸�
    var width, height;          //����, ����
    var images;                 //�̹��� �迭
    var imageCount;             //�̹����� ����
    var masktype;               //����ũ�� ������, �簢������
    var maskradius;             //�� ����ũ�� ������
    var maskwidth, maskheight;  //�簢�� ����ũ�� ����/����
    var spriteData;             //��������Ʈ ������ �ʿ��� ������

}

function Background() {//background class
    var name;                   //���ҽ� �̸�
    var width, height;          //����, ����
    var image;                  //��׶��� �̹���
    var imageWidth, imageHeight;
}

function SoundResoruce() {//sound class //soundjs�� �浹.. �̸�����
    var name;                   //���ҽ� �̸�
    var sound;                  //���� ������
}

function Room() {//room class
    var name;                   //���ҽ� �̸�
    var width, height;          //����, ����
    var viewtype;               //ī�޶� ������Ʈ�� ����/����
    var viewtarget;             //������ ������ ������Ʈ
    var viewwidth, viewheight;  //����, ����
    var view_coordinate_x;        //�䰡 ���۵Ǵ� x��ǥ
    var view_coordinate_y;        //�䰡 ���۵Ǵ� y��ǥ
    var backgrounds;            //��׶��� �迭
    var backgrounds_type;       //��׶��尡 �������ΰ�, ����Ʈ�ΰ�
    var objects;                //�ʱ� ��ġ ������Ʈ �迭
    var object_coordinate;      //�ʱ� ��ġ ������Ʈ ��ǥ �迭

    var having_objects;         //���� ��ġ�� �ν��Ͻ���. map. key:������Ʈ�� value: �ν��Ͻ��迭
}


function ObjectResoruce() {//object class   //soundjs�� �浹... �̸��ٲ�
    var name;                                   //���ҽ� �̸�
    var x, y, xspeed, yspeed, xaccel, yaccel;   //x,y ��ǥ/�ӵ�/���ӵ�
    var depth;                                  //z-order
    var solid;                                  //solid �ɼ� ����
    var spriteflag, sprite;                     //sprite ���� ����/sprite
    var spritespeed, spritenum;                 //��������Ʈ ��ȭ �ӵ�/��������Ʈ ������ ��ȣ
    var perentflag, parent;                     //�θ� ���� ����/�θ� object
    var event_list;                             //�̺�Ʈ �迭
    var event_action_list;                      //map. key-�̺�Ʈ �̸�, value-�׼��Լ��̸� �迭
    var action_parameter_list;                  //map. key-�̺�Ʈ �̸�, value-�׼��Լ� ���� 2���� �迭
    var custom_var;                             //����� ���� ���� map. key-������ value-��
    var global;                                 //���� ������Ʈ�ΰ� ����
}

var spriteList = new Array();       //��������Ʈ ����Ʈ
var backgroundList = new Array();   //��׶��� ����Ʈ
var soundList = new Array();        //���� ����Ʈ
var roomList = new Array();         //�� ����Ʈ
var objectList = new Array();       //������Ʈ ����Ʈ
var implementList = new Array();    //�÷����� ����Ʈ


var spriteResource = new Array();       //��������Ʈ ��(�̸�:��ü)
var backgroundResource = new Array();   //��׶��� ��(�̸�:��ü)
var soundResource = new Array();        //���� ��(�̸�:��ü)
var roomResource = new Array();         //�� ��(�̸�:��ü)
var objectResource = new Array();       //������Ʈ ��(�̸�:��ü)
var roomOrder = new Array();            //�� ���� �迭(���� : �� �̸�)

function createResource(script,callback) {//��ũ��Ʈ�� �ؼ��Ͽ� �÷����� ����, ���ҽ� ������ �Ѵ�
    //console.log("on-line");
    //console.log(script);

    {//���� ó��
        var main = script['main'];
        readScript_main(main);

    }

    var sprite = script['sprite'];  //��������Ʈ ���ҽ� ����
    for (var i = 0; i < spriteList.length; i++) {
        readScript_sprite(spriteList[i], sprite[spriteList[i]]);
    }

    var background = script['background'];  //��׶��� ���ҽ� ����
    for (var i = 0; i < backgroundList.length; i++) {
        readScript_background(backgroundList[i], background[backgroundList[i]]);
    }

    var sound = script['sound'];  //���� ���ҽ� ����
    for (var i = 0; i < soundList.length; i++) {
        readScript_sound(soundList[i], sound[soundList[i]]);
    }


    var object = script['object'];  //������Ʈ ���ҽ� ����
    for (var i = 0; i < objectList.length; i++) {
        var flag;
        flag = readScript_object(objectList[i], object[objectList[i]]);
        if (flag == false) {//�θ� ������
            objectList.push(objectList[i]); //������ �ٽ�������
        }
    }


    var room = script['room'];  //�� ���ҽ� ����
    for (var i = 0; i < roomList.length; i++) {
        var flag;
        flag = readScript_room(roomList[i], room[roomList[i]]);
        if (flag == false) {//�θ� ������
            roomList.push(roomList[i]); //������ �ٽ�������
        }
    }

    //console.log(spriteList);
    //console.log(backgroundList);
    //console.log(soundList);
    //console.log(objectList);
    //console.log(roomList);
    //console.log(implementList);

//    console.log("classes");
//    console.log(spriteResource);
//    console.log(backgroundResource);
//    console.log(soundResource);
//    console.log(roomResource);
//    console.log(objectResource);

    callback(spriteResource, backgroundResource, soundResource, roomResource, objectResource,roomOrder);

}


function readScript_room(name, roomscript) {
    var newroom = new Room();
    var size;

    newroom.name = name;
    newroom.having_objects = new Array();
    roomOrder.push(name);
    newroom.number = roomOrder.length - 1;

    for (var i = 0; i < roomscript.length; i++) {
        if (roomscript[i] === 'size') {           //���μ��� �ޱ�
            newroom.width = Number(roomscript[i + 1]);
            newroom.height = Number(roomscript[i + 2]);
            i += 2;
        }

        else if (roomscript[i] === 'view') {//�� Ÿ��
            i++;
            if (roomscript[i] === 'fix') {
                newroom.viewtype = 'fix';
            }
            else if (roomscript[i] === 'tracking') {//������Ʈ ����
                newroom.viewtype = 'tracking';
                newroom.viewtarget = roomscript[i+1];//�����ϱ� - ������ �ϴ� �̸��� ����
                i++;
            }

        } 
        else if (roomscript[i] === 'viewsize') {           //���� ���μ��� �ޱ�
            newroom.viewwidth = Number(roomscript[i + 1]);
            newroom.viewheight = Number(roomscript[i + 2]);
            i += 2;
        }
        else if (roomscript[i] === 'viewcoordinate') {     //���� ������ �ޱ�
            newroom.view_coordinate_x = Number(roomscript[i + 1]);
            newroom.view_coordinate_y = Number(roomscript[i + 2]);
            i += 2;
        }

        else if (roomscript[i] === 'background') {     //��׶��� �ޱ�
            newroom.backgrounds = new Array();
            newroom.backgrounds_type = new Array();
            size = Number(roomscript[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                var type = roomscript[i].split(' ');
                newroom.backgrounds.push(backgroundResource[type[0]]);
                newroom.backgrounds_type.push(type[1]);
            }
            i--;
        }

        else if (roomscript[i] === 'object') {     //�ʱ��ġ ������Ʈ �ޱ�
            newroom.objects = new Array();
            newroom.object_coordinate = new Array();
            size = Number(roomscript[i + 1]);
            i += 2;
            var cnt = 0;

            for (cnt = 0; cnt < size; cnt++) {
                var tmp = roomscript[i+cnt].split(" ");
                var coord = new Array();
                coord.x = Number(tmp[1]);
                coord.y = Number(tmp[2]);
//                console.log("name - " + tmp[0]);
//                console.log(objectResource[tmp[0]]);
                if (objectResource[tmp[0]] == null) {
                    console.log("err! " + tmp[0] + " is undefined!");
                }
                newroom.objects.push(objectResource[tmp[0]]);
                newroom.object_coordinate.push(coord);
            }
            break;
        }
    }


    roomResource[name] = newroom;
}

function readScript_object(name, objectscript) {
    var newobject = new ObjectResoruce();
    var size;
    //console.log("load " + name);

    newobject.name = name;
    newobject.x = 0;
    newobject.y = 0;
    newobject.xspeed = 0;
    newobject.yspeed = 0;
    newobject.xaccel = 0;
    newobject.yaccel = 0;

    for (var i = 0; i < objectscript.length; i++) {
        if (objectscript[i] === 'sprite') {
            i++;
            if (objectscript[i] === 'usesprite') {           //��������Ʈ ��뿩��-yes
                newobject.spriteflag = true;
                newobject.sprite = spriteResource[objectscript[i + 1]];
                newobject.spritespeed = 0;
                newobject.spritenum = 0;

            }
            else if (objectscript[i] === 'nosprite') {  //��������Ʈ ��뿩��-no
                newobject.spriteflag = false;
            }
        }
        else if (objectscript[i] === 'global') { //���� ����
            i++;
            if (objectscript[i] == 'true')  //����
                newobject.global = true;

            else
                newobject.global = false;
        }

        else if (objectscript[i] === 'solid') { //�ָ��� �ɼ�
            i++;
            if (objectscript[i] == 'true') //����
                newobject.solid = true;

            else
                newobject.solid = false;
        }

        else if (objectscript[i] === 'depth') { //����            
            newobject.depth = Number(objectscript[i + 1]);
            i++;
        }

        else if (objectscript[i] === 'inherit') {

            i++;
            if (objectscript[i] === 'parent') {           //�����
                newobject.parentflag = true;

                if (objectscript[i + 1] != name) {
                    if (objectResource[objectscript[i + 1]] === undefined) {//�θ� ���� �� ����, ����
                        return false; //���� ��ȸ�� �����ϼ���
                    }

                    newobject.parent = objectResource[objectscript[i + 1]]; //�θ� ����
                    //����ϱ�

                    if (newobject.event_action_list == undefined) {//�ʱ�ȭ �۾�
                        newobject.event_list = new Array();
                        newobject.event_action_list = new Array();
                        newobject.action_parameter_list = new Array();
                    }

                    newobject.event_list = newobject.parent.event_list.slice(0);
                    for (var e = 0; e < newobject.event_list.length; e++) {
                        newobject.event_action_list[newobject.event_list[e]] = newobject.parent.event_action_list[newobject.event_list[e]].slice(0);
                        newobject.action_parameter_list[newobject.event_list[e]] = newobject.parent.action_parameter_list[newobject.event_list[e]].slice(0);
                        for (var a = 0; a < newobject.parent.action_parameter_list[newobject.event_list[e]].length; a++) {
                            newobject.action_parameter_list[newobject.event_list[e]][a] = newobject.parent.action_parameter_list[newobject.event_list[e]][a].slice(0);
                        }

                    }
                }

            }
            else if (objectscript[i] === 'noparent') {  //��Ӿ���
                newobject.parentflag = false;
            }


        }

        else if (objectscript[i] === 'event') {     //�̺�Ʈ-�׼� �ޱ�
            var eventsize = Number(objectscript[i + 1]);
            var eventname;
            var actionsize, actiondata;


            if (newobject.event_action_list == undefined) {//�ʱ�ȭ �۾�
                newobject.event_list = new Array();
                newobject.event_action_list = new Array();
                newobject.action_parameter_list = new Array();
            }

            i += 2;
            for (var t = 0; t < eventsize; t++) {
                eventname = objectscript[i++];          //�̺�Ʈ��(+�Ķ����)
                actionsize = Number(objectscript[i++]); //�׼ǻ�����

                var index = newobject.event_list.indexOf(eventname);
                if (index < 0) {//�ߺ� �ƴҶ��� �߰�
                    newobject.event_list.push(eventname); ;
                }

                //console.log("event : " + eventname);


                if (newobject.event_action_list[eventname] == undefined) {//�ش� �̺�Ʈ�� ���� �ʱ�ȭ
                    newobject.event_action_list[eventname] = new Array();
                    newobject.action_parameter_list[eventname] = new Array();
                }


                for (var a = 0; a < actionsize; a++) {
                    actiondata = objectscript[i++]; //�׼Ǹ�
                    var splitaction = actiondata.split(" ");  //�׼��� �̸��� �Ķ���� ������ ���� ��
                    var actionname = splitaction[0];         //�׼Ǹ�
                    var actionparameter = new Array();      //�Ķ���� �迭

                    for (var p = 1; p < splitaction.length; p++) {
                        actionparameter.push(splitaction[p]);
                    }

                    //���ܻ���-draw_Text, ���� ���� ���� ����!
                    if (actionname == 'draw_Text') {
                        var tmp = new Array();
                        //tmp[0] = splitaction[0];
                        tmp[0] = splitaction[1];
                        tmp[1] = splitaction[2];
                        tmp[2] = splitaction[3];
                        tmp[3] = splitaction[4];
                        tmp[4] = "";
                        for (var k = 5; k < splitaction.length - 1; k++)
                            tmp[4] += (splitaction[k] + " ");
                        tmp[4] += splitaction[splitaction.length - 1];
                        actionparameter = tmp;
                    }

                    newobject.event_action_list[eventname].push(actionname);   //�׼� ����
                    newobject.action_parameter_list[eventname].push(actionparameter); //�Ķ���� ����
                    //console.log("action = " + actionname);

                }
            }
            break; //��ũ��Ʈ ��
        }
    }


    objectResource[name] = newobject;
    return true;
}

function readScript_sound(name, soundscript) {
    var newsound = new SoundResoruce();
    //console.log("sound");
    //console.log(soundscript);

    newsound.name = name;
    newsound.sound = soundscript[0];



    soundResource[name] = newsound;
}

function readScript_background(name, backgroundscript) {
    var newbackground = new Background();

    newbackground.name = name;
    newbackground.width = Number(backgroundscript[1]);
    newbackground.height = Number(backgroundscript[2]);
    newbackground.image = backgroundscript[4];
    newbackground.imageWidth = Number(backgroundscript[5]);
    newbackground.imageHeight = Number(backgroundscript[6]);


    backgroundResource[name] = newbackground;
}


function readScript_sprite(name, spritescript) {
    var newsprite = new Sprite();
    var size;

    newsprite.name = name;

    for (var i = 0; i < spritescript.length; i++) {
        if (spritescript[i] === 'size') {           //���μ��� �ޱ�
            newsprite.width = Number(spritescript[i + 1]);
            newsprite.height = Number(spritescript[i + 2]);
            i += 2;
        }

        else if (spritescript[i] === 'image') {     //�׸��̸� �ޱ�
            newsprite.images = new Array();
            newsprite.imageCount = Number(spritescript[i + 1]);//�̹��� ���
            size = i + 3;   //�̹����� ���� �̹����� �ƴ� ��Ʈ�� ������ ���� �̹����� ����
            //size = Number(spritescript[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                newsprite.images = spritescript[i];
            }
            i--;
            newsprite.spriteData = createSpriteData(newsprite.images, newsprite.width, newsprite.height, 0, 0, newsprite.imageCount);
        }

        else if (spritescript[i] === 'mask') {
            i++;
            if (spritescript[i] === 'rectangle') {
                newsprite.masktype = spritescript[i];
                newsprite.maskwidth = Number(spritescript[i + 1]);
                newsprite.maskheight = Number(spritescript[i + 2]);
            }
            else if (spritescript[i] === 'circle') {
                newsprite.masktype = spritescript[i];
                newsprite.maskradius = Number(spritescript[i + 1]);

            }

        }
    }


    spriteResource[name] = newsprite;
}



function readScript_main(main) {//���� ��ũ��Ʈ �ؼ�
    //console.log(main);
    var size;
    for (var i = 0; i < main.length; i++) {//���� ��ũ��Ʈ ó��

        if (main[i] === 'implement') {  //�÷����� ���� �˱�
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                implementList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

        else if (main[i] === 'resource') {//���ҽ� ���� �˱�(���ҽ� ������ �����̹Ƿ� ��ǻ� �ǹ̾���)
            size = Number(main[i + 1]);
            i += (size + 1);
        }

        else if (main[i] === 'sprite') {       //��������Ʈ ���ҽ� ���� ����
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                spriteList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

        else if (main[i] === 'background') {       //��������Ʈ ���ҽ� ���� ����
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                backgroundList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

        else if (main[i] === 'sound') {       //��������Ʈ ���ҽ� ���� ����
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                soundList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

        else if (main[i] === 'object') {       //��������Ʈ ���ҽ� ���� ����
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                objectList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

        else if (main[i] === 'room') {       //��������Ʈ ���ҽ� ���� ����
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                roomList.push(main[i]); //�÷����� ����Ʈ
            }
            i--;
        }

    }


}