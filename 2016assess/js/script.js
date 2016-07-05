window.onload = function() {

}

function clearDefaultText (obj,message)
{
	obj.style.color = "#fff";
	if(obj.value == message)
	{
		obj.value = "";
		
	}

	obj.onblur = function()
	{
		if(obj.value == "")
		{
   			obj.value = message;
   			obj.style.color = "#f8f8f8";
		}
	}
}