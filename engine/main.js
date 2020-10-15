

function object() {
    var x, y, xspeed, yspeed, xaccel, yaccel;   //x,y ��ǥ/�ӵ�/���ӵ�
    var depth;                                  //z-order
    var solid;                                  //solid �ɼ� ����
    var spriteflag, sprite, spritenum;          //sprite ���� ����/sprite/sprite ������ ��ȣ
    var perantflag, parent;                     //�θ� ���� ����/�θ� object
    var event_action_list;                      //map. key-�̺�Ʈ �̸�, value-�׼��Լ��̸� �迭
    var action_prameter_list;                   //map. key-�̺�Ʈ �̸�, value-�׼��Լ� ���� 2���� �迭
    var custom_var;                             //����� ���� ����

}

//�̺�Ʈ �ڵ鷯
function event1(event) {
    var target = event.target;  //�̺�Ʈ�� �߻���Ų ������Ʈ
    var eventname = "event1";   //�̺�Ʈ��
    var action_length = target.event_action_list[eventname].length;
    var action_array = target.event_action_list[eventname];
    var parameter_array = target.action_prameter_list[eventname];

    //�׼� �Լ��� ���������� ����
    for (var i = 0; i < action_length; i++) {
        window[action_array[i]].apply(this, parameter_array[i]); //�׼� �Լ� ����
    }
}

var obj = new object();
var funcs = ["do1", "do2"];
obj.event_action_list = new Array();
obj.event_action_list["event1"] = funcs;

var pa1 = [];
var pa2 = [4, 5];

var funcs = [pa1, pa2];
obj.action_prameter_list = new Array();
obj.action_prameter_list["event1"] = funcs;

function do1() {
    console.log("do1");
}

function do2(a, b) {
    console.log("do2 " + a + "  " + b);
}

var ea = new Array();
ea.target = obj;

var key_def = {
	LEFT: 37,
	RIGHT: 39
};

var data = [
	{
		id: 'asdwqras214safr523',
		key: key_def.LEFT,
		func: 'event1',
		args: [[],['Monster', 'left']]
	},
	{
		id: 'asdwqras214safr523',
		key: key_def.LEFT,
		func: 'move',
		args: ['Sistar', 'left']
	},
	{
		id: 'asdwqras214safr523',
		key: key_def.RIGHT,
		func: 'move',
		args: ['Monster', 'right']
	}
];

var key_table = {};
var key_state = {};

function move(obj, direction) {
	console.log(obj + ' is move to ' + direction);
}

function init(data) {
	var i;
	for (i = 0; i < data.length; i++) {
		if (!key_table[data[i].key]) {
			key_table[data[i].key] = [];
		}
		key_table[data[i].key].push(data[i]);
	}

	key_init();
}

function key_init() {

	var k;
	for (k in key_def) {
		key_state[key_def[k]] = false;
	}

	$(document).on('keydown', function (e) {
		if (key_state[e.keyCode] !== undefined) {
			key_state[e.keyCode] = true;
		}
	});

	$(document).on('keyup', function (e) {
		if (key_state[e.keyCode] !== undefined) {
			key_state[e.keyCode] = false;
		}
	});
}

function key_proc(data) {
	var i, j;
	for (i = 0; i < data.length; i++) {
	    if (key_state[data[i].key]) {
	        event1(ea);
			//window[data[i].func].apply(obj, data[i].args);
		}
	}
}

function loop() {
	var k;
	var events;
	for (k in key_table) {
		events = key_table[k];

		if (events) {
			key_proc(events);
		}
	}
}

$(document).ready(function () {
	init(data);
	setInterval(loop, 33);
});