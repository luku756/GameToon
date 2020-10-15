//이게 false이면 게임루프가 돌지 않는다.
var load_complete = false;

//시작 전 게임의 데이터들을 로드한다.
function loadcomplete() {
    console.log("load complete");
    // handleComplete();

    stage.removeAllChildren();
//    console.log("size = " + (size)/20);

    //이미지 로드가 완료된 후에 룸을 불러내 그리도록 한다
    load_Room(roomResource[roomOrder[0]]);
    //for_test();
    load_complete = true;
}
function loadfail(event) {
    console.log("fail - " + event.item.id);

}
var size = 20;
var loadcount = 0;
//시작 전 게임의 데이터들을 하나 로드한다.
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

//    //이미지 로드가 완료된 후에 룸을 불러내 그리도록 한다
//    load_Room(roomResource[roomOrder[0]]);
//    //for_test();
    //    load_complete = true;
    if (loaingtextMap[event.item.id] != null) {
        loaingtextMap[event.item.id].text += " complete";
    }

}


//각종 스프라이트나 백그라운드의 이미지들을 읽어들인다. 
//읽어들인 이미지는 프리로드를 이용해 imageLoader 에 저장
function load_images() {
    //var image;

    imageLoader.loadFile("nullimage.png");//기본이미지
    //스프라이트 읽기
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

    //백그라운드 읽기
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

//음원 파일들을 미리 읽어들인다.
//사운드도 이미지랑 같이 imageLoader 에 저장
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

//매 틱마다 실행되는 게임 루프. 언제나 처리해야 하는 것들을 처리한다.
function tick(event) {

    if (load_complete == true) {
        //물리엔진
        physics();
        //스텝 이벤트 처리하기
        update_stepEvent();
        //타이머
        timerCounter();
        //충돌처리
        collisionChecker();
        //변수 그리기 업데이트
        update_drawVariables();
        //키 프레스 이벤트는 매번 업데이트
        keypress_update();
        //향해 이동
        destinationMoveUpdate();
        //추적 뷰 활성화시 이동
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
        //추적할 오브젝트 검색
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
    if (targetobject == null) {//타겟이 없으면
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

            if (obj.x > obj.destX) {//왼쪽으로 가야할 때
                if (obj.x - obj.destSpeed > obj.destX) {//갈길이 멀 때
                    obj.x -= obj.destSpeed;
                    x = -obj.destSpeed;
                }
                else {//다왔을 때
                    obj.x = obj.destX;
                    x = 0;
                }
            }
            else if (obj.x < obj.destX) {
                if (obj.x + obj.destSpeed < obj.destX) {//갈길이 멀 때
                    obj.x += obj.destSpeed;
                    x = obj.destSpeed;
                }
                else {//다왔을 때
                    obj.x = obj.destX;
                    x = 0;
                }
            }

            if (obj.y > obj.destY) {//왼쪽으로 가야할 때
                if (obj.y - obj.destSpeed > obj.destY) {//갈길이 멀 때
                    obj.y -= obj.destSpeed;
                    y = -obj.destSpeed;
                }
                else {//다왔을 때
                    obj.y = obj.destY;
                    y = 0;
                }
            }
            else if (obj.y < obj.destY) {
                if (obj.y + obj.destSpeed < obj.destY) {//갈길이 멀 때
                    obj.y += obj.destSpeed;
                    y = obj.destSpeed;
                }
                else {//다왔을 때
                    obj.y = obj.destY;
                    y = 0;
                }
            }

            //솔리드 충돌처리
            if (result == true) {
                var result = solidCollisionChecker(obj);
                if (result == false) {//움직이긴 전에 괜찮았는데 움직이고 충돌, 즉 이 움직임에 문제있음
                    moveForSolid(obj, old_x, old_y, x, y, 0);
                }
            }

            if (obj.x == obj.destX && obj.y == obj.destY) {//도착
//                console.log("dest fin!");
                delete obj.destinationFlag;
                delete obj.destX;
                delete obj.destY;
                delete obj.speed;
            }
        }
    }

}


//키프레스 이벤트 업데이트
function keypress_update() {
    for (var keycode in keypressChecker) {//체커에 있는 것들은 현재 프레스 상태인 것
        keypressListener(keycode);
    }

}

//변수와 전역변수 그리기 업데이트
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



var timerMap = new Array(); //타이머가 세팅된 오브젝트들을 관리하는 맵. 시간-오브젝트 배열 을 지니고 있다.

//매 틱마다 실행되는 타이머 카운터. 이 안에서 타이머 이벤트가 실행된다
var timeCount = 0;  //시간 계산 변수, 시계
function timerCounter() {
    timeCount++;
//    console.log("time = " + timeCount);
//    console.log(timerMap);
    if (timeCount > 1000000000) {
        timeCount %= 1000000000;
    }
    var eventtime;
    if (timerMap[timeCount.toString()] != null) {//이 시간에 타이머가 있다면?
        var time = timeCount.toString();
//        console.log(timerMap);
        for (timeNum in timerMap[time]) {
            eventtime = timerMap[time][timeNum];
//            console.log("timenum = " + eventtime);
//            console.log(timerHaverMap);
//            console.log(timerHaverMap[eventtime]);
            if (timerHaverMap[eventtime] != null) {
                var length = timerHaverMap[eventtime].length;
                for (var i = length - 1; i >= 0; i--) {   //타이머의 액션이 지우기일 경우 배열이 꼬이므로 역순으로 해야함
                    if (nowRoom.having_objects.indexOf(timerHaverMap[eventtime][i]) >= 0)//이 오브젝트가 현재 활성화된(존재하는) 오브젝트일 때만 실행한다.
                        event_timer(timerHaverMap[eventtime][i], eventtime);
                }
            }
            else {
                console.log(time + " 에 timer " + eventtime + " 세팅은 하셨는데 그 타이머 쓰는게 없네여");
            }
        }
        delete timerMap[time]; //다 썼으니 지우자
    }

}

//매 틱마다 실행되는 물리 엔진. 속도/가속도에 맞춰 오브젝트의 위치를 변경한다.
function physics() {
    var old_x, old_y;
    //현재 룸에 존재하는 모든 오브젝트에 대하여 실행하도록 한다.
    for (var i = 0; i < nowRoom.having_objects.length; i++) {
        old_x = nowRoom.having_objects[i].x;
        old_y = nowRoom.having_objects[i].y;
        var result = solidCollisionChecker(nowRoom.having_objects[i]);
        var obj = nowRoom.having_objects[i];
//        if(obj.name == 'obj_player')
//        console.log(obj.name+" 's xy = " + obj.x + ", " + obj.y + " speed = " + obj.xspeed + ", " + obj.yspeed +  " accel = " + obj.xaccel + ", " + obj.yaccel);

        //이동, 속도 변경
        nowRoom.having_objects[i].x += nowRoom.having_objects[i].xspeed;
        nowRoom.having_objects[i].y += nowRoom.having_objects[i].yspeed;

        if (result == true) {
            var result = solidCollisionChecker(nowRoom.having_objects[i]);
            if (result == false) {//움직이긴 전에 괜찮았는데 움직이고 충돌, 즉 이 움직임에 문제있음
//                console.log("solid crash - " + nowRoom.having_objects[i].name);
                moveForSolid(nowRoom.having_objects[i], old_x, old_y, nowRoom.having_objects[i].xspeed, nowRoom.having_objects[i].yspeed, 0);
            }
        }


        nowRoom.having_objects[i].xspeed += nowRoom.having_objects[i].xaccel;
        nowRoom.having_objects[i].yspeed += nowRoom.having_objects[i].yaccel;

    }

}
