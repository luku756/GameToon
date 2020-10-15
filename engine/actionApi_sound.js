
var soundPlayMap = new Array();//사운드 재생중 저장 맵

//음원 재생
//사운드 리소스명, 오브젝트
function playSound(soundName, looptime, object) {
    var soundinstance;
//    console.log("playsound " + soundName + " " + looptime + " times");
    //음원 재생
    if (Number(looptime) >= -1) {//루프 제대로 들어왔을 때만 적용
        soundinstance=createjs.Sound.play(soundResource[soundName].sound, { loop: looptime });
    }
    else {
        soundinstance=createjs.Sound.play(soundResource[soundName].sound);
    }
    soundinstance.on("complete", soundComplete);
    //console.log(soundinstance);
    //console.log(soundinstance.playState);
    if (soundinstance.playState == "playFailed") {//재생 실패시 - 즉 이미 이 사운드가 플레이되고 있을 때
        //console.log("fail");
        var idsplit = soundinstance.src.split("/");
        var src = idsplit[idsplit.length - 1];
        if (soundPlayMap[src] != null) {//물론 그 외 사항도 있을수 있으니 이게 있을 때만
            soundPlayMap[src].stop();   //현재 재생되는 사운드를 꺼 버리고
            soundinstance.play();       //다시 플레이한다
            soundPlayMap[src] = soundinstance;
         //   console.log(soundinstance);
        }
    }
    else {
        //console.log("sucessec");
    var idsplit = soundinstance.src.split("/");
    var src = idsplit[idsplit.length - 1];
    soundPlayMap[src] = soundinstance;

    //console.log("soundPlayMap");
    //console.log(soundPlayMap);
}
if (soundPaused == true)
pauseSound(object);

}

function soundComplete(event) {
    var idsplit = event.currentTarget.src.split("/");
    var src = idsplit[idsplit.length-1];
    delete soundPlayMap[src];
    //console.log("soundcomplete - " + src);
    //console.log(soundPlayMap);
}

//음악 중지
//음악 이름, 오브젝트
function stopSound(soundName, object) {
    src = soundResource[soundName].sound;   //소스명
    if (soundPlayMap[src] != null) {//이 음악이 재생중이라면
        soundPlayMap[src].stop(); //멈추고
//        console.log("stop sound " + soundName);
        delete soundPlayMap[src];//지운다
    }
}

//모든음악 중지
//오브젝트
function stopAllSound(object) {
//    console.log("stop all sound");
    soundPlayMap = new Array(); //전체종료이므로 배열 비우기
    createjs.Sound.stop();
}
var soundPaused = false;

//음악 일시중지 - 모든 음악을 일시중지하였다가 다시 풀어준다.
//오브젝트
function pauseSound(object) {
    if (soundPaused == false) {
        for (var so in soundPlayMap) {
            soundPlayMap[so].paused = true;
        }
        soundPaused = true;
    }
    else {
        for (var so in soundPlayMap) {
            soundPlayMap[so].paused = false;
        }
        soundPaused = false;
    }
}
