function Sprite() {//sprite class
    var name;                   //리소스 이름
    var width, height;          //가로, 세로
    var images;                 //이미지 배열
    var imageCount;             //이미지의 숫자
    var masktype;               //마스크가 원인지, 사각형인지
    var maskradius;             //원 마스크시 반지름
    var maskwidth, maskheight;  //사각형 마스크시 가로/세로
    var spriteData;             //스프라이트 구성에 필요한 데이터

}

function Background() {//background class
    var name;                   //리소스 이름
    var width, height;          //가로, 세로
    var image;                  //백그라운드 이미지
    var imageWidth, imageHeight;
}

function SoundResoruce() {//sound class //soundjs와 충돌.. 이름변경
    var name;                   //리소스 이름
    var sound;                  //음원 데이터
}

function Room() {//room class
    var name;                   //리소스 이름
    var width, height;          //가로, 세로
    var viewtype;               //카메라가 오브젝트를 추적/고정
    var viewtarget;             //추적시 추적할 오브젝트
    var viewwidth, viewheight;  //가로, 세로
    var view_coordinate_x;        //뷰가 시작되는 x좌표
    var view_coordinate_y;        //뷰가 시작되는 y좌표
    var backgrounds;            //백그라운드 배열
    var backgrounds_type;       //백그라운드가 스케일인가, 리피트인가
    var objects;                //초기 배치 오브젝트 배열
    var object_coordinate;      //초기 배치 오브젝트 좌표 배열

    var having_objects;         //현재 배치된 인스턴스들. map. key:오브젝트명 value: 인스턴스배열
}


function ObjectResoruce() {//object class   //soundjs와 충돌... 이름바꿈
    var name;                                   //리소스 이름
    var x, y, xspeed, yspeed, xaccel, yaccel;   //x,y 좌표/속도/가속도
    var depth;                                  //z-order
    var solid;                                  //solid 옵션 여부
    var spriteflag, sprite;                     //sprite 존재 여부/sprite
    var spritespeed, spritenum;                 //스프라이트 변화 속도/스프라이트 프레임 번호
    var perentflag, parent;                     //부모 존재 여부/부모 object
    var event_list;                             //이벤트 배열
    var event_action_list;                      //map. key-이벤트 이름, value-액션함수이름 배열
    var action_parameter_list;                  //map. key-이벤트 이름, value-액션함수 인자 2차원 배열
    var custom_var;                             //사용자 정의 변수 map. key-변수명 value-값
    var global;                                 //전역 오브젝트인가 여부
}

var spriteList = new Array();       //스프라이트 리스트
var backgroundList = new Array();   //백그라운드 리스트
var soundList = new Array();        //사운드 리스트
var roomList = new Array();         //룸 리스트
var objectList = new Array();       //오브젝트 리스트
var implementList = new Array();    //플러그인 리스트


var spriteResource = new Array();       //스프라이트 맵(이름:객체)
var backgroundResource = new Array();   //백그라운드 맵(이름:객체)
var soundResource = new Array();        //사운드 맵(이름:객체)
var roomResource = new Array();         //룸 맵(이름:객체)
var objectResource = new Array();       //오브젝트 맵(이름:객체)
var roomOrder = new Array();            //룸 순서 배열(내용 : 룸 이름)

function createResource(script,callback) {//스크립트를 해석하여 플러그인 부착, 리소스 구성을 한다
    //console.log("on-line");
    //console.log(script);

    {//메인 처리
        var main = script['main'];
        readScript_main(main);

    }

    var sprite = script['sprite'];  //스프라이트 리소스 구성
    for (var i = 0; i < spriteList.length; i++) {
        readScript_sprite(spriteList[i], sprite[spriteList[i]]);
    }

    var background = script['background'];  //백그라운드 리소스 구성
    for (var i = 0; i < backgroundList.length; i++) {
        readScript_background(backgroundList[i], background[backgroundList[i]]);
    }

    var sound = script['sound'];  //사운드 리소스 구성
    for (var i = 0; i < soundList.length; i++) {
        readScript_sound(soundList[i], sound[soundList[i]]);
    }


    var object = script['object'];  //오브젝트 리소스 구성
    for (var i = 0; i < objectList.length; i++) {
        var flag;
        flag = readScript_object(objectList[i], object[objectList[i]]);
        if (flag == false) {//부모가 없을때
            objectList.push(objectList[i]); //다음에 다시읽으라
        }
    }


    var room = script['room'];  //룸 리소스 구성
    for (var i = 0; i < roomList.length; i++) {
        var flag;
        flag = readScript_room(roomList[i], room[roomList[i]]);
        if (flag == false) {//부모가 없을때
            roomList.push(roomList[i]); //다음에 다시읽으라
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
        if (roomscript[i] === 'size') {           //가로세로 받기
            newroom.width = Number(roomscript[i + 1]);
            newroom.height = Number(roomscript[i + 2]);
            i += 2;
        }

        else if (roomscript[i] === 'view') {//뷰 타입
            i++;
            if (roomscript[i] === 'fix') {
                newroom.viewtype = 'fix';
            }
            else if (roomscript[i] === 'tracking') {//오브젝트 추적
                newroom.viewtype = 'tracking';
                newroom.viewtarget = roomscript[i+1];//추적하기 - 지금은 일단 이름만 저장
                i++;
            }

        } 
        else if (roomscript[i] === 'viewsize') {           //뷰의 가로세로 받기
            newroom.viewwidth = Number(roomscript[i + 1]);
            newroom.viewheight = Number(roomscript[i + 2]);
            i += 2;
        }
        else if (roomscript[i] === 'viewcoordinate') {     //뷰의 시작점 받기
            newroom.view_coordinate_x = Number(roomscript[i + 1]);
            newroom.view_coordinate_y = Number(roomscript[i + 2]);
            i += 2;
        }

        else if (roomscript[i] === 'background') {     //백그라운드 받기
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

        else if (roomscript[i] === 'object') {     //초기배치 오브젝트 받기
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
            if (objectscript[i] === 'usesprite') {           //스프라이트 사용여부-yes
                newobject.spriteflag = true;
                newobject.sprite = spriteResource[objectscript[i + 1]];
                newobject.spritespeed = 0;
                newobject.spritenum = 0;

            }
            else if (objectscript[i] === 'nosprite') {  //스프라이트 사용여부-no
                newobject.spriteflag = false;
            }
        }
        else if (objectscript[i] === 'global') { //전역 설정
            i++;
            if (objectscript[i] == 'true')  //전역
                newobject.global = true;

            else
                newobject.global = false;
        }

        else if (objectscript[i] === 'solid') { //솔리드 옵션
            i++;
            if (objectscript[i] == 'true') //고정
                newobject.solid = true;

            else
                newobject.solid = false;
        }

        else if (objectscript[i] === 'depth') { //깊이            
            newobject.depth = Number(objectscript[i + 1]);
            i++;
        }

        else if (objectscript[i] === 'inherit') {

            i++;
            if (objectscript[i] === 'parent') {           //상속함
                newobject.parentflag = true;

                if (objectscript[i + 1] != name) {
                    if (objectResource[objectscript[i + 1]] === undefined) {//부모가 아직 안 읽힘, 실패
                        return false; //다음 기회에 도전하세요
                    }

                    newobject.parent = objectResource[objectscript[i + 1]]; //부모 설정
                    //상속하기

                    if (newobject.event_action_list == undefined) {//초기화 작업
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
            else if (objectscript[i] === 'noparent') {  //상속안함
                newobject.parentflag = false;
            }


        }

        else if (objectscript[i] === 'event') {     //이벤트-액션 받기
            var eventsize = Number(objectscript[i + 1]);
            var eventname;
            var actionsize, actiondata;


            if (newobject.event_action_list == undefined) {//초기화 작업
                newobject.event_list = new Array();
                newobject.event_action_list = new Array();
                newobject.action_parameter_list = new Array();
            }

            i += 2;
            for (var t = 0; t < eventsize; t++) {
                eventname = objectscript[i++];          //이벤트명(+파라미터)
                actionsize = Number(objectscript[i++]); //액션사이즈

                var index = newobject.event_list.indexOf(eventname);
                if (index < 0) {//중복 아닐때만 추가
                    newobject.event_list.push(eventname); ;
                }

                //console.log("event : " + eventname);


                if (newobject.event_action_list[eventname] == undefined) {//해당 이벤트에 대한 초기화
                    newobject.event_action_list[eventname] = new Array();
                    newobject.action_parameter_list[eventname] = new Array();
                }


                for (var a = 0; a < actionsize; a++) {
                    actiondata = objectscript[i++]; //액션명
                    var splitaction = actiondata.split(" ");  //액션을 이름과 파라미터 등으로 나눈 것
                    var actionname = splitaction[0];         //액션명
                    var actionparameter = new Array();      //파라미터 배열

                    for (var p = 1; p < splitaction.length; p++) {
                        actionparameter.push(splitaction[p]);
                    }

                    //예외사항-draw_Text, 인자 내에 띄어쓰기 가능!
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

                    newobject.event_action_list[eventname].push(actionname);   //액션 삽입
                    newobject.action_parameter_list[eventname].push(actionparameter); //파라미터 삽입
                    //console.log("action = " + actionname);

                }
            }
            break; //스크립트 끝
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
        if (spritescript[i] === 'size') {           //가로세로 받기
            newsprite.width = Number(spritescript[i + 1]);
            newsprite.height = Number(spritescript[i + 2]);
            i += 2;
        }

        else if (spritescript[i] === 'image') {     //그림이름 받기
            newsprite.images = new Array();
            newsprite.imageCount = Number(spritescript[i + 1]);//이미지 장수
            size = i + 3;   //이미지가 개별 이미지가 아닌 스트립 형태의 통합 이미지로 변경
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



function readScript_main(main) {//메인 스크립트 해석
    //console.log(main);
    var size;
    for (var i = 0; i < main.length; i++) {//메인 스크립트 처리

        if (main[i] === 'implement') {  //플러그인 종류 알기
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                implementList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

        else if (main[i] === 'resource') {//리소스 종류 알기(리소스 종류가 고정이므로 사실상 의미없다)
            size = Number(main[i + 1]);
            i += (size + 1);
        }

        else if (main[i] === 'sprite') {       //스프라이트 리소스 구성 수행
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                spriteList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

        else if (main[i] === 'background') {       //스프라이트 리소스 구성 수행
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                backgroundList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

        else if (main[i] === 'sound') {       //스프라이트 리소스 구성 수행
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                soundList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

        else if (main[i] === 'object') {       //스프라이트 리소스 구성 수행
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                objectList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

        else if (main[i] === 'room') {       //스프라이트 리소스 구성 수행
            size = Number(main[i + 1]) + i + 2;
            i += 2;
            for (; i < size; i++) {
                roomList.push(main[i]); //플러그인 리스트
            }
            i--;
        }

    }


}