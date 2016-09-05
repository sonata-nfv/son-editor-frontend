var queryString = {};
var workspaceModel;

var Platform=function()
{
	this.name=ko.observable("");
	this.url=ko.observable("");
	this.init=function(data)
	{
		this.name(data.name);
		this.url(data.url);
		return this;
	}
}

var Catalogue=function()
{
	this.name=ko.observable("");
	this.url=ko.observable("");
	this.init=function(data)
	{
		this.name(data.name);
		this.url(data.url);
		return this;
	}
}
var WorkspaceModel=function()
{
	this.name=ko.observable(queryString["wsName"]);
	this.platforms=ko.observableArray();
	this.catalogues=ko.observableArray();
	this.addPlatform=function()
	{
		this.platforms.push(new Platform());
	};
	this.deletePlatform=function(platform)
	{
		this.platforms.remove(platform);
	}.bind(this);
	this.addCatalogue=function()
	{
		this.catalogues.push(new Catalogue());
	};
	this.deleteCatalogue=function(catalogue)
	{
		this.catalogues.remove(catalogue);
	}.bind(this);
	this.init=function(data)
	{
		this.name=data.name;
		if(data.platforms.length!=0)
			this.platforms($.map(data.platforms, function(item){return new Platform().init(item)}));
		if(data.catalogues.length!=0)
			this.catalogues($.map(data.catalogues, function(item){return new Catalogue().init(item)}));
		return this;
	}
}

function cancelConfiguration() {
	window.location.href = history.back();
}
function saveConfiguration() {
	if($('form').parsley().isValid())
	{
		var configurationJson=ko.toJSON(workspaceModel);
		console.log("New configuration:");
		console.log(configurationJson);
		$.ajax({
			url : serverURL + "workspaces/" + queryString["wsId"] ,
			method : 'PUT',
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			xhrFields : {
				withCredentials : true
			},
			data : configurationJson,
			success : function (data) {
				$("#successSaveConfiDialog").dialog({
					modal : true,
					draggable : false,
					buttons : {
						ok : function () {
							$(this).dialog("close");
						}
					}
				});
			},
			error : function (err) {
				$('#errorDialog').text(err.responseText);
				$('#errorDialog').dialog({
					modal : true,
					buttons : {
						Ok : function () {
							$(this).dialog("close");
						}
					}
				});
			}
		});
		window.location.href = history.back();
	}
}

$(document).ready(function () {
	queryString = getQueryString();
	document.getElementById("nav_workspace").text = "Workspace: " + queryString["wsName"];
	workspaceModel=new WorkspaceModel();
	$.ajax({
		url : serverURL + "workspaces/" + queryString["wsId"],
		dataType : "json",
		xhrFields : {
			withCredentials : true
		},
		success : function (data) {
			workspaceModel.init(data);
		}
	});
	ko.applyBindings(workspaceModel);
	$("#accordion").accordion({
		active : false,
		collapsible : false,
		heightStyle : "content"
	});
});

