
//�̹����� ȭ��� �׸���. 
//�̹��� ��ü, xȮ��, yȮ��, x��ǥ, y ��ǥ
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

//�̹����� ȭ��� �� ���� �׸���. 
//�̹��� ��ü, �̹��� ����, �̹��� ����
function drawImage_fillStage(image, imageWidth, imageHeight) {

    bitmap = new createjs.Bitmap(image);     //��Ʈ�� ��ü ����            
    var stageWidth = stage.canvas.width; var stageHeight = stage.canvas.height;
    var width = imageWidth; var height = imageHeight;
    bitmap.scaleX = stageWidth / width; //������ �°� Ȯ��
    bitmap.scaleY = stageHeight / height;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);
    return bitmap;
}

//�̹����� ���ϴ� ũ�⿡ �µ���, ���ϴ� ��ǥ�� �׸���.
//�̹��� ��ü, �̹��� ����, �̹��� ����, ��ǥ ����, ��ǥ ����
function drawImage_targetSize(image, imageWidth, imageHeight, targetWidth, targetHeight, x, y) {

    bitmap = new createjs.Bitmap(image);     //��Ʈ�� ��ü ����            
    var width = imageWidth; var height = imageHeight;
    bitmap.scaleX = targetWidth / width; //������ �°� Ȯ��
    bitmap.scaleY = targetHeight / height;
    bitmap.x = x;
    bitmap.y = y;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);
    return bitmap;
}

//�̹����� ���ϴ� ũ�⿡ �µ���, ���ϴ� ��ǥ�� �׸���.
//�̹��� ��ü, �̹��� ����, �̹��� ����, ��ǥ ����, ��ǥ ����
function drawImage_targetSize_repeat(image, targetWidth, targetHeight, x, y) {

    bitmap = new createjs.Shape();
    bitmap.graphics.beginBitmapFill(image).drawRect(0, 0, targetWidth, targetHeight);
    bitmap.x = x;
    bitmap.y = y;
    setHitArea(image, bitmap);
    stage.addChild(bitmap);

    return bitmap;

}

//�̹���(��Ʈ��) �� �����Ѵ�.
//������ ��Ʈ��, �� �̹��� ���(�̸�)
function changeImage(bitmap, newImageName) {

//    var image = new Image();
//    image.src = "_assets/art/" + newImageName;
    var image = imageLoader.getResult(newImageName);
    var newbitmap = new createjs.Bitmap(image);     //��Ʈ�� ��ü ����
    bitmap.image = newbitmap.image;
    setHitArea(image, bitmap);
    return bitmap;

}


//���ȭ�� �׷��ֱ� - ���̱�
//��׶��嵥����, ���� x��ǥ, ���� y��ǥ
function draw_background_scale(background, room, viewCoordinate_x, viewCoordinate_y) {

    var image = imageLoader.getResult(background.image);
    var backgroundBitmap = drawImage_targetSize(image, background.imageWidth, background.imageHeight, room.width, room.height, viewCoordinate_x, viewCoordinate_y);
    backgroundBitmap.width = background.width;
    backgroundBitmap.height = background.height;
    nowBackgrounds.push(backgroundBitmap);
    return backgroundBitmap;
}


//���ȭ�� �׷��ֱ� - �ݺ��ϱ� (�̱���!)
//��׶��嵥����, ���� x��ǥ, ���� y��ǥ
function draw_background_repeat(background, room, viewCoordinate_x, viewCoordinate_y) {

    var image = imageLoader.getResult(background.image);
    var backgroundBitmap = drawImage_targetSize_repeat(image, room.width, room.height, viewCoordinate_x, viewCoordinate_y);
    backgroundBitmap.width = background.width;
    backgroundBitmap.height = background.height;
    nowBackgrounds.push(backgroundBitmap);
    return backgroundBitmap;
}




//��, �� ī�޶� �̵���Ų��.
//�̵��� x��, �̵��� y��, �� ����, �� ����
function moveView(moveX, moveY, newWidth, newHeight) {
//     console.log("move view");
//     console.log(moveX + " " + moveY);
//    console.log(newWidth + " " + newHeight);

    //moveX,moveY ��ŭ ĵ������ �̵��Ѵ�. (setTransform �Լ��� '��ŭ �̵�' �� �ƴ϶� '�� �̵�' �̶� ���� x,y�� + ����� ��)
    stage.setTransform(stage.x + moveX, stage.y + moveY);

    //�� ũ�� ���� ��û�� ���Դٸ�
    if (newWidth != undefined) {
        stage.canvas.width = newWidth;
    }
    if (newHeight != undefined) {
        stage.canvas.height = newHeight;
    }
    // console.log(stage.x + " " + stage.y);

}


//��, �� ī�޶� �̵���Ų��. Ư�� ��ġ�� �̵�
//��ǥ x��, ��ǥ y��, �� ����, �� ����
function moveView_fix(moveX, moveY, newWidth, newHeight) {

    stage.setTransform(-moveX, -moveY);

    //�� ũ�� ���� ��û�� ���Դٸ�
    if (newWidth != undefined) {
        stage.canvas.width = newWidth;
    }
    if (newHeight != undefined) {
        stage.canvas.height = newHeight;
    }

}

//��������Ʈ �����͸� �����Ѵ�.
//��������Ʈ �̸�, �̹��� ����, �̹��� ����, x����, y����, �̹��� ����
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
//��������Ʈ �����͸� ������ ��������Ʈ Ŭ������ �����Ѵ�.
//��������Ʈ ������, xȮ��, yȮ�� x, y
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
    for (var i = length - 1; i >= 0; i--) {//z-order �ϴ��� text�� �ֻ����� ����
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


//������Ʈ�� ��������Ʈ�� �����Ѵ�.
//��������Ʈ�� ���� ������Ʈ, ��������Ʈ��, ��������Ʈ �ӵ�(�� �����Ӹ��� �ٲ���ΰ�), ù��° ������, ������ ������ 
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

//hitarea�� ����� ������ �ش�.
//�̹���, ��Ʈ��
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