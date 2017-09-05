function updateMysql(id, from, to) {
	$.ajax({
		url: '/home/index/update',
		type: 'POST',
		dateType: 'json',
		data: {
			from: from,
			to: to,
			id: id
		},
		successs: res => {
			if (!res.errno) {
				window.location.reload();
			} else alert(res.errmsg);
		}

	});
}

function update(id, value) {
	if (value) {
		var item1 = $("#todo-" + id);
		var donelist = $("#donelist");
		var temp1 = item1.parent();
		temp1.children("input").attr("onchange", "update(" + id + ", false)");
		temp1.children("input").attr("checked", "checked");
		temp1.children("p").attr("id", "done-" + id);
		temp1.children("p").attr("onclick", "edit(" + id + ",false)");
		temp1.children("a").attr("href", "javascript:remove(" + id + ", false)");
		donelist.append("<li>" + temp1.html() + "</li>");
		item1.parent().remove();
		var todocount = $("#todocount");
		var donecount = $("#donecount");
		todocount.text(parseInt(todocount.text()) - 1);
		donecount.text(parseInt(donecount.text()) + 1);
		updateMysql(id, "todo", "done");
	} else {
		var item2 = $("#done-" + id);
		var todolist = $("#todolist");
		var temp2 = item2.parent();
		temp2.children("input").attr("onchange", "update(" + id + ", true)");
		temp2.children("input").attr("checked", null);
		temp2.children("p").attr("id", "todo-" + id);
		temp2.children("p").attr("onclick", "edit(" + id + ",true)");
		temp2.children("a").attr("href", "javascript:remove(" + id + ", true)");
		todolist.append("<li>" + temp2.html() + "</li>");
		item2.parent().remove();
		var todocount = $("#todocount");
		var donecount = $("#donecount");
		todocount.text(parseInt(todocount.text()) + 1);
		donecount.text(parseInt(donecount.text()) - 1);
		updateMysql(id, "done", "todo");
	}
}

function remove(id, value) {
	if (value) {
		var item1 = $("#todo-" + id);
		item1.parent().remove();
		var todocount = $("#todocount");
		todocount.text(parseInt(todocount.text()) - 1);
	} else {
		var item2 = $("#done-" + id);
		item2.parent().remove();
		var donecount = $("#donecount");
		donecount.text(parseInt(donecount.text()) - 1);
	}
	$.ajax({
		url: '/home/index/remove',
		type: 'POST',
		dateType: 'json',
		data: {
			list: value ? "todo" : "done",
			id: id
		},
		successs: res => {
			if (!res.errno) {
				window.location.reload();
			} else alert(res.errmsg);
		}
	});
}

function edit(id, value) {
	if (value) {
		var p = $("#todo-" + id);
		title = p.text();
		p.html("<input id='input-" + id + "'value='" + title + "' />");
		var input = document.getElementById("input-" + id);
		input.setSelectionRange(0, input.value.length);
		input.focus();
		input.onblur = function() {
			if (input.value.length == 0) {
				p.html(title);
				alert("内容不能为空");
			} else {
				var newTitle = input.value;
				p.html(newTitle);
				$.ajax({
					url: '/home/index/edit',
					type: 'POST',
					dateType: 'json',
					data: {
						list: "todo",
						id: id,
						title: newTitle
					},
					successs: res => {
						if (!res.errno) {
							window.location.reload();
						} else alert(res.errmsg);
					}

				});

			}
		}
	} else {
		var p = $("#done-" + id);
		title = p.text();
		p.html("<input id='input-" + id + "'value='" + title + "' />");
		var input = document.getElementById("input-" + id);
		input.setSelectionRange(0, input.value.length);
		input.focus();
		input.onblur = function() {
			if (input.value.length == 0) {
				p.html(title);
				alert("内容不能为空");
			} else {
				var newTitle = input.value;
				p.html(newTitle);
				$.ajax({
					url: '/home/index/edit',
					type: 'POST',
					dateType: 'json',
					data: {
						list: "done",
						id: id,
						title: newTitle
					},
					successs: res => {
						if (!res.errno) {
							window.location.reload();
						} else alert(res.errmsg);
					}

				});

			}
		}
	}
}

function clear() {
	$.ajax({
		url: '/home/index/clear',
		type: 'POST',
		dateType: 'json',
		successs: res => {
			if (!res.errno) {
				window.location.reload();
			} else alert(res.errmsg);
		}
	});
	window.location.reload();
}