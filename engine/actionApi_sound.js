
var soundPlayMap = new Array();//���� ����� ���� ��

//���� ���
//���� ���ҽ���, ������Ʈ
function playSound(soundName, looptime, object) {
    var soundinstance;
//    console.log("playsound " + soundName + " " + looptime + " times");
    //���� ���
    if (Number(looptime) >= -1) {//���� ����� ������ ���� ����
        soundinstance=createjs.Sound.play(soundResource[soundName].sound, { loop: looptime });
    }
    else {
        soundinstance=createjs.Sound.play(soundResource[soundName].sound);
    }
    soundinstance.on("complete", soundComplete);
    //console.log(soundinstance);
    //console.log(soundinstance.playState);
    if (soundinstance.playState == "playFailed") {//��� ���н� - �� �̹� �� ���尡 �÷��̵ǰ� ���� ��
        //console.log("fail");
        var idsplit = soundinstance.src.split("/");
        var src = idsplit[idsplit.length - 1];
        if (soundPlayMap[src] != null) {//���� �� �� ���׵� ������ ������ �̰� ���� ����
            soundPlayMap[src].stop();   //���� ����Ǵ� ���带 �� ������
            soundinstance.play();       //�ٽ� �÷����Ѵ�
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

//���� ����
//���� �̸�, ������Ʈ
function stopSound(soundName, object) {
    src = soundResource[soundName].sound;   //�ҽ���
    if (soundPlayMap[src] != null) {//�� ������ ������̶��
        soundPlayMap[src].stop(); //���߰�
//        console.log("stop sound " + soundName);
        delete soundPlayMap[src];//�����
    }
}

//������� ����
//������Ʈ
function stopAllSound(object) {
//    console.log("stop all sound");
    soundPlayMap = new Array(); //��ü�����̹Ƿ� �迭 ����
    createjs.Sound.stop();
}
var soundPaused = false;

//���� �Ͻ����� - ��� ������ �Ͻ������Ͽ��ٰ� �ٽ� Ǯ���ش�.
//������Ʈ
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
