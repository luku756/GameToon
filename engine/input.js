
//console.log("i;m in!");

//var spriteResource = new Array();       //Ω∫«¡∂Û¿Ã∆Æ ∏ (¿Ã∏ß:∞¥√º)
//var backgroundResource = new Array();   //πÈ±◊∂ÛøÓµÂ ∏ (¿Ã∏ß:∞¥√º)
//var soundResource = new Array();        //ªÁøÓµÂ ∏ (¿Ã∏ß:∞¥√º)
//var roomResource = new Array();         //∑Î ∏ (¿Ã∏ß:∞¥√º)
//var objectResource = new Array();       //ø¿∫Í¡ß∆Æ ∏ (¿Ã∏ß:∞¥√º)

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



