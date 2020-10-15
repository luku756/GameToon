
//이미지를 화면상에 그린다. 
//이미지 객체, x확대, y확대, x좌표, y 좌표
function drawImage_preload(image, scaleX, scaleY, x, y) {

    bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = scaleX;
    bitmap.scaleY = scaleY;
    bitmap.x = x;
    bitmap.y = y;
    setHitArea(image,bitmap);
    //console.log(bitmap);
    stage.addChild(bitmap);
    return bitmap;

}

//이미지를 화면상에 꽉 차게 그린다. 
//이미지 객체, 이미지 가로, 이미지 세로
function drawImage_fillStage(image, imageWidth, imageHeight) {

    bitmap = new createjs.Bitmap(image);     //비트맵 객체 생성            
    var stageWidth = stage.canvas.width; var stageHeight = stage.canvas.height;
    var width = imageWidth; var height = imageHeight;
    bitmap.scaleX = stageWidth / width; //비율에 맞게 확대
    bitmap.scaleY = stageHeight / height;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);
    return bitmap;
}

//이미지를 원하는 크기에 맞도록, 원하는 좌표에 그린다.
//이미지 객체, 이미지 가로, 이미지 세로, 목표 가로, 목표 세로
function drawImage_targetSize(image, imageWidth, imageHeight, targetWidth, targetHeight, x, y) {

    bitmap = new createjs.Bitmap(image);     //비트맵 객체 생성            
    var width = imageWidth; var height = imageHeight;
    bitmap.scaleX = targetWidth / width; //비율에 맞게 확대
    bitmap.scaleY = targetHeight / height;
    bitmap.x = x;
    bitmap.y = y;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);
    return bitmap;
}

//이미지를 원하는 크기에 맞도록, 원하는 좌표에 그린다.
//이미지 객체, 이미지 가로, 이미지 세로, 목표 가로, 목표 세로
function drawImage_targetSize_repeat(image, targetWidth, targetHeight, x, y) {

    bitmap = new createjs.Shape();
    bitmap.graphics.beginBitmapFill(image).drawRect(0, 0, targetWidth, targetHeight);
    bitmap.x = x;
    bitmap.y = y;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);

    return bitmap;

}

//이미지(비트맵) 을 변경한다.
//변경할 비트맵, 새 이미지 경로(이름)
function changeImage(bitmap, newImageName) {

//    var image = new Image();
//    image.src = "_assets/art/" + newImageName;
    var image = imageLoader.getResult(newImageName);
    var newbitmap = new createjs.Bitmap(image);     //비트맵 객체 생성
    bitmap.image = newbitmap.image;
    setHitArea(image, bitmap);
    return bitmap;

}


//배경화면 그려넣기 - 늘이기
//백그라운드데이터, 뷰의 x좌표, 뷰의 y좌표
function draw_background_scale(background, room, viewCoordinate_x, viewCoordinate_y) {

    var image = imageLoader.getResult(background.image);
    var backgroundBitmap = drawImage_targetSize(image, background.imageWidth, background.imageHeight, room.width, room.height, viewCoordinate_x, viewCoordinate_y);
    backgroundBitmap.width = background.width;
    backgroundBitmap.height = background.height;
    nowBackgrounds.push(backgroundBitmap);
    return backgroundBitmap;
}


//배경화면 그려넣기 - 반복하기 (미구현!)
//백그라운드데이터, 뷰의 x좌표, 뷰의 y좌표
function draw_background_repeat(background, room, viewCoordinate_x, viewCoordinate_y) {

    var image = imageLoader.getResult(background.image);
    var backgroundBitmap = drawImage_targetSize_repeat(image, room.width, room.height, viewCoordinate_x, viewCoordinate_y);
    backgroundBitmap.width = background.width;
    backgroundBitmap.height = background.height;
    nowBackgrounds.push(backgroundBitmap);
    return backgroundBitmap;
}




//뷰, 즉 카메라를 이동시킨다.
//이동할 x값, 이동할 y값, 새 가로, 새 높이
function moveView(moveX, moveY, newWidth, newHeight) {
//     console.log("move view");
//     console.log(moveX + " " + moveY);
//    console.log(newWidth + " " + newHeight);

    //moveX,moveY 만큼 캔버스를 이동한다. (setTransform 함수는 '만큼 이동' 이 아니라 '로 이동' 이라서 원래 x,y에 + 해줘야 함)
    stage.setTransform(stage.x + moveX, stage.y + moveY);

    //뷰 크기 변경 요청이 들어왔다면
    if (newWidth != undefined) {
        stage.canvas.width = newWidth;
    }
    if (newHeight != undefined) {
        stage.canvas.height = newHeight;
    }
    // console.log(stage.x + " " + stage.y);

}


//뷰, 즉 카메라를 이동시킨다. 특정 위치로 이동
//목표 x값, 목표 y값, 새 가로, 새 높이
function moveView_fix(moveX, moveY, newWidth, newHeight) {

    stage.setTransform(-moveX, -moveY);

    //뷰 크기 변경 요청이 들어왔다면
    if (newWidth != undefined) {
        stage.canvas.width = newWidth;
    }
    if (newHeight != undefined) {
        stage.canvas.height = newHeight;
    }

}

//스프라이트 데이터를 제작한다.
//스프라이트 이름, 이미지 가로, 이미지 세로, x중점, y중점, 이미지 숫자
function createSpriteData(spriteName, width, height, origin_x, origin_y, imageCount) {
    //console.log("creates");
    //var image = imageLoader.getResult(spriteName);
    var data = {
        "images": [resourcepath + spriteName],
        "frames": { "width": width, "height": height, "regX": origin_x, "regY": origin_y, "count": imageCount },
        "animations": {
        }
    };

    return data;
}
//스프라이트 데이터를 가지고 스프라이트 클래스를 생성한다.
//스프라이트 데이터, x확대, y확대 x, y
function createSprite(spriteData, scaleX, scaleY, x, y) {
    var spriteSheet;
    spriteSheet = new createjs.SpriteSheet(spriteData);
    var sprite = new createjs.Sprite(spriteSheet);
    sprite.x = x;
    sprite.y = y;
    sprite.scaleX = scaleX;
    sprite.scaleY = scaleY;
//    console.log(spriteData.images[0]);
//    console.log(imageLoader);
    setHitArea(imageLoader.getResult(spriteData.images[0]), sprite);


    var length = stage.children.length;
    var index = length;
    for (var i = length - 1; i >= 0; i--) {//z-order 일단은 text만 최상위로 하자
//        console.log(stage.children[i]);
        //        console.log(stage.children[i] instanceof createjs.Text);
        if (stage.children[i].depth != 10000000 || stage.children[i].depth == null) {
            index = i+1;
//            console.log("index = " + i);
//            console.log(stage.children[i]);
//            console.log(stage.children[i].depth);
            break;
        }
    }
    stage.addChildAt(sprite, index);
//    console.log(spriteData.images +  "'s index = " + index);
//    console.log(stage.children);
    //console.log(sprite);
    return sprite;
}


//오브젝트의 스프라이트를 변경한다.
//스프라이트를 지닌 오브젝트, 스프라이트명, 스프라이트 속도(몇 프레임마다 바뀔것인가), 첫번째 프레임, 마지막 프레임 
function changeSprite(object, spriteName, spriteSpeed, firstFrame, lastFrame) {

    var data = spriteResource[spriteName].spriteData;
    data.animations["animation"] = [firstFrame, lastFrame];
//    if (object.name == 'obj_player') {
//        console.log(firstFrame + " / " + lastFrame);
//        console.log(data.animations["animation"]);
//    }
    var spriteSheet = new createjs.SpriteSheet(data);
    spriteSheet.framerate = spriteSpeed;
    object.spriteSheet = spriteSheet;

    object.gotoAndPlay("animation");

}

//hitarea를 만들어 리턴해 준다.
//이미지, 비트맵
function setHitArea(image, bitmap) {
    //    console.log(bitmap);
//    console.log(image);
    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("res").drawRect(-image.width / 2, -image.height / 2, image.width, image.height);
    hitArea.x = image.width / 2;
    hitArea.y = image.height / 2;

    bitmap.hitArea = hitArea;
    return hitArea;

}