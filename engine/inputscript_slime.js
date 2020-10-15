returnscript = function (callback) {
var scripts = new Array();
var main = ["implement", "0", "resource", "5", "sprite", "background", "sound", "object", "room", "sprite", "12", "warrior_mark", "warrior", "warrior_attack", "warrior_skill", "witch_mark", "witch", "witch_attack", "witch_skill", "house", "slime1", "slime2", "slime3", "background", "5", "start", "select", "game", "win", "lose", "sound", "9", "gamebgm", "ingamebgm", "warrior_attack", "warrior_skill", "witch_attack", "witch_skill", "winbgm", "losebgm", "burst", "object", "19", "warrior_mark", "warrior", "warrior_attack", "warrior_skill", "witch_mark", "witch", "witch_attack", "witch_skill", "start_system", "select_system", "game_system", "win_system", "lose_system", "house", "slime_base", "slime_unit", "slime1", "slime2", "slime3", "room", "5", "start", "select", "game", "win", "lose"];
scripts.main = main;
var sprite = new Array();
{
var warrior_mark = ["size", "120", "160", "image", "1", "warrior_mark.png", "mask", "rectangle", "120", "160"];
sprite.warrior_mark = warrior_mark;
var warrior = ["size", "120", "160", "image", "48", "warrior.png", "mask", "rectangle", "120", "160"];
sprite.warrior = warrior;
var warrior_attack = ["size", "160", "160", "image", "6", "axe.png", "mask", "rectangle", "160", "160"];
sprite.warrior_attack = warrior_attack;
var warrior_skill = ["size", "192", "192", "image", "30", "claw.png", "mask", "rectangle", "192", "192"];
sprite.warrior_skill = warrior_skill;
var witch_mark = ["size", "120", "160", "image", "1", "witch_mark.png", "mask", "rectangle", "120", "160"];
sprite.witch_mark = witch_mark;
var witch = ["size", "120", "160", "image", "48", "witch.png", "mask", "rectangle", "120", "160"];
sprite.witch = witch;
var witch_attack = ["size", "51", "61", "image", "3", "fireball.png", "mask", "rectangle", "51", "61"];
sprite.witch_attack = witch_attack;
var witch_skill = ["size", "192", "192", "image", "20", "icicle.png", "mask", "rectangle", "192", "192"];
sprite.witch_skill = witch_skill;
var house = ["size", "775", "110", "image", "1", "house.png", "mask", "rectangle", "775", "110"];
sprite.house = house;
var slime1 = ["size", "792", "661", "image", "2", "slimeking.png", "mask", "rectangle", "792", "661"];
sprite.slime1 = slime1;
var slime2 = ["size", "206", "142", "image", "1", "slime2.png", "mask", "rectangle", "206", "142"];
sprite.slime2 = slime2;
var slime3 = ["size", "509", "392", "image", "1", "slime3.png", "mask", "rectangle", "509", "392"];
sprite.slime3 = slime3;
}
scripts.sprite = sprite;
var background = new Array();
{
var start = ["size", "600", "700", "image", "startmap.png", "600", "700"];
background.start = start;
var select = ["size", "600", "700", "image", "select.png", "600", "700"];
background.select = select;
var game = ["size", "600", "700", "image", "mainmap.png", "600", "700"];
background.game = game;
var win = ["size", "600", "700", "image", "gamewin.png", "600", "700"];
background.win = win;
var lose = ["size", "600", "700", "image", "gamelose.png", "600", "700"];
background.lose = lose;
}
scripts.background = background;
var sound = new Array();
{
var gamebgm = ["1year.mp3"];
sound.gamebgm = gamebgm;
var ingamebgm = ["bgm.mp3"];
sound.ingamebgm = ingamebgm;
var warrior_attack = ["warrior_attack.mp3"];
sound.warrior_attack = warrior_attack;
var warrior_skill = ["warrior_skill.mp3"];
sound.warrior_skill = warrior_skill;
var witch_attack = ["witch_attack.mp3"];
sound.witch_attack = witch_attack;
var witch_skill = ["witch_skill.mp3"];
sound.witch_skill = witch_skill;
var winbgm = ["It'sFantastic.mp3"];
sound.winbgm = winbgm;
var losebgm = ["bgm.mp3"];
sound.losebgm = losebgm;
var burst = ["burst.mp3"];
sound.burst = burst;
}
scripts.sound = sound;
var object = new Array();
{
var warrior_mark = ["sprite", "usesprite", "warrior_mark", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "mouce_over", "2", "sprite_scale 1.2 1.2", "moveObject 0 -12 -16", "mouce_out", "2", "sprite_scale 1 1", "moveObject 0 12 16", "mouce_down", "2", "setGlobalVariable 1 player_type 1", "nextRoom"];
object.warrior_mark = warrior_mark;
var warrior = ["sprite", "usesprite", "warrior", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "11", "object_creates", "4", "sprite_scale 0.8 0.8", "sprite_run warrior 0 11 30", "setVariable 1 delay 0", "setVariable 1 skill 0", "key_down 37", "3", "check_X 20 2", "moveObject 0 -8 0", "sprite_run warrior 12 23 30", "key_up 37", "1", "sprite_run warrior 0 11 30", "key_down 39", "3", "sprite_run warrior 36 47 30", "check_X 500 0", "moveObject 0 8 0", "key_up 39", "1", "sprite_run warrior 0 11 30", "key_press 37", "2", "check_X 20 2", "moveObject 0 -8 0", "key_press 39", "2", "check_X 500 0", "moveObject 0 8 0", "key_down 32", "4", "check_Variable delay 0 0", "createObject_around warrior_attack 0 -50 0 0 0 0", "check_Variable delay 0 0", "setVariable 1 delay 9", "always", "3", "setVariable 0 delay -1", "check_Variable skill 0 2", "setVariable 0 skill -1", "key_down 17", "10", "check_Variable skill 1 0", "createObject warrior_skill 70 150 0 0 0 0", "check_Variable skill 1 0", "createObject warrior_skill 300 150 0 0 0 0", "check_Variable skill 1 0", "createObject warrior_skill 70 350 0 0 0 0", "check_Variable skill 1 0", "createObject warrior_skill 300 350 0 0 0 0", "check_Variable skill 1 0", "setVariable 1 skill 150", "drawTime", "2", "draw_Text 0 50 640 20 skill cooltime =", "draw_Variable 1 220 640 20 skill"];
object.warrior = warrior;
var warrior_attack = ["sprite", "usesprite", "warrior_attack", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "4", "playSound warrior_attack 0", "setSpeed 1 0 -30", "sprite_scale 0.5 0.5", "sprite_run warrior_attack 0 5 10", "always", "2", "check_Y -100 0", "deleteInstance_self", "collision slime_base", "1", "deleteInstance_self"];
object.warrior_attack = warrior_attack;
var warrior_skill = ["sprite", "usesprite", "warrior_skill", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "3", "sprite_run warrior_skill 0 29 30", "sprite_scale 1.2 1.2", "setTimer 0 40", "timer 0", "1", "deleteInstance_self", "always", "2", "playSound warrior_skill 0", "setObjectVariable 0 slime_base hp -1"];
object.warrior_skill = warrior_skill;
var witch_mark = ["sprite", "usesprite", "witch_mark", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "mouce_over", "2", "sprite_scale 1.2 1.2", "moveObject 0 -12 -16", "mouce_out", "2", "sprite_scale 1 1", "moveObject 0 12 16", "mouce_down", "2", "setGlobalVariable 1 player_type 2", "nextRoom"];
object.witch_mark = witch_mark;
var witch = ["sprite", "usesprite", "witch", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "11", "object_creates", "4", "sprite_scale 0.8 0.8", "sprite_run witch 0 11 30", "setVariable 1 delay 0", "setVariable 1 skill 0", "key_down 37", "3", "check_X 20 2", "moveObject 0 -10 0", "sprite_run witch 12 23 30", "key_up 37", "1", "sprite_run witch 0 11 30", "key_down 39", "3", "sprite_run witch 36 47 30", "check_X 500 0", "moveObject 0 10 0", "key_up 39", "1", "sprite_run witch 0 11 30", "key_press 37", "2", "check_X 20 2", "moveObject 0 -8 0", "key_press 39", "2", "check_X 500 0", "moveObject 0 8 0", "key_down 32", "4", "check_Variable delay 0 0", "createObject_around witch_attack 0 -20 0 0 0 0", "check_Variable delay 0 0", "setVariable 1 delay 6", "always", "3", "setVariable 0 delay -1", "check_Variable skill 0 2", "setVariable 0 skill -1", "key_down 17", "4", "check_Variable skill 1 0", "createObject witch_skill 30 100 0 0 0 0", "check_Variable skill 1 0", "setVariable 1 skill 200", "drawTime", "2", "draw_Text 1 50 640 20 skill cooltime =", "draw_Variable 1 220 640 20 skill"];
object.witch = witch;
var witch_attack = ["sprite", "usesprite", "witch_attack", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "4", "playSound witch_attack 1", "setSpeed 1 0 -40", "sprite_scale 2 2", "sprite_run witch_attack 0 2 10", "always", "2", "check_Y -100 0", "deleteInstance_self", "collision slime_base", "1", "deleteInstance_self"];
object.witch_attack = witch_attack;
var witch_skill = ["sprite", "usesprite", "witch_skill", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "always", "2", "setObjectSpeed 1 slime_unit 0 1", "setObjectAccel 1 slime_unit 0 0", "object_creates", "5", "sprite_run witch_skill 0 19 10", "sprite_scale 3 3", "setTimer 0 35", "playSound witch_skill 0", "setObjectVariable 0 slime_base hp -40", "timer 0", "1", "deleteInstance_self"];
object.witch_skill = witch_skill;
var start_system = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "1", "playSound gamebgm 0", "key_down 32", "1", "nextRoom", "drawTime", "1", "draw_Text 1 130 220 30 press space for start"];
object.start_system = start_system;
var select_system = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "1", "drawTime", "6", "draw_Text 1 100 500 30 warrior", "draw_Text 1 70 550 20 공격 : 느리고 강함", "draw_Text 1 70 600 20 스킬 : 광역 전멸기", "draw_Text 1 370 500 30 witch", "draw_Text 1 330 550 20 공격 : 빠르고 약함", "draw_Text 1 330 600 20 스킬 : 광역 데미지,빙결"];
object.select_system = select_system;
var game_system = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "5", "object_creates", "12", "stopAllSound", "playSound ingamebgm -1", "check_GlobalVariable player_type 1 1", "createObject warrior 300 500 0 0 0 0", "check_GlobalVariable player_type 2 1", "createObject witch 300 500 0 0 0 0", "setTimer 3 20", "setTimer 4 30", "createObject house 0 630 0 0 0 0", "setGlobalVariable 1 score 0", "setGlobalVariable 1 life 5", "setVariable 0 boss 0", "timer 3", "2", "setTimer 3 50", "createObject slime2 rand(0~300) 0 0 0 0 0.1", "timer 4", "2", "setTimer 4 70", "createObject slime3 rand(0~300) 0 0 0 0 0.1", "drawTime", "5", "draw_Text 1 50 50 20 score =", "draw_GlobalVariable 1 150 50 20 score", "draw_Text 1 350 50 20 life =", "draw_GlobalVariable 1 450 50 20 life", "draw_Text 1 50 670 20 skill-ctrl     attack-space", "always", "7", "check_GlobalVariable score 2500 2", "check_Variable boss 0 1", "createObject slime1 150 0 0 0 0 0", "check_GlobalVariable score 2500 2", "setVariable 0 boss 1", "check_GlobalVariable life 0 0", "moveRoom lose", ""];
object.game_system = game_system;
var win_system = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "2", "stopAllSound", "playSound winbgm -1", "key_down 82", "2", "stopAllSound", "moveRoom start", "drawTime", "5", "draw_Text 1 50 210 20 score =", "draw_GlobalVariable 1 200 210 20 score", "draw_Text 1 350 210 20 life =", "draw_GlobalVariable 1 450 210 20 life", "draw_Text 1 120 250 30 press r for restart", "", ""];
object.win_system = win_system;
var lose_system = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "3", "object_creates", "2", "stopAllSound", "playSound losebgm -1", "key_down 82", "2", "stopAllSound", "moveRoom start", "drawTime", "3", "draw_Text 1 150 210 20 score =", "draw_GlobalVariable 1 300 210 20 score", "draw_Text 1 120 250 30 press r for restart", "", ""];
object.lose_system = lose_system;
var house = ["sprite", "usesprite", "house", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "0"];
object.house = house;
var slime_base = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "noparent", "event", "4", "always", "2", "check_Variable hp 0 0", "deleteInstance_self", "object_creates", "2", "setVariable 1 hp 1", "setSpeed 0 0 0.01", "collision warrior_attack", "1", "setVariable 0 hp -30", "collision witch_attack", "1", "setVariable 0 hp -20"];
object.slime_base = slime_base;
var slime_unit = ["sprite", "nosprite", "global", "false", "solid", "false", "depth", "0", "inherit", "parent", "slime_base", "event", "2", "collision house", "4", "setGlobalVariable 0 life -1", "setGlobalVariable 0 score -100", "deleteInstance_self", "playSound burst 0", "object_destroy", "1", "setGlobalVariable 0 score 100"];
object.slime_unit = slime_unit;
var slime1 = ["sprite", "usesprite", "slime1", "global", "false", "solid", "false", "depth", "0", "inherit", "parent", "slime_base", "event", "4", "object_creates", "3", "setVariable 1 hp 3000", "sprite_scale 0.35 0.35", "goToObject 0 -150 0 rand(6~20)", "drawTime", "2", "draw_Text 1 220 10 20 BOSS HP", "draw_Variable 1 320 10 20 hp", "always", "4", "check_coordinate 0 1 0 1", "goToObject 0 350 0 rand(6~20)", "check_coordinate 350 351 0 1", "goToObject 0 -350 0 rand(6~20)", "object_destroy", "1", "nextRoom"];
object.slime1 = slime1;
var slime2 = ["sprite", "usesprite", "slime2", "global", "false", "solid", "false", "depth", "0", "inherit", "parent", "slime_unit", "event", "1", "object_creates", "2", "setVariable 1 hp 30", "sprite_scale 0.8 0.8"];
object.slime2 = slime2;
var slime3 = ["sprite", "usesprite", "slime3", "global", "false", "solid", "false", "depth", "0", "inherit", "parent", "slime_unit", "event", "1", "object_creates", "2", "setVariable 1 hp 50", "sprite_scale 0.2 0.2"];
object.slime3 = slime3;
}
scripts.object = object;
var room = new Array();
{
var start = ["size", "600", "700", "view", "fix", "viewsize", "600", "700", "viewcoordinate", "0", "0", "background", "1", "start scale", "object", "1", "start_system 0 0"];
room.start = start;
var select = ["size", "600", "700", "view", "fix", "viewsize", "600", "700", "viewcoordinate", "0", "0", "background", "1", "select scale", "object", "3", "select_system 0 0", "warrior_mark 100 300", "witch_mark 350 300"];
room.select = select;
var game = ["size", "600", "700", "view", "fix", "viewsize", "600", "700", "viewcoordinate", "0", "0", "background", "1", "game scale", "object", "1", "game_system 0 0"];
room.game = game;
var win = ["size", "600", "700", "view", "fix", "viewsize", "600", "700", "viewcoordinate", "0", "0", "background", "1", "win scale", "object", "1", "win_system 0 0"];
room.win = win;
var lose = ["size", "600", "700", "view", "fix", "viewsize", "600", "700", "viewcoordinate", "0", "0", "background", "1", "lose scale", "object", "1", "lose_system 0 0"];
room.lose = lose;
}
scripts.room = room;
callback(scripts);
}
