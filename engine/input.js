
//console.log("i;m in!");

//var spriteResource = new Array();       //��������Ʈ ��(�̸�:��ü)
//var backgroundResource = new Array();   //��׶��� ��(�̸�:��ü)
//var soundResource = new Array();        //���� ��(�̸�:��ü)
//var roomResource = new Array();         //�� ��(�̸�:��ü)
//var objectResource = new Array();       //������Ʈ ��(�̸�:��ü)

function data_load() {

    returnscript(function (scripts) {
        //console.log(scripts);
        createResource(scripts, function (sprite, background, sound, room, object,roomorder) {

            spriteResource = sprite;
            backgroundResource = background;
            soundResource = sound;
            roomResource = room;
            objectResource = object;
            roomOrder = roomorder;
            //console.log("read-fin");

        });
    });

//    console.log("classes");
//    console.log(spriteResource);
//    console.log(backgroundResource);
//    console.log(soundResource);
//    console.log(roomResource);
//    console.log(objectResource);
}



