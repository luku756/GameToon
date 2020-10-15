//텍스트 그리기
//x,y,변수명,객체

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
    if (type == 0) {//상대
        x += object.x;
        y += object.y;
    }

    //텍스트 객체 생성
    textObject = new createjs.Text(text, "bold " + textSize + "px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;

    //화면과 오브젝트에 등록
    object.draws.push(textObject);
    stage.addChild(textObject);
//    console.log("텍스트 드로우");
//    console.log(textObject);
//    console.log(textObject instanceof Text);
//    console.log(textObject instanceof createjs.Text);
//    console.log(stage.children);
//    console.log(stage.children[2] instanceof createjs.Text);
}

//변수 그리기
//x,y,변수명,객체
function draw_Variable(type, x, y, textSize, variableName, object) {
//    console.log("draw variable " + variableName);
//        console.log("x = " + x + " y = " + y );
//    console.log(object);

    //없으면 추가
    if (object.drawvariables == null) {
        var newArray = new Array();
        object.drawvariables = newArray;
    }

    //맵이 없으면 추가
    if (object.variableMap == null) {
        var newArray = new Array();
        object.variableMap = newArray;
    }

    x = toNumber(x);
    y = toNumber(y);
    textSize = toNumber(textSize);
    type = toNumber(type);
    if (type == 0) {//상대
        x += object.x;
        y += object.y;
    }

    //텍스트 객체 생성
    textObject = new createjs.Text("", "bold " + textSize + "px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;
    textObject.text = object.variableMap[variableName];

    //텍스트 객체와 변수명을 담아 보관, 업데이트를 위해서
    var arr = new Array();
    arr[0] = textObject;
    arr[1] = variableName;

    //화면과 오브젝트에 등록
    object.drawvariables.push(arr);
    stage.addChild(textObject);
}

//전역변수 그리기
//x,y,변수명,객체
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
    if (type == 0) {//상대
        x += object.x;
        y += object.y;
    }

    //텍스트 객체 생성
    textObject = new createjs.Text("", "bold "+textSize+"px monospace", "#000");
    textObject.x = x;
    textObject.y = y;
    textObject.depth = 10000000;
    textObject.text = globalVariableMap[variableName];

    //텍스트 객체와 변수명을 담아 보관, 업데이트를 위해서
    var arr = new Array();
    arr[0] = textObject;
    arr[1] = variableName;

    //화면과 오브젝트에 등록
    object.drawglobals.push(arr);
    stage.addChild(textObject);
}
//스프라이트 그리기
//x,y,스프라이트명, 오브젝트명
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
    if (type == 0) {//상대
        x += object.x;
        y += object.y;
    }
//    console.log("type = " + type + " x = " + x + " y = " + y + " sprite = " + spriteName + " ff = " + firstframe + " lf = " + lastframe + " speed = " + speed);

    var sprite = createSprite(spriteResource[spriteName].spriteData, 1, 1, x, y);
    changeSprite(sprite, spriteName,speed,firstframe,lastframe);

    sprite.depth = 10000000;
    //화면과 오브젝트에 등록
    object.draws.push(sprite);
    stage.addChild(sprite);
}
