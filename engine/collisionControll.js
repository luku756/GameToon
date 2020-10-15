

//솔리드 오브젝트 충돌시 해결
//움직이는 오브젝트, 원래 x, 원래 y,
function moveForSolid(target, old_x, old_y, x, y, type) {
//if(target.name == 'obj_monster')
//    console.log("solid collision! " + old_x + " -> " + target.x + " , " + old_y + " -> " + target.y + " fail");

    //일단 아예 원래 자리로 돌아가고
    target.x = old_x;
    target.y = old_y;

    if (type == 0) {//상대였다면 가능한 만큼만 이동하자
        target.x = old_x; //일단 되돌린 뒤에
        target.y = old_y;
        var deltax = 1, deltay = 1;
        if (x < 0)
            deltax = -1;

        if (y < 0)
            deltay = -1;

        var len = Math.abs(x);
        if (Math.abs(y) < Math.abs(x))//작은쪽이 len
            len = Math.abs(y);

//        if (target.name == 'obj_monster')
//            console.log("len = " + len + ", x = " + x + " y = " + y);
        var index=len;
        for (var i = 0; i < len; i++) {//한걸음식 이동
            target.x += deltax;
            target.y += deltay;
            var result = solidCollisionChecker(target);
            if (result == false) {//더 못가면 끝
                //                console.log("i = " + i);
                index = i;
                target.x -= deltax;
                target.y -= deltay;
//                if (target.name == 'obj_monster')
//                    console.log("fin for 1 x= " + target.x + " y= " + target.y);
                break;
                //                return;
            }
        }

        //나머지 걸음
        //        if (len == Math.abs(x)) {
        for (var i = index; i < Math.abs(y); i++) {//한걸음식 이동
            target.y += deltay;
            var result = solidCollisionChecker(target);
            if (result == false) {//더 못가면 끝
                //                    console.log("i = " + i);
                target.y -= deltay;
//                if (target.name == 'obj_monster')
//                    console.log("fin for 2 x= " + target.x + " y= " + target.y);
                break;
                //                    return;
            }
        }
        //        }
        //        else if (len == Math.abs(y)) {
        for (var i = index; i < Math.abs(x); i++) {//한걸음식 이동
            target.x += deltax;
            var result = solidCollisionChecker(target);
            if (result == false) {//더 못가면 끝
                //                    console.log("i = " + i);
                target.x -= deltax;
//                if (target.name == 'obj_monster')
//                    console.log("fin for 3 x= " + target.x + " y= " + target.y);
                break;
                //                    return;
            }
        }
        //        }

    }
}

//솔리드 오브젝트들이 충돌하는지 확인
//움직이는 대상 오브젝트
function solidCollisionChecker(targetObject) {
    var result;
//    if (targetObject.name == "obj_playerwin")
//      console.log("solid check");
    if (targetObject.solid == true) {
        var obja, objb;
        obja = targetObject;
        for (var i = 0; i < nowRoom.having_objects.length; i++) {
            if (nowRoom.having_objects[i] != targetObject && nowRoom.having_objects[i].solid == true) {
                objb = nowRoom.having_objects[i];

                result = check_collision_solid(obja, objb);
                if (result == true) {
//                    if (targetObject.name == "obj_playerwin")
//                        console.log("collision! for " + objb.name);
                    return false; //solid와 충돌이 일어났다면 실패인 것.
                }
            }
        }
    }
//    if (targetObject.name == "obj_playerwin")
//        console.log("no collision! ");
    return true;
   
}
var p1, f1;
//충돌처리 체크 함수
function collisionChecker() {
    var target;
    var collisions;
    var result;
//    console.log("collison check");
    var collisionObjects = new Array();
    //현재 룸에 존재하는 모든 오브젝트에 대하여 실행하도록 한다.
    for (var t = 0; t < nowRoom.having_objects.length; t++) {
        if (nowRoom.having_objects[t].collision != null) {
            collisions = nowRoom.having_objects[t].collision;
            for (var j = 0; j < collisions.length; j++) {
                target = collisions[j]; //충돌 체크할 대상

                for (var i = 0; i < nowRoom.having_objects.length; i++) {
                    if (t!= i && check_targetObject(target, nowRoom.having_objects[i]) == true ) {
//                        console.log("same = " + target + " " + nowRoom.having_objects[i].name);
//                    }
//                    if (nowRoom.having_objects[i].name == target) {

                        result = check_collision(nowRoom.having_objects[t], nowRoom.having_objects[i]);
//                        console.log(nowRoom.having_objects[t]+" / " +  nowRoom.having_objects[i]);
                        if (result == true) {
                            var arr = new Array();
                            arr[0] = nowRoom.having_objects[t];
                            arr[1] = nowRoom.having_objects[i];
                            arr[2] = target;
                            collisionObjects.push(arr);
                            //event_collision(nowRoom.having_objects[t], nowRoom.having_objects[i]);
                            //console.log("collision = " + nowRoom.having_objects[t].name + " and " + nowRoom.having_objects[i].name);
                            // alert("break!");
                        }
                    }
                }
            }
        }
    }
//    if (f1 != null) {
//        console.log(p1.name + "'s y = " + p1.y);
//        console.log(f1.name + "'s y = " + f1.y);
//        console.log("gap = " + (p1.y - f1.y));
//    }
    var arr;
//    console.log("collison cicyle + "+timeCount);
    for (var i = 0; i < collisionObjects.length; i++) {
        arr = collisionObjects[i];
//        if (arr[0].name == 'obj_monster' || arr[0].name == 'obj_player') {
//            mouce_down(arr);
//            console.log(collisionObjects);
//            //return;
//            console.log(arr[0].name+" coliisions! to " + arr[1].name);
//            console.log(arr);

//        }

        event_collision(arr[0], arr[1],arr[2]);
    }

}


function check_collision_rectTorect(object1,object2) {
    var maskheight1 = object1.sprite.maskheight * object1.scaleY;
    var maskwidth1 = object1.sprite.maskwidth * object1.scaleX;
    var maskheight2 = object2.sprite.maskheight * object2.scaleY;
    var maskwidth2 = object2.sprite.maskwidth * object2.scaleX;
//    console.log(object1.name + " " + maskheight1 + " " + maskwidth1 + " " + object2.name + " " + maskheight2 + " " + maskwidth2);
////    console.log(object1.name + " " + maskheight1 + " " + maskwidth1 + " " + object2.name + " " + maskheight2 + " " + maskwidth2);
//    console.log(object1.name + " 's xy = " + object1.x + ", " + object1.y + " / " + object2.name + " 's xy = " + object2.x + ", " + object2.y);
//    console.log(object2.name + " 's xy = " + object2.x + ", " + object2.y);
//    console.log(object1.name + " 좌상: " + (object1.x - 2) + ", " + (object1.y - 2) + " 우상: " + (object1.x + maskwidth1 + 2) + ", " + (object1.y - 2) + " 좌하: " + (object1.x - 2) + ", " + (object1.y + maskheight1 + 2) + " 우하: " + (object1.x + maskwidth1 + 2) + ", " + (object1.y + maskheight1 + 2));
    //    console.log(object2.name + " 좌상: " + (object2.x - 2) + ", " + (object2.y - 2) + " 우상: " + (object2.x + maskwidth2 + 2) + ", " + (object2.y - 2) + " 좌하: " + (object2.x - 2) + ", " + (object2.y + maskheight2 + 2) + " 우하: " + (object2.x + maskwidth2 + 2) + ", " + (object2.y + maskheight2 + 2));
    //console.log("collision check - " + object1.name + " vs " + object2.name);

    var obj1_L = object1.x-2, obj1_R = object1.x + maskwidth1+2, obj1_T = object1.y-2, obj1_B = object1.y + maskheight1+2;
    var obj2_L = object2.x-2, obj2_R = object2.x + maskwidth2+2, obj2_T = object2.y-2, obj2_B = object2.y + maskheight2+2;

//    if (object1.name == 'obj_player' && object2.name == 'obj_monster') {
//        console.log("collision check - " + object1.name + " vs " + object2.name);
//        console.log(object1.name + " 의 좌표 : " + object1.x + "," + object1.y + " ~ " + (object1.x + maskwidth1) + "," + (object1.y + maskheight1));
//        console.log(object2.name + " 의 좌표 : " + object2.x + "," + object2.y + " ~ " + (object2.x + maskwidth2) + "," + (object2.y + maskheight2));
//        //console.log("마스크 : " + maskwidth1 + "," + maskheight1 + " / " + maskwidth2 + ","+maskheight2);
//    }
//    if (object1.name == 'obj_player' && object2.name == 'obj_monster') {
//        console.log(object2.name + " 우상단 : " + obj2_R + "," + obj2_T);
//        console.log(object2.name + " 우하단 : " + obj2_R + "," + obj2_B);
//        console.log(object1.name + " 좌상단 : " + obj1_L + "," + obj1_T);
//        console.log(object1.name + " 좌하단 : " + obj1_L + "," + obj1_B);
////        console.log(object1.name + " 의 좌표 : " + object1.x + "," + object1.y + " ~ " + (object1.x + maskwidth1) + "," + (object1.y + maskheight1));
////        console.log(object2.name + " 의 좌표 : " + object2.x + "," + object2.y + " ~ " + (object2.x + maskwidth2) + "," + (object2.y + maskheight2));
//        //console.log("마스크 : " + maskwidth1 + "," + maskheight1 + " / " + maskwidth2 + ","+maskheight2);
//    }

    //좌상단
    if (obj1_L <= obj2_L && obj2_L <= obj1_R && obj1_T <= obj2_T && obj2_T <= obj1_B) {
        return true;
    }

    //우상단
    if (obj1_L <= obj2_R && obj2_R <= obj1_R && obj1_T <= obj2_T && obj2_T <= obj1_B) {
        return true;
    }

    //좌하단
    if (obj1_L <= obj2_L && obj2_L <= obj1_R && obj1_T <= obj2_B && obj2_B <= obj1_B) {
        return true;
    }

    //우하단
    if (obj1_L <= obj2_R && obj2_R <= obj1_R && obj1_T <= obj2_B && obj2_B <= obj1_B) {
        return true;
    }

    return false;
}


function check_collision(object1, object2) {
    //console.log(object1.spriteflag + " " + object2.spriteflag);
    if (object1.spriteflag == true && object2.spriteflag == true) {//스프라이트가 있어야 검사를 하던말던
        //console.log("comp");
        if (object1.sprite.masktype == "circle" && object2.sprite.masktype == "circle") {//둘다 원형이라면
            //이미지 중간에서 시작
            var x1, y1, x2, y2;
            x1 = object1.x + object1.sprite.width / 2;
            y1 = object1.y + object1.sprite.height / 2;
            x2 = object2.x + object2.sprite.width / 2;
            y2 = object2.y + object2.sprite.height / 2;

            var dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            dist = Math.sqrt(dist);
            if (dist < object1.sprite.maskradius + object2.sprite.maskradius) {
                return true;
            }
        }
        else if (object1.sprite.masktype == "rectangle" && object2.sprite.masktype == "rectangle") {

            var result = check_collision_rectTorect(object1, object2);
            if (result == false){
                result = check_collision_rectTorect(object2, object1);

            }
            return result;
       

        }
        //원과 사각형
        else {
            //console.log("else");
            if (object1.sprite.masktype == "rectangle" && object2.sprite.masktype == "circle") {
                //원이 아니라 팔각형으로 생각하자
                //console.log(object1.x + " " + (object1.x + object1.sprite.maskwidth) + " " + object1.y + " " + (object1.y + object1.sprite.maskheight));
                //하단
                var pointx = object2.x + object2.sprite.width / 2;
                var pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("1 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //상단
                pointx = object2.x + object2.sprite.width / 2;
                pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("2 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌단
                pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2;
                //console.log("3 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2;
                //console.log("4 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌상단
                var pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                var pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("5 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌하단
                pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("6 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우상단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("7 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우하단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("8 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

            }
            else if (object1.sprite.masktype == "circle" && object2.sprite.masktype == "rectangle") {
                return check_collision(object2, object1);
            }

        }
    }



    return false;
}


function check_collision_rectTorect_solid(object1, object2) {
    var maskheight1 = object1.sprite.maskheight * object1.scaleY;
    var maskwidth1 = object1.sprite.maskwidth * object1.scaleX;
    var maskheight2 = object2.sprite.maskheight * object2.scaleY;
    var maskwidth2 = object2.sprite.maskwidth * object2.scaleX;
    //    console.log(object1.name + " " + maskheight1 + " " + maskwidth1 + " " + object2.name + " " + maskheight2 + " " + maskwidth2);
    ////    console.log(object1.name + " " + maskheight1 + " " + maskwidth1 + " " + object2.name + " " + maskheight2 + " " + maskwidth2);
    //    console.log(object1.name + " 's xy = " + object1.x + ", " + object1.y + " / " + object2.name + " 's xy = " + object2.x + ", " + object2.y);
    ////    console.log(object2.name + " 's xy = " + object2.x + ", " + object2.y);


    var obj1_L = object1.x+1, obj1_R = object1.x + maskwidth1-1, obj1_T = object1.y+1, obj1_B = object1.y + maskheight1-1;
    var obj2_L = object2.x+1, obj2_R = object2.x + maskwidth2-1, obj2_T = object2.y+1, obj2_B = object2.y + maskheight2-1;


    //좌상단
    if (obj1_L <= obj2_L && obj2_L <= obj1_R && obj1_T <= obj2_T && obj2_T <= obj1_B) {
        return true;
    }

    //우상단
    if (obj1_L <= obj2_R && obj2_R <= obj1_R && obj1_T <= obj2_T && obj2_T <= obj1_B) {
        return true;
    }

    //좌하단
    if (obj1_L <= obj2_L && obj2_L <= obj1_R && obj1_T <= obj2_B && obj2_B <= obj1_B) {
        return true;
    }

    //우하단
    if (obj1_L <= obj2_R && obj2_R <= obj1_R && obj1_T <= obj2_B && obj2_B <= obj1_B) {
        return true;
    }

    return false;
}


function check_collision_solid(object1, object2) {
//    console.log("sol");
    //console.log(object1.spriteflag + " " + object2.spriteflag);
    if (object1.spriteflag == true && object2.spriteflag == true) {//스프라이트가 있어야 검사를 하던말던
        //console.log("comp");
        if (object1.sprite.masktype == "circle" && object2.sprite.masktype == "circle") {//둘다 원형이라면
            //이미지 중간에서 시작
            var x1, y1, x2, y2;
            x1 = object1.x + object1.sprite.width / 2;
            y1 = object1.y + object1.sprite.height / 2;
            x2 = object2.x + object2.sprite.width / 2;
            y2 = object2.y + object2.sprite.height / 2;

            var dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            dist = Math.sqrt(dist);
            if (dist < object1.sprite.maskradius + object2.sprite.maskradius) {
                return true;
            }
        }
        else if (object1.sprite.masktype == "rectangle" && object2.sprite.masktype == "rectangle") {

            var result = check_collision_rectTorect_solid(object1, object2);
            if (result == false) {
                result = check_collision_rectTorect_solid(object2, object1);

            }
            return result;


        }
        //원과 사각형
        else {
            //console.log("else");
            if (object1.sprite.masktype == "rectangle" && object2.sprite.masktype == "circle") {
                //원이 아니라 팔각형으로 생각하자
                //console.log(object1.x + " " + (object1.x + object1.sprite.maskwidth) + " " + object1.y + " " + (object1.y + object1.sprite.maskheight));
                //하단
                var pointx = object2.x + object2.sprite.width / 2;
                var pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("1 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //상단
                pointx = object2.x + object2.sprite.width / 2;
                pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("2 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌단
                pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2;
                //console.log("3 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2;
                //console.log("4 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌상단
                var pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                var pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("5 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //좌하단
                pointx = object2.x + object2.sprite.width / 2 - object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("6 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우상단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 - object2.sprite.maskradius;
                //console.log("7 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

                //우하단
                pointx = object2.x + object2.sprite.width / 2 + object2.sprite.maskradius;
                pointy = object2.y + object2.sprite.height / 2 + object2.sprite.maskradius;
                //console.log("8 = " + pointx + " " + pointy);
                if (object1.x <= pointx && pointx <= object1.x + object1.sprite.maskwidth && object1.y <= pointy && pointy <= object1.y + object1.sprite.maskheight) {
                    return true;
                }

            }
            else if (object1.sprite.masktype == "circle" && object2.sprite.masktype == "rectangle") {
                return check_collision(object2, object1);
            }

        }
    }



    return false;
}