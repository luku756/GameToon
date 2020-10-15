//�ؽ�Ʈ �׸���
//x,y,������,��ü

function draw_Text(type, x, y, textSize, text, object) {
//    console.log("draw text");
//    console.log("type = " + type + " x = " + x + " y = " + y + " size= " + textSize + " text = " + text);

    if (object.draws == null) {
        var newArray = new Array();
        object.draws = newArray;
    }

    x = toNumber(x);
    y = toNumber(y);
    textSize = toNumber(textSize);
    type = toNumber(type);
    if (type == 0) {//���
        x += object.x;
        y += object.y;
    }

    //�ؽ�Ʈ ��ü ����
    textObject = new createjs.Text(text, "bold " + textSize + "px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;

    //ȭ��� ������Ʈ�� ���
    object.draws.push(textObject);
    stage.addChild(textObject);
//    console.log("�ؽ�Ʈ ��ο�");
//    console.log(textObject);
//    console.log(textObject instanceof Text);
//    console.log(textObject instanceof createjs.Text);
//    console.log(stage.children);
//    console.log(stage.children[2] instanceof createjs.Text);
}

//���� �׸���
//x,y,������,��ü
function draw_Variable(type, x, y, textSize, variableName, object) {
//    console.log("draw variable " + variableName);
//        console.log("x = " + x + " y = " + y );
//    console.log(object);

    //������ �߰�
    if (object.drawvariables == null) {
        var newArray = new Array();
        object.drawvariables = newArray;
    }

    //���� ������ �߰�
    if (object.variableMap == null) {
        var newArray = new Array();
        object.variableMap = newArray;
    }

    x = toNumber(x);
    y = toNumber(y);
    textSize = toNumber(textSize);
    type = toNumber(type);
    if (type == 0) {//���
        x += object.x;
        y += object.y;
    }

    //�ؽ�Ʈ ��ü ����
    textObject = new createjs.Text("", "bold " + textSize + "px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;
    textObject.text = object.variableMap[variableName];

    //�ؽ�Ʈ ��ü�� �������� ��� ����, ������Ʈ�� ���ؼ�
    var arr = new Array();
    arr[0] = textObject;
    arr[1] = variableName;

    //ȭ��� ������Ʈ�� ���
    object.drawvariables.push(arr);
    stage.addChild(textObject);
}

//�������� �׸���
//x,y,������,��ü
function draw_GlobalVariable(type, x, y, textSize, variableName, object) {
//    console.log("draw globalvariable " + variableName);
//    console.log("x = " + x + " y = " + y + " text = " + globalVariableMap[variableName]);
//    console.log(globalVariableMap);
    if (object.drawglobals == null) {
        var newArray = new Array();
        object.drawglobals = newArray;
    }

    x = toNumber(x);
    y = toNumber(y);
    textSize = toNumber(textSize);
    type = toNumber(type);
    if (type == 0) {//���
        x += object.x;
        y += object.y;
    }

    //�ؽ�Ʈ ��ü ����
    textObject = new createjs.Text("", "bold "+textSize+"px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;
    textObject.text = globalVariableMap[variableName];

    //�ؽ�Ʈ ��ü�� �������� ��� ����, ������Ʈ�� ���ؼ�
    var arr = new Array();
    arr[0] = textObject;
    arr[1] = variableName;

    //ȭ��� ������Ʈ�� ���
    object.drawglobals.push(arr);
    stage.addChild(textObject);
}
//��������Ʈ �׸���
//x,y,��������Ʈ��, ������Ʈ��
function draw_sprite(type, x, y, spriteName, firstframe, lastframe, speed, object) {
//    console.log("draw sprite for " + object.name);
    //    console.log("x = " + x + " y = " + y + " sprite = " + spriteName);
    if (object.draws == null) {
        var newArray = new Array();
        object.draws = newArray;
    }
//    console.log(object.draws);
    x = toNumber(x);
    y = toNumber(y);
    firstframe = toNumber(firstframe);
    lastframe = toNumber(lastframe);
    speed = toNumber(speed);
    type = toNumber(type);
    if (type == 0) {//���
        x += object.x;
        y += object.y;
    }
//    console.log("type = " + type + " x = " + x + " y = " + y + " sprite = " + spriteName + " ff = " + firstframe + " lf = " + lastframe + " speed = " + speed);

    var sprite = createSprite(spriteResource[spriteName].spriteData, 1, 1, x, y);
    changeSprite(sprite, spriteName,speed,firstframe,lastframe);

    sprite.depth = 10000000;
    //ȭ��� ������Ʈ�� ���
    object.draws.push(sprite);
    stage.addChild(sprite);
}
